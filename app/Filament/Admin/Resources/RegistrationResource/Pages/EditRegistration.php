<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Filament\Admin\Resources\RegistrationResource;
use App\Models\Seat;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EditRegistration extends EditRecord
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->before(function ($record) {
                    // Hapus file QR jika ada sebelum delete
                    if ($record->qr_path) {
                        $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                        if (Storage::disk('public')->exists($path)) {
                            Storage::disk('public')->delete($path);
                        }
                    }
                }),
            Actions\ForceDeleteAction::make()
                ->before(function ($record) {
                    // Hapus file QR jika ada sebelum force delete
                    if ($record->qr_path) {
                        $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                        if (Storage::disk('public')->exists($path)) {
                            Storage::disk('public')->delete($path);
                        }
                    }
                }),
            Actions\RestoreAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Format nomor telepon - hapus prefix +62 jika ada
        if (isset($data['phone']) && !empty($data['phone'])) {
            // Hilangkan semua karakter selain angka
            $phone = preg_replace('/[^0-9]/', '', $data['phone']);
            
            // Jika dimulai dengan 62, ganti dengan 0
            if (str_starts_with($phone, '62')) {
                $phone = '0' . substr($phone, 2);
            }
            
            // Pastikan dimulai dengan 08
            if (!str_starts_with($phone, '08')) {
                $phone = '08' . ltrim($phone, '0');
            }
            
            $data['phone'] = $phone;
        }

        return $data;
    }

    protected function afterSave(): void
    {
        $extras = $this->record->extras ?? [];
        $formState = $this->form->getState();

        // Update region untuk Karang Taruna
        if (isset($formState['region'])) {
            $extras['region'] = $formState['region'];
            // Set type jika belum ada
            if (empty($extras['type'])) {
                $extras['type'] = 'karang_taruna';
            }
        }

        // Update organization untuk Peserta Umum
        if (isset($formState['organization'])) {
            $extras['organization'] = $formState['organization'];
            // Set type jika belum ada
            if (empty($extras['type'])) {
                $extras['type'] = 'umum';
            }
        }

        // Update institution untuk VIP
        if (isset($formState['institution'])) {
            $extras['institution'] = $formState['institution'];
            // Set type jika belum ada
            if (empty($extras['type'])) {
                $extras['type'] = 'vip';
            }
        }

        // Update position
        if (isset($formState['position'])) {
            $extras['position'] = $formState['position'];
        }

        // Update shirt_number
        if (isset($formState['shirt_number'])) {
            $extras['shirt_number'] = $formState['shirt_number'];
        }

        // Update extras tanpa trigger events
        $this->record->updateQuietly([
            'extras' => $extras,
        ]);
    }
}