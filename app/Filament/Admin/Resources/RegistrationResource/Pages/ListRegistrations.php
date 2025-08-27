<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Enums\EventName;
use App\Filament\Admin\Resources\RegistrationResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ListRegistrations extends ListRecords
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'Semua' => Tab::make(),
            'Pelantikan' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->where('extras->event_name', EventName::INAUGURATION->value)),
            'Seminar' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => $query->where('extras->event_name', EventName::SEMINAR->value)),
        ];
    }
}
