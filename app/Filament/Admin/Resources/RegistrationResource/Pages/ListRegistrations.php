<?php

namespace App\Filament\Admin\Resources\RegistrationResource\Pages;

use App\Enums\EventName;
use App\Filament\Admin\Resources\RegistrationResource;
use Filament\Actions;
use Filament\Resources\Components\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RegistrationExport;

class ListRegistrations extends ListRecords
{
    protected static string $resource = RegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('export')
                ->label('Export Excel')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->action(fn() => Excel::download(new RegistrationExport, 'data-registrasi-' . now()->format('Y-m-d-His') . '.xlsx')),
            Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'Semua' => Tab::make()
                ->badge(fn() => \App\Models\Registration::count()),
            
            'Komisi A' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('commission_type', 'A')
                )
                ->badge(fn() => \App\Models\Registration::where('commission_type', 'A')->count()),
            
            'Komisi B' => Tab::make()
                ->modifyQueryUsing(fn(Builder $query) => 
                    $query->where('commission_type', 'B')
                )
                ->badge(fn() => \App\Models\Registration::where('commission_type', 'B')->count()),
            
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