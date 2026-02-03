<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Enums\EventName;
use App\Filament\Admin\Resources\RegistrationResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

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
            'Semua' => Tab::make()
                ->badge(fn() => \App\Models\Registration::count()),
            
            'Karang Taruna' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('extras->event_name', EventName::INAUGURATION->value)
                )
                ->badge(fn() => \App\Models\Registration::where('extras->event_name', EventName::INAUGURATION->value)->count()),
            
            'Umum' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('extras->event_name', EventName::SEMINAR->value)
                )
                ->badge(fn() => \App\Models\Registration::where('extras->event_name', EventName::SEMINAR->value)->count()),
            
            'Sudah Hadir' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('has_attended', true)
                )
                ->badge(fn() => \App\Models\Registration::where('has_attended', true)->count())
                ->badgeColor('success'),
            
            'Belum Hadir' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('has_attended', false)
                )
                ->badge(fn() => \App\Models\Registration::where('has_attended', false)->count())
                ->badgeColor('warning'),
        ];
    }
}