<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Filament\Admin\Resources\RegistrationResource;
use App\Jobs\GenerateQr;
use App\Jobs\SendQrToWhatsapp;
use App\Models\Event;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Bus;

class CreateRegistration extends CreateRecord
{
    protected static string $resource = RegistrationResource::class;

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
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

        // Set default values
        $data['is_approved'] = true;
        $data['approved_at'] = now();

        // Inisialisasi extras
        $extras = [
            'has_session' => false,
        ];

        // Tentukan tipe berdasarkan field yang diisi
        if (!empty($data['region'])) {
            $extras['type'] = 'karang_taruna'; // Karang Taruna
            $extras['region'] = $data['region'];
        } elseif (!empty($data['organization'])) {
            $extras['type'] = 'umum'; // Umum
            $extras['organization'] = $data['organization'];
        } elseif (!empty($data['institution'])) {
            $extras['type'] = 'vip'; // VIP/VVIP
            $extras['institution'] = $data['institution'];
        } else {
            $extras['type'] = 'umum'; // Default ke umum
        }

        // Tambahkan field tambahan ke extras
        if (!empty($data['position'])) {
            $extras['position'] = $data['position'];
        }

        if (!empty($data['shirt_number'])) {
            $extras['shirt_number'] = $data['shirt_number'];
        }

        $data['extras'] = $extras;

        // Hapus field yang tidak ada di database
        unset($data['region'], $data['organization'], $data['institution'], $data['position'], $data['shirt_number']);

        return $data;
    }

    protected function afterCreate(): void
    {
        // Generate QR Code
        GenerateQr::dispatchSync($this->record);

        // Kirim QR via WhatsApp (jika ada nomor telepon)
        if ($this->record->phone) {
            Bus::chain([
                new SendQrToWhatsapp($this->record),
            ])->dispatch();

            $this->record->update([
                'last_blasted_at' => now(),
            ]);
        }
    }
}