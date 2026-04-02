<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Registration;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        return [
            Stat::make('Total Registrasi', Registration::count())
                ->description('Pendaftar Terdaftar')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary')
                ->chart([7, 2, 10, 3, 15, 4, 17]),

            Stat::make('Sudah Hadir', Registration::where('has_attended', true)->count())
                ->description('Check-in Berhasil')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success')
                ->chart([3, 1, 5, 2, 8, 3, 10]),

            Stat::make('WhatsApp Terkirim', Registration::whereNotNull('last_blasted_at')->count())
                ->description('E-Ticket Sent')
                ->descriptionIcon('heroicon-m-paper-airplane')
                ->color('warning')
                ->chart([5, 3, 8, 4, 12, 6, 14]),
        ];
    }
}
