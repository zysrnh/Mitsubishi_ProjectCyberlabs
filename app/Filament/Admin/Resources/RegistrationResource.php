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
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
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
                    
                Select::make('vehicle')
                    ->label('Kendaraan yang Dipilih')
                    ->options([
                        'destinator' => 'Destinator',
                        'xpander' => 'Xpander',
                        'xforce' => 'Xforce',
                        'pajero_sport' => 'New Pajero Sport',
                    ])
                    ->afterStateHydrated(fn($set, $record) => $set('vehicle', $record->extras['vehicle'] ?? null))
                    ->dehydrated(false),
                    
                TextInput::make('event_name')
                    ->label('Nama Event')
                    ->afterStateHydrated(fn($set, $record) => $set('event_name', $record->extras['event_name'] ?? null))
                    ->dehydrated(false),
                    
                // ✅ FIELD BARU - SIM PHOTO (Read-only, tidak bisa diedit)
                FileUpload::make('sim_photo')
                    ->label('Foto SIM')
                    ->image()
                    ->disk('public')
                    ->directory('sim_photos')
                    ->afterStateHydrated(fn($set, $record) => $set('sim_photo', $record->extras['sim_photo'] ?? null))
                    ->disabled() // Read-only
                    ->dehydrated(false)
                    ->columnSpan(2)
                    ->visible(fn($record) => isset($record->extras['sim_photo'])),
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
                
                // ======== KOLOM TIPE REGISTRASI (PALING PENTING) ========
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
                    ->sortable()
                    ->searchable(),
                    
                // ======== KOLOM UNTUK KARANG TARUNA ========
                TextColumn::make('extras.region')
                    ->label('Tingkatan')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                // ======== KOLOM UNTUK UMUM ========
                TextColumn::make('extras.organization')
                    ->label('Organisasi')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                TextColumn::make('extras.position')
                    ->label('Jabatan')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                // ======== KOLOM UNTUK VIP ========
                TextColumn::make('extras.institution')
                    ->label('Instansi')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                // ======== KOLOM UNTUK MITSUBISHI IIMS (VISIBLE BY DEFAULT) ========
                TextColumn::make('extras.vehicle')
                    ->label('Kendaraan')
                    ->default('-')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn(?string $state): string => match ($state) {
                        'destinator' => 'Destinator',
                        'xpander' => 'Xpander',
                        'xforce' => 'Xforce',
                        'pajero_sport' => 'New Pajero Sport',
                        default => $state ?? '-',
                    })
                    ->toggleable()
                    ->sortable()
                    ->searchable(),
                    
                TextColumn::make('extras.dealer_branch')
                    ->label('Dealer Branch')
                    ->default('-')
                    ->toggleable()
                    ->sortable()
                    ->searchable(),
                    
                TextColumn::make('extras.assistant_sales')
                    ->label('Sales Assistant')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                TextColumn::make('extras.dealer')
                    ->label('Sales Dealer')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                TextColumn::make('extras.event_name')
                    ->label('Event')
                    ->default('-')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                
                // ✅ KOLOM BARU - SIM PHOTO
                ImageColumn::make('extras.sim_photo')
                    ->label('Foto SIM')
                    ->disk('public')
                    ->square()
                    ->defaultImageUrl(url('/images/no-image.png'))
                    ->toggleable(isToggledHiddenByDefault: true),
                
                // ======== STATUS COLUMNS ========
                IconColumn::make('qr_generated')
                    ->label('QR Generated')
                    ->boolean()
                    ->getStateUsing(fn($record) => !empty($record->qr_path))
                    ->toggleable(),
                
                IconColumn::make('wa_sent')
                    ->label('WA Sent')
                    ->boolean()
                    ->getStateUsing(fn($record) => !empty($record->last_blasted_at))
                    ->toggleable(),
                    
                IconColumn::make('has_attended')
                    ->label('Hadir')
                    ->boolean()
                    ->toggleable(),
                    
                ToggleColumn::make('has_attended')
                    ->label('Toggle Kehadiran')
                    ->afterStateUpdated(function (bool $state, $record) {
                        $record->update([
                            'attended_at' => $state ? now() : null,
                        ]);
                    })
                    ->visible(fn() => auth()->user()?->can('update_registration') ?? false)
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                TextColumn::make('attended_at')
                    ->label('Waktu Hadir')
                    ->dateTime('d M Y, H:i')
                    ->timezone('Asia/Jakarta')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                    
                TextColumn::make('last_blasted_at')
                    ->label('Last WA Sent')
                    ->since()
                    ->timezone('Asia/Jakarta')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
                    
                TextColumn::make('unique_code')
                    ->label('Kode Unik')
                    ->copyable()
                    ->copyMessage('Kode disalin!')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                    
                TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime('d M Y, H:i')
                    ->timezone('Asia/Jakarta')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                    
                TernaryFilter::make('has_attended')
                    ->label('Status Kehadiran')
                    ->trueLabel('Sudah Hadir')
                    ->falseLabel('Belum Hadir')
                    ->placeholder('Semua'),
                
                TernaryFilter::make('qr_generated')
                    ->label('QR Code')
                    ->trueLabel('Sudah Generate')
                    ->falseLabel('Belum Generate')
                    ->placeholder('Semua')
                    ->queries(
                        true: fn($query) => $query->whereNotNull('qr_path'),
                        false: fn($query) => $query->whereNull('qr_path'),
                    ),
                
                TernaryFilter::make('wa_sent')
                    ->label('WhatsApp')
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
                    
                // ======== FILTER KHUSUS MITSUBISHI ========
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
                    
                SelectFilter::make('vehicle')
                    ->label('Kendaraan')
                    ->multiple()
                    ->options([
                        'destinator' => 'Destinator',
                        'xpander' => 'Xpander',
                        'xforce' => 'Xforce',
                        'pajero_sport' => 'New Pajero Sport',
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
                    
                // ✅ FILTER BARU - Has SIM Photo
                TernaryFilter::make('has_sim_photo')
                    ->label('Foto SIM')
                    ->trueLabel('Sudah Upload')
                    ->falseLabel('Belum Upload')
                    ->placeholder('Semua')
                    ->queries(
                        true: fn($query) => $query->whereNotNull('extras->sim_photo'),
                        false: fn($query) => $query->whereNull('extras->sim_photo'),
                    ),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->modalHeading(fn(Registration $record) => 'Detail: ' . $record->name)
                    ->infolist(fn(Registration $record) => [
                        Section::make('Informasi Dasar')
                            ->schema([
                                TextEntry::make('name')
                                    ->label('Nama'),
                                TextEntry::make('phone')
                                    ->label('Nomor Telepon'),
                                TextEntry::make('email')
                                    ->label('Email')
                                    ->default('-'),
                                TextEntry::make('extras.type')
                                    ->label('Tipe Registrasi')
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
                                    }),
                            ])
                            ->columns(2),
                        
                        // Section untuk Karang Taruna
                        Section::make('Detail Karang Taruna')
                            ->schema([
                                TextEntry::make('extras.region')
                                    ->label('Tingkatan')
                                    ->default('-'),
                            ])
                            ->visible(fn() => ($record->extras['type'] ?? null) === 'karang_taruna'),
                        
                        // Section untuk Umum
                        Section::make('Detail Peserta Umum')
                            ->schema([
                                TextEntry::make('extras.organization')
                                    ->label('Organisasi')
                                    ->default('-'),
                                TextEntry::make('extras.position')
                                    ->label('Jabatan')
                                    ->default('-'),
                            ])
                            ->columns(2)
                            ->visible(fn() => ($record->extras['type'] ?? null) === 'umum'),
                        
                        // Section untuk VIP
                        Section::make('Detail VIP/VVIP')
                            ->schema([
                                TextEntry::make('extras.institution')
                                    ->label('Instansi')
                                    ->default('-'),
                            ])
                            ->visible(fn() => ($record->extras['type'] ?? null) === 'vip'),
                        
                        // Section untuk Mitsubishi IIMS
                        Section::make('Detail Mitsubishi IIMS')
                            ->schema([
                                TextEntry::make('extras.vehicle')
                                    ->label('Kendaraan yang Dipilih')
                                    ->badge()
                                    ->color('info')
                                    ->formatStateUsing(fn(?string $state): string => match ($state) {
                                        'destinator' => 'Destinator',
                                        'xpander' => 'Xpander',
                                        'xforce' => 'Xforce',
                                        'pajero_sport' => 'New Pajero Sport',
                                        default => '-',
                                    }),
                                TextEntry::make('extras.dealer_branch')
                                    ->label('Dealer Branch')
                                    ->default('-'),
                                TextEntry::make('extras.assistant_sales')
                                    ->label('Nama Sales Assistant')
                                    ->default('-'),
                                TextEntry::make('extras.dealer')
                                    ->label('Sales Dealer')
                                    ->default('-'),
                                TextEntry::make('extras.event_name')
                                    ->label('Nama Event')
                                    ->default('-'),
                                // ✅ TAMBAHAN BARU - SIM PHOTO VIEWER
                                ImageEntry::make('extras.sim_photo')
                                    ->label('Foto SIM')
                                    ->disk('public')
                                    ->defaultImageUrl(url('/images/no-image.png'))
                                    ->columnSpanFull()
                                    ->visible(fn() => !empty($record->extras['sim_photo'])),
                            ])
                            ->columns(2)
                            ->visible(fn() => ($record->extras['type'] ?? null) === 'mitsubishi_iims'),
                        
                        // Section Status
                        Section::make('Status')
                            ->schema([
                                TextEntry::make('unique_code')
                                    ->label('Kode Unik')
                                    ->copyable()
                                    ->badge()
                                    ->color('gray'),
                                IconEntry::make('qr_generated')
                                    ->label('QR Code Generated')
                                    ->boolean()
                                    ->getStateUsing(fn() => !empty($record->qr_path)),
                                IconEntry::make('wa_sent')
                                    ->label('WhatsApp Terkirim')
                                    ->boolean()
                                    ->getStateUsing(fn() => !empty($record->last_blasted_at)),
                                IconEntry::make('has_attended')
                                    ->label('Sudah Hadir')
                                    ->boolean(),
                                TextEntry::make('attended_at')
                                    ->label('Waktu Hadir')
                                    ->dateTime('d F Y, H:i')
                                    ->timezone('Asia/Jakarta')
                                    ->default('-')
                                    ->visible(fn() => $record->has_attended),
                                TextEntry::make('last_blasted_at')
                                    ->label('Terakhir Kirim WA')
                                    ->dateTime('d F Y, H:i')
                                    ->timezone('Asia/Jakarta')
                                    ->default('-')
                                    ->visible(fn() => !empty($record->last_blasted_at)),
                                TextEntry::make('created_at')
                                    ->label('Terdaftar Pada')
                                    ->dateTime('d F Y, H:i')
                                    ->timezone('Asia/Jakarta'),
                            ])
                            ->columns(2),
                    ]),
                    
                Tables\Actions\EditAction::make(),
                
                // ✅ ACTION BARU - View SIM Photo in Modal
                Action::make('view_sim')
                    ->label('Lihat SIM')
                    ->icon('heroicon-o-identification')
                    ->color('info')
                    ->modalHeading(fn(Registration $record) => 'Foto SIM - ' . $record->name)
                    ->modalContent(fn(Registration $record) => view('components.sim-photo-modal', [
                        'imageUrl' => $record->sim_photo_url,
                        'name' => $record->name,
                    ]))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Tutup')
                    ->slideOver()
                    ->modalWidth('3xl')
                    ->visible(fn(Registration $record) => !empty($record->extras['sim_photo'])),
                
                // ✅ ACTION BARU - Download SIM Photo
                Action::make('download_sim')
                    ->label('Download SIM')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->url(fn(Registration $record) => $record->sim_photo_url)
                    ->openUrlInNewTab()
                    ->visible(fn(Registration $record) => !empty($record->extras['sim_photo'])),
                
                Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-s-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Approve Registrasi?')
                    ->modalDescription('QR Code akan digenerate dan dikirim via WhatsApp.')
                    ->modalSubmitActionLabel('Ya, Approve')
                    ->hidden(fn(Registration $record) => !empty($record->qr_path))
                    ->action(function (Registration $record) {
                        // Generate QR Code
                        GenerateQr::dispatchSync($record);
                        
                        // Update qr_path
                        $record->update([
                            'qr_path' => 'qr_codes/' . $record->unique_code . '.png',
                        ]);
                        
                        // Kirim ke WhatsApp
                        Bus::chain([
                            new SendQrToWhatsapp($record),
                        ])->dispatch();

                        $record->recordWhatsappSent();
                    })
                    ->successNotificationTitle('QR Code berhasil digenerate dan dikirim'),
                
                Action::make('preview_qr')
                    ->label('Lihat QR')
                    ->icon('heroicon-s-qr-code')
                    ->color('info')
                    ->url(fn(Registration $record) => $record->qr_url)
                    ->openUrlInNewTab()
                    ->hidden(fn(Registration $record) => empty($record->qr_path)),
                    
                Action::make('resend_wa')
                    ->label('Kirim Ulang WA')
                    ->icon('heroicon-s-paper-airplane')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Kirim Ulang QR Code?')
                    ->modalDescription('QR Code akan dikirim ulang via WhatsApp.')
                    ->modalSubmitActionLabel('Ya, Kirim')
                    ->hidden(fn(Registration $record) => empty($record->qr_path))
                    ->action(function (Registration $record) {
                        Bus::chain([
                            new SendQrToWhatsapp($record),
                        ])->dispatch();

                        $record->recordWhatsappSent();
                    })
                    ->successNotificationTitle('QR Code berhasil dikirim ulang'),
                
                Tables\Actions\DeleteAction::make()
                    ->before(function (Registration $record) {
                        // ✅ HAPUS FILE SIM PHOTO
                        if (isset($record->extras['sim_photo']) && $record->extras['sim_photo']) {
                            if (Storage::disk('public')->exists($record->extras['sim_photo'])) {
                                Storage::disk('public')->delete($record->extras['sim_photo']);
                            }
                        }
                        
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
                Action::make('export')
                    ->label('Export Excel')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->form([
                        Select::make('type')
                            ->label('Pilih Tipe')
                            ->options([
                                'all' => 'Semua',
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
                        $filename = 'registrasi_' . $type . '_' . now()->format('Ymd_His') . '.xlsx';
                        
                        return Excel::download(new RegistrationExport($type), $filename);
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->before(function ($records) {
                            foreach ($records as $record) {
                                // ✅ HAPUS FILE SIM PHOTO
                                if (isset($record->extras['sim_photo']) && $record->extras['sim_photo']) {
                                    if (Storage::disk('public')->exists($record->extras['sim_photo'])) {
                                        Storage::disk('public')->delete($record->extras['sim_photo']);
                                    }
                                }
                                
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
                                // ✅ HAPUS FILE SIM PHOTO
                                if (isset($record->extras['sim_photo']) && $record->extras['sim_photo']) {
                                    if (Storage::disk('public')->exists($record->extras['sim_photo'])) {
                                        Storage::disk('public')->delete($record->extras['sim_photo']);
                                    }
                                }
                                
                                if ($record->qr_path) {
                                    $path = str_replace(config('app.url') . '/storage/', '', $record->qr_path);
                                    if (Storage::disk('public')->exists($path)) {
                                        Storage::disk('public')->delete($path);
                                    }
                                }
                            }
                        }),
                    Tables\Actions\RestoreBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('bulk_approve')
                        ->label('Approve & Kirim QR')
                        ->icon('heroicon-s-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading('Approve & Kirim QR Code?')
                        ->modalDescription('QR Code akan digenerate dan dikirim ke semua registrasi terpilih.')
                        ->modalSubmitActionLabel('Ya, Approve & Kirim')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                // Skip jika sudah ada QR
                                if (!empty($record->qr_path)) {
                                    continue;
                                }
                                
                                // Generate QR Code
                                GenerateQr::dispatchSync($record);
                                
                                // Update qr_path
                                $record->update([
                                    'qr_path' => 'qr_codes/' . $record->unique_code . '.png',
                                ]);
                                
                                // Kirim ke WhatsApp
                                Bus::chain([
                                    new SendQrToWhatsapp($record),
                                ])->dispatch();

                                $record->recordWhatsappSent();
                            }
                        })
                        ->successNotificationTitle('QR Code berhasil digenerate dan dikirim')
                        ->deselectRecordsAfterCompletion(),
                    
                    Tables\Actions\BulkAction::make('bulk_resend')
                        ->label('Kirim Ulang WA')
                        ->icon('heroicon-s-paper-airplane')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->modalHeading('Kirim Ulang QR Code?')
                        ->modalDescription('QR Code akan dikirim ulang ke semua registrasi terpilih.')
                        ->modalSubmitActionLabel('Ya, Kirim Ulang')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                // Skip jika belum ada QR
                                if (empty($record->qr_path)) {
                                    continue;
                                }
                                
                                Bus::chain([
                                    new SendQrToWhatsapp($record),
                                ])->dispatch();

                                $record->recordWhatsappSent();
                            }
                        })
                        ->successNotificationTitle('QR Code berhasil dikirim ulang')
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->paginated([10, 25, 50, 100]);
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