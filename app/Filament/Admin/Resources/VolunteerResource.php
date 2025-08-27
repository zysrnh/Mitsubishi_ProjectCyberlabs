<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\VolunteerResource\Pages;
use App\Filament\Admin\Resources\VolunteerResource\RelationManagers;
use App\Models\Volunteer;
use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class VolunteerResource extends Resource
{
    protected static ?string $model = Volunteer::class;

    protected static ?string $navigationIcon = 'heroicon-s-users';
    protected static bool $shouldRegisterNavigation = false;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('event_id')
                    ->label('Event')
                    ->relationship('event', 'name')
                    ->required(),
                TextInput::make('name')
                    ->label('Nama')
                    ->required(),
                TextInput::make('phone')
                    ->label('Nomor Telepon')
                    ->tel()
                    ->required(),
                TextInput::make('email')
                    ->email()
                    ->required(),
                TextInput::make('job_title')
                    ->label('Pekerjaan')
                    ->required(),
                TextInput::make('organization')
                    ->label('Institusi')
                    ->required(),
                FileUpload::make('cv')
                    ->disk('public')
                     ->directory('cv_volunteers')
                    ->label('CV')
                    ->required()
                    ->openable()
                    ->downloadable()
                    ->acceptedFileTypes([
                        'application/pdf',
                        'image/*',
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                TextColumn::make('event.name')
                    ->label('Event')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Nomor Telepon')
                    ->searchable(),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('job_title')
                    ->label('Pekerjaan')
                    ->searchable(),
                TextColumn::make('organization')
                    ->label('Institusi')
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\SelectFilter::make('event_id')
                    ->label('Event')
                    ->relationship('event', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),

            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageVolunteers::route('/'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
