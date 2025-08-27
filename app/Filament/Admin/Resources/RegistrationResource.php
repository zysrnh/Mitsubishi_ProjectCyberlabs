<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\RegistrationResource\Pages;
use App\Filament\Admin\Resources\RegistrationResource\RelationManagers;
use App\Jobs\GenerateQr;
use App\Jobs\SendQrToEmail;
use App\Jobs\SendQrToWhatsapp;
use App\Models\Registration;
use App\Models\Seat;
use Carbon\Carbon;
use Dom\Text;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Bus;

class RegistrationResource extends Resource
{
    protected static ?string $model = Registration::class;

    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Nama')
                    ->required()
                    ->columnSpan(2),
                TextInput::make('phone')
                    ->label('Nomor Telepon (Whatsapp)')
                    ->tel()
                    ->prefix('+62'),
                TextInput::make('email')
                    ->label('Email')
                    ->required()
                    ->email(),
                TextInput::make('organization')
                    ->label('Institusi/Media')
                    ->afterStateHydrated(fn($set, $record) => $set('organization', $record->extras['organization'] ?? null)),
                TextInput::make('session')
                    ->label('Sesi')
                    ->afterStateHydrated(fn($set, $record) => $set('session', $record->extras['session'] ?? null))
                    ->numeric()
                    ->step(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->sortable()
                    ->description(fn(Registration $record): string => $record->phone ?? ''),
                TextColumn::make('email')
                    ->label('Email')
                    ->toggleable(),
                TextColumn::make('extras.session')
                    ->label('Sesi')
                    ->default('-')
                    ->toggleable(),
                IconColumn::make('has_attended_display')
                    ->label('Telah Hadir')
                    ->boolean()
                    ->getStateUsing(fn($record) => $record->has_attended)
                    ->toggleable(),
                ToggleColumn::make('has_attended')
                    ->label('Ubah Status Kehadiran')
                    ->afterStateUpdated(function (bool $state, $record) {
                        $record->update([
                            'attended_at' => $state ? now() : null,
                        ]);
                    })
                    ->visible(fn() => auth()->user()->can('update_registration'))
                    ->toggleable(),
                TextColumn::make('attended_at')
                    ->label('Hadir pada')
                    ->dateTime('d F Y, H:i')
                    ->timezone('Asia/Jakarta')
                    ->toggleable(),
                TextColumn::make('last_blasted_at')
                    ->label('Terakhir Kirim')
                    ->since()
                    ->timezone('Asia/Jakarta')
                    ->toggleable()

            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                TernaryFilter::make('has_attended')
                    ->label('Status Kehadiran')
                    ->trueLabel('Hadir')
                    ->falseLabel('Belum Hadir')
                    ->placeholder('Semua'),
                // TernaryFilter::make('is_approved')
                //     ->label('Approval Status')
                //     ->trueLabel('Approved')
                //     ->falseLabel('Belum Approved')
                //     ->placeholder('Semua'),
                // SelectFilter::make('type')
                //     ->label('Tipe Registrasi')
                //     ->multiple()
                //     ->options([
                //         'vip' => 'VIP',
                //         'regular' => 'Umum/Regular',
                //         'pers' => 'Pers',
                //     ])
                //     ->query(function ($query, array $data) {
                //         if (! empty($data['values'])) {
                //             $query->where(function ($q) use ($data) {
                //                 foreach ($data['values'] as $value) {
                //                     $q->orWhereJsonContains('extras->type', $value);
                //                 }
                //             });
                //         }
                //     }),
            ])
            ->actions([
                Action::make('view registration')
                    ->label('Detail')
                    ->icon('heroicon-s-eye')
                    ->infolist([
                        Section::make('Informasi Pribadi')
                            ->columns([
                                'sm' => 1,
                                'md' => 2,
                                'lg' => 2,
                                'xl' => 3,
                            ])
                            ->schema([
                                TextEntry::make('name')->label('Nama'),
                                TextEntry::make('phone')->label('Nomor Telepon (Whatsapp)'),
                                TextEntry::make('email')->label('Email'),
                            ]),
                        Section::make('Kehadiran')
                            ->columns([
                                'sm' => 1,
                                'md' => 2,
                                'lg' => 2,
                                'xl' => 3,
                            ])
                            ->schema([
                                IconEntry::make('has_attended')
                                    ->label('Telah Hadir')
                                    ->boolean(),
                                TextEntry::make('attended_at')
                                    ->label('Hadir pada')
                                    ->dateTime('d F Y, H:i')
                                    ->timezone('Asia/Jakarta'),
                                TextEntry::make('last_blasted_at')
                                    ->label('Terakhir Kirim')
                                    ->since()
                                    ->timezone('Asia/Jakarta'),
                            ]),
                    ]),
                Tables\Actions\EditAction::make(),
                Action::make('preview')
                    ->label('Preview')
                    ->icon('heroicon-s-qr-code')
                    ->url(fn(Registration $record) => $record->qr_path)
                    ->openUrlInNewTab(),
                // Tables\Actions\Action::make('approve')
                //     ->label('Approve')
                //     ->icon('heroicon-s-check-badge')
                //     ->visible(fn($record) => ! $record->is_approved)
                //     ->requiresConfirmation()
                //     ->modalHeading('Setujui Registrasi Ini?')
                //     ->modalDescription('Yang bersangkutan akan dikirim email dan whatsapp konfirmasi. Apakah anda yakin?')
                //     ->modalSubmitActionLabel('Ya, Setujui')
                //     ->action(function ($record) {
                //         $record->update(['is_approved' => true]);

                //         Bus::chain([
                //             new GenerateQr($record),
                //             new SendQrToEmail($record),
                //             new SendQrToWhatsapp($record),
                //         ])->dispatch();
                //     }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRegistrations::route('/'),
            'create' => Pages\CreateRegistration::route('/create'),
            'edit' => Pages\EditRegistration::route('/{record}/edit'),
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
