<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Filament\Admin\Resources\RegistrationResource;
use App\Models\Seat;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\DB;

class EditRegistration extends EditRecord
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (! str_starts_with($data['phone'], '+62')) {
            $data['phone'] = '+62' . ltrim($data['phone'], '0+');
        }

        return $data;
    }

    protected function afterSave(): void
    {
        $seatId = $this->form->getState()['seat_id'];

        if (!$this->record) return;

        DB::transaction(function () use ($seatId) {
            // Always free old seat first
            Seat::where('registration_id', $this->record->id)
                ->lockForUpdate()
                ->update(['registration_id' => null]);

            if ($seatId) {
                // Then assign new seat
                Seat::where('id', $seatId)
                    ->lockForUpdate()
                    ->update([
                        'registration_id' => $this->record->id,
                    ]);
            }

            $extras = $this->record->extras ?? [];

            $extras['job_title'] = $this->form->getState()['job_title'] ?? null;
            $extras['organization'] = $this->form->getState()['organization'] ?? null;

            $this->record->updateQuietly([
                'extras' => $extras,
            ]);
        });
    }
}
