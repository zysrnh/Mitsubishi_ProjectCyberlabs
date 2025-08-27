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
        $extras = $this->record->extras ?? [];

        $extras['organization'] = $this->form->getState()['organization'] ?? null;

        $this->record->updateQuietly([
            'extras' => $extras,
        ]);
    }
}
