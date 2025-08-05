<?php

namespace App\Filament\Admin\Resources\VolunteerResource\Pages;

use App\Filament\Admin\Resources\VolunteerResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageVolunteers extends ManageRecords
{
    protected static string $resource = VolunteerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
