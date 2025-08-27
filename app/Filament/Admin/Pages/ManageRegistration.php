<?php

namespace App\Filament\Admin\Pages;

use App\Settings\RegistrationSettings;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;
use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageRegistration extends SettingsPage
{
    use HasPageShield;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Settings';

    protected static string $settings = RegistrationSettings::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('session_1_limit')
                    ->label('Limit Sesi 1')
                    ->helperText('Set ke -1 untuk limit tidak terbatas')
                    ->numeric()
                    ->step(1), 
                TextInput::make('session_2_limit')
                    ->label('Limit Sesi 2')
                    ->helperText('Set ke -1 untuk limit tidak terbatas')
                    ->numeric()
                    ->step(1),
                TextInput::make('session_3_limit')
                    ->label('Limit Sesi 3')
                    ->helperText('Set ke -1 untuk limit tidak terbatas')
                    ->numeric()
                    ->step(1),
            ]);
    }
}
