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
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RegistrationExport;
use App\Exports\RegistrationAttendedSheet;
use App\Exports\RegistrationNotAttendedSheet;
use Illuminate\Support\Facades\Storage;

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
                    ->prefix('+62')
                    ->required(),
                
                TextInput::make('email')
                    ->label('Email')
                    ->email(),
                
                // Field untuk Karang Taruna (region/tingkatan)
                TextInput::make('region')
                    ->label('Tingkatan')
                    ->afterStateHydrated(fn($set, $record) => $set('region', $record->extras['region'] ?? null))
                    ->dehydrated(false),
                    
                // Field untuk Peserta Umum (organization)
                TextInput::make('organization')
                    ->label('Organisasi')
                    ->afterStateHydrated(fn($set, $record) => $set('organization', $record->extras['organization'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('position')
                    ->label('Jabatan')
                    ->afterStateHydrated(fn($set, $record) => $set('position', $record->extras['position'] ?? null))
                    ->dehydrated(false),
                    
                // Field untuk VIP (institution)
                TextInput::make('institution')
                    ->label('Instansi')
                    ->afterStateHydrated(fn($set, $record) => $set('institution', $record->extras['institution'] ?? null))
                    ->dehydrated(false),
                    
                // ======== FIELD UNTUK MITSUBISHI IIMS ========
                TextInput::make('assistant_sales')
                    ->label('Nama Sales Assistant')
                    ->afterStateHydrated(fn($set, $record) => $set('assistant_sales', $record->extras['assistant_sales'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('dealer')
                    ->label('Sales Dealer')
                    ->afterStateHydrated(fn($set, $record) => $set('dealer', $record->extras['dealer'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('dealer_branch')
                    ->label('Dealer Branch')
                    ->afterStateHydrated(fn($set, $record) => $set('dealer_branch', $record->extras['dealer_branch'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('vehicle')
                    ->label('Kendaraan yang Dipilih')
                    ->afterStateHydrated(fn($set, $record) => $set('vehicle', $record->extras['vehicle'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('event_name')
                    ->label('Nama Event')
                    ->afterStateHydrated(fn($set, $record) => $set('event_name', $record->extras['event_name'] ?? null))
                    ->dehydrated(false),
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
                    ->description(fn(Registration $record): string => $record->phone ?? ''),
                
                TextColumn::make('email')
                    ->label('Email')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.region')
                    ->label('Tingkatan')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.organization')
                    ->label('Organisasi')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.position')
                    ->label('Jabatan')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.institution')
                    ->label('Instansi')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                // ======== KOLOM UNTUK MITSUBISHI IIMS ========
                TextColumn::make('extras.dealer_branch')
                    ->label('Dealer Branch')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.vehicle')
                    ->label('Kendaraan')
                    ->default('-')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn(?string $state): string => match ($state) {
                        'destinator' => 'Destinator',
                        'xpander' => 'Xpander',
                        'xforce' => 'Xforce',
                        'pajero_sport' => 'Pajero Sport',
                        default => $state ?? '-',
                    })
                    ->toggleable(),
                    
                TextColumn::make('extras.assistant_sales')
                    ->label('Sales Assistant')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.event_name')
                    ->label('Event')
                    ->default('-')
                    ->toggleable()
                    ->searchable(),
                    
                TextColumn::make('extras.type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn(?string $state): string => match ($state) {
                        'karang_taruna' => 'warning',
                        'umum' => 'info',
                        'vip' => 'success',
                        'mitsubishi_iims' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn(?string $state): string => match ($state) {
                        'karang_taruna' => 'Karang Taruna',
                        'umum' => 'Umum',
                        'vip' => 'VIP/VVIP',
                        'mitsubishi_iims' => 'Mitsubishi IIMS',
                        default => '-',
                    })
                    ->toggleable(),
                
                // Status QR Code Generated
                IconColumn::make('qr_generated_display')
                    ->label('QR Generated')
                    ->boolean()
                    ->getStateUsing(fn($record) => !empty($record->qr_path))
                    ->toggleable(),
                
                // Status WhatsApp Terkirim
                IconColumn::make('wa_sent_display')
                    ->label('WA Terkirim')
                    ->boolean()
                    ->getStateUsing(fn($record) => !empty($record->last_blasted_at))
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
                    ->label('Terakhir Kirim WA')
                    ->since()
                    ->timezone('Asia/Jakarta')
                    ->toggleable(),
                    
                TextColumn::make('unique_code')
                    ->label('Kode Unik')
                    ->copyable()
                    ->copyMessage('Kode berhasil disalin!')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                    
                TernaryFilter::make('has_attended')
                    ->label('Status Kehadiran')
                    ->trueLabel('Hadir')
                    ->falseLabel('Belum Hadir')
                    ->placeholder('Semua'),
                
                TernaryFilter::make('qr_generated')
                    ->label('QR Code Generated')
                    ->trueLabel('Sudah Generate')
                    ->falseLabel('Belum Generate')
                    ->placeholder('Semua')
                    ->queries(
                        true: fn($query) => $query->whereNotNull('qr_path'),
                        false: fn($query) => $query->whereNull('qr_path'),
                    ),
                
                TernaryFilter::make('wa_sent')
                    ->label('WhatsApp Terkirim')
                    ->trueLabel('Sudah Terkirim')
                    ->falseLabel('Belum Terkirim')
                    ->placeholder('Semua')
                    ->queries(
                        true: fn($query) => $query->whereNotNull('last_blasted_at'),
                        false: fn($query) => $query->whereNull('last_blasted_at'),
                    ),
                    
                SelectFilter::make('type')
                    ->label('Tipe Registrasi')
                    ->multiple()
                    ->options([
                        'karang_taruna' => 'Karang Taruna',
                        'umum' => 'Umum',
                        'vip' => 'VIP/VVIP',
                        'mitsubishi_iims' => 'Mitsubishi IIMS',
                    ])
                    ->query(function ($query, array $data) {
                        if (! empty($data['values'])) {
                            $query->where(function ($q) use ($data) {
                                foreach ($data['values'] as $value) {
                                    $q->orWhereJsonContains('extras->type', $value);
                                }
                            });
                        }
                    }),
                    
                // Filter khusus Mitsubishi - Dealer Branch
                SelectFilter::make('dealer_branch')
                    ->label('Dealer Branch')
                    ->multiple()
                    ->options([
                        'Jakarta Pusat' => 'Jakarta Pusat',
                        'Jakarta Selatan' => 'Jakarta Selatan',
                        'Jakarta Utara' => 'Jakarta Utara',
                        'Jakarta Barat' => 'Jakarta Barat',
                        'Jakarta Timur' => 'Jakarta Timur',
                        'Tangerang' => 'Tangerang',
                        'Bekasi' => 'Bekasi',
                        'Bandung' => 'Bandung',
                        'Surabaya' => 'Surabaya',
                    ])
                    ->query(function ($query, array $data) {
                        if (! empty($data['values'])) {
                            $query->where(function ($q) use ($data) {
                                foreach ($data['values'] as $value) {
                                    $q->orWhereJsonContains('extras->dealer_branch', $value);
                                }
                            });
                        }
                    }),
                    
                // Filter khusus Mitsubishi - Vehicle
                SelectFilter::make('vehicle')
                    ->label('Kendaraan')
                    ->multiple()
                    ->options([
                        'destinator' => 'Destinator',
                        'xpander' => 'Xpander',
                        'xforce' => 'Xforce',
                        'pajero_sport' => 'Pajero Sport',
                    ])
                    ->query(function ($query, array $data) {
                        if (! empty($data['values'])) {
                            $query->where(function ($q) use ($data) {
                                foreach ($data['values'] as $value) {
                                    $q->orWhereJsonContains('extras->vehicle', $value);
                                }
                            });
                        }
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                
                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-s-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Approve Registrasi?')
                    ->modalDescription('QR Code akan digenerate dan dikirim via WhatsApp. Apakah anda yakin?')
                    ->modalSubmitActionLabel('Ya, Approve')
                    ->visible(fn(Registration $record) => !$record->is_approved)
                    ->action(function ($record) {
                        // Generate QR Code
                        GenerateQr::dispatchSync($record);
                        
                        // Kirim ke WhatsApp
                        Bus::chain([
                            new SendQrToWhatsapp($record),
                        ])->dispatch();

                        // Update status approval
                        $record->update([
                            'is_approved' => true,
                            'approved_at' => now(),
                            'last_blasted_at' => now(),
                        ]);
                    })
                    ->successNotificationTitle('Registrasi berhasil di-approve dan QR Code dikirim'),
                
                Action::make('preview')
                    ->label('Preview QR')
                    ->icon('heroicon-s-qr-code')
                    ->url(fn(Registration $record) => $record->qr_path)
                    ->openUrlInNewTab()
                    ->visible(fn(Registration $record) => $record->is_approved),
                    
                Action::make('resend')
                    ->label('Kirim WhatsApp')
                    ->icon('heroicon-s-paper-airplane')
                    ->requiresConfirmation()
                    ->modalHeading('Kirim Ulang QR Code?')
                    ->modalDescription('QR Code akan dikirim ulang via WhatsApp. Apakah anda yakin?')
                    ->modalSubmitActionLabel('Ya, Kirim Ulang')
                    ->visible(fn(Registration $record) => $record->is_approved)
                    ->action(function ($record) {
                        Bus::chain([
                            new SendQrToWhatsapp($record),
                        ])->dispatch();

                        $record->update([
                            'last_blasted_at' => now(),
                        ]);
                    })
                    ->successNotificationTitle('QR Code berhasil dikirim ulang'),
                
                // Delete Action dengan cleanup QR file
                Tables\Actions\DeleteAction::make()
                    ->before(function ($record) {
                        // Hapus file QR jika ada
                        if ($record->qr_path) {
                            $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                            if (Storage::disk('public')->exists($path)) {
                                Storage::disk('public')->delete($path);
                            }
                        }
                    }),
            ])
            ->headerActions([
                Action::make('export_kehadiran')
                    ->label('Export Kehadiran')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->form([
                        Select::make('type')
                            ->label('Pilih Tipe')
                            ->options([
                                'all' => 'Semua (Karang Taruna, Umum, VIP & Mitsubishi)',
                                'karang_taruna' => 'Karang Taruna',
                                'umum' => 'Umum',
                                'vip' => 'VIP/VVIP',
                                'mitsubishi_iims' => 'Mitsubishi IIMS',
                            ])
                            ->required()
                            ->default('all'),
                    ])
                    ->action(function (array $data) {
                        $type = $data['type'];
                        $filename = 'kehadiran_' . $type . '_' . now()->format('Y-m-d_His') . '.xlsx';
                        
                        return Excel::download(new RegistrationExport($type), $filename);
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->before(function ($records) {
                            foreach ($records as $record) {
                                if ($record->qr_path) {
                                    $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                                    if (Storage::disk('public')->exists($path)) {
                                        Storage::disk('public')->delete($path);
                                    }
                                }
                            }
                        }),
                    Tables\Actions\ForceDeleteBulkAction::make()
                        ->before(function ($records) {
                            foreach ($records as $record) {
                                if ($record->qr_path) {
                                    $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                                    if (Storage::disk('public')->exists($path)) {
                                        Storage::disk('public')->delete($path);
                                    }
                                }
                            }
                        }),
                    Tables\Actions\RestoreBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('bulk_resend')
                        ->label('Kirim Pada Tiap Peserta')
                        ->icon('heroicon-s-paper-airplane')
                        ->requiresConfirmation()
                        ->modalHeading('Kirim Ulang QR Code ke Registrasi Terpilih?')
                        ->modalDescription('QR Code akan dikirim ulang via WhatsApp ke semua registrasi yang dipilih.')
                        ->modalSubmitActionLabel('Ya, Kirim Ulang')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                Bus::chain([
                                    new SendQrToWhatsapp($record),
                                ])->dispatch();

                                $record->update([
                                    'last_blasted_at' => now(),
                                ]);
                            }
                        })
                        ->successNotificationTitle('QR Code berhasil dikirim ulang ke registrasi terpilih')
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
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