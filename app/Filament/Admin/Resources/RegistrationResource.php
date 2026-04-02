<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\RegistrationResource\Pages;
use App\Jobs\GenerateQr;
use App\Jobs\SendQrToWhatsapp;
use App\Models\Registration;
use Carbon\Carbon;
use Filament\Forms;
use Filament\Forms\Components\Section as FormSection;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Bus;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RegistrationExport;
use Illuminate\Support\Facades\Storage;

class RegistrationResource extends Resource
{
    protected static ?string $model = Registration::class;

    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';
    
    protected static ?string $navigationLabel = 'Data Registrasi';
    
    protected static ?string $pluralModelLabel = 'Data Registrasi';
    
    protected static ?string $modelLabel = 'Registrasi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FormSection::make('Informasi Instansi')
                    ->schema([
                        TextInput::make('company_name')
                            ->label('Nama Perusahaan')
                            ->required(),
                        TextInput::make('nia')
                            ->label('NIA (Nomor Induk Anggota)')
                            ->required(),
                        Forms\Components\Textarea::make('company_address')
                            ->label('Alamat Perusahaan')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('company_phone')
                            ->label('Telepon Perusahaan')
                            ->required(),
                        TextInput::make('website')
                            ->label('Website')
                            ->url(),
                        TextInput::make('social_media')
                            ->label('Media Sosial'),
                        Forms\Components\Select::make('commission_type')
                            ->label('Tipe Komisi')
                            ->options([
                                'A' => 'Komisi A',
                                'B' => 'Komisi B',
                            ])
                            ->required(),
                    ])->columns(2),
                
                FormSection::make('Informasi Personal')
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama Lengkap')
                            ->required(),
                        TextInput::make('position')
                            ->label('Jabatan')
                            ->required(),
                        TextInput::make('phone')
                            ->label('Nomor WhatsApp')
                            ->tel()
                            ->required(),
                        TextInput::make('email')
                            ->label('Email')
                            ->email(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->sortable()
                    ->searchable()
                    ->description(fn(Registration $record): string => $record->position ?? ''),
                
                TextColumn::make('company_name')
                    ->label('Perusahaan')
                    ->sortable()
                    ->searchable()
                    ->description(fn(Registration $record): string => "NIA: {$record->nia}"),

                TextColumn::make('commission_type')
                    ->label('Komisi')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'A' => 'info',
                        'B' => 'success',
                        default => 'gray',
                    }),
                
                TextColumn::make('phone')
                    ->label('WhatsApp')
                    ->searchable(),
                
                IconColumn::make('wa_sent')
                    ->label('WA Sent')
                    ->boolean()
                    ->getStateUsing(fn($record) => !empty($record->last_blasted_at))
                    ->toggleable(),
                    
                TextColumn::make('attended_at')
                    ->label('Kehadiran')
                    ->formatStateUsing(function ($state, Registration $record) {
                        if ($record->has_attended && $state) {
                            return Carbon::parse($state)
                                ->timezone('Asia/Jakarta')
                                ->format('H:i');
                        }
                        return '-';
                    })
                    ->badge()
                    ->color(fn(Registration $record): string => $record->has_attended ? 'success' : 'gray')
                    ->icon(fn(Registration $record): string => $record->has_attended ? 'heroicon-o-check-circle' : 'heroicon-o-x-circle')
                    ->sortable(),
                    
                ToggleColumn::make('has_attended')
                    ->label('Check-in')
                    ->afterStateUpdated(function (bool $state, $record) {
                        $record->update([
                            'attended_at' => $state ? now() : null,
                        ]);
                    }),
                    
                TextColumn::make('created_at')
                    ->label('Waktu Daftar')
                    ->dateTime('d M Y, H:i')
                    ->timezone('Asia/Jakarta')
                    ->toggleable()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                TernaryFilter::make('has_attended')
                    ->label('Status Kehadiran'),
                TernaryFilter::make('wa_sent')
                    ->label('WhatsApp Terkirim')
                    ->queries(
                        true: fn($query) => $query->whereNotNull('last_blasted_at'),
                        false: fn($query) => $query->whereNull('last_blasted_at'),
                    ),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                
                Action::make('resend_wa')
                    ->label('Kirim WA')
                    ->icon('heroicon-s-paper-airplane')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->action(function (Registration $record) {
                        if (empty($record->qr_path)) {
                            GenerateQr::dispatchSync($record);
                            $record->update(['qr_path' => 'qr_codes/' . $record->unique_code . '.png']);
                        }
                        
                        Bus::chain([
                            new SendQrToWhatsapp($record),
                        ])->dispatch();

                        $record->recordWhatsappSent();
                    }),

                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('bulk_resend')
                        ->label('Kirim Ulang WA')
                        ->icon('heroicon-s-paper-airplane')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                if (empty($record->qr_path)) {
                                    GenerateQr::dispatchSync($record);
                                    $record->update(['qr_path' => 'qr_codes/' . $record->unique_code . '.png']);
                                }
                                
                                Bus::chain([
                                    new SendQrToWhatsapp($record),
                                ])->dispatch();

                                $record->recordWhatsappSent();
                            }
                        }),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Detail Registrasi')
                    ->schema([
                        TextEntry::make('company_name')->label('Nama Perusahaan'),
                        TextEntry::make('nia')->label('NIA'),
                        TextEntry::make('name')->label('Nama Lengkap'),
                        TextEntry::make('position')->label('Jabatan'),
                        TextEntry::make('phone')->label('Nomor WhatsApp'),
                        TextEntry::make('email')->label('Email'),
                        TextEntry::make('unique_code')
                            ->label('Kode Unik')
                            ->badge()
                            ->color('gray'),
                    ])->columns(2),
                
                Section::make('Status')
                    ->schema([
                        IconEntry::make('has_attended')
                            ->label('Sudah Hadir')
                            ->boolean(),
                        TextEntry::make('attended_at')
                            ->label('Waktu Hadir')
                            ->dateTime('d M Y, H:i')
                            ->timezone('Asia/Jakarta'),
                        TextEntry::make('last_blasted_at')
                            ->label('WA Terakhir Dikirim')
                            ->dateTime('d M Y, H:i')
                            ->timezone('Asia/Jakarta'),
                    ])->columns(3),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRegistrations::route('/'),
            'create' => Pages\CreateRegistration::route('/create'),
            'edit' => Pages\EditRegistration::route('/{record}/edit'),
        ];
    }
}