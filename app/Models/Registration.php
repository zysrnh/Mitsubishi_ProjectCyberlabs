<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Registration extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'unique_code',
        'has_attended',
        'is_approved',
        'approved_at',
        'attended_at',
        'last_blasted_at',
        'last_successful_sent_at',
        'whatsapp_send_attempts',
        'extras',
        'event_id',
    ];

    protected $appends = [
        'qr_path',
        'qr_full_path',
    ];

    protected static function booted(): void
    {
        static::creating(function (Registration $registration) {
            if (empty($registration->unique_code)) {
                $registration->unique_code = static::generateUniqueCode();
            }
        });

        static::deleted(function (Registration $registration) {
            if ($registration->seat) {
                $registration->seat->update([
                    'registration_id' => null,
                ]);
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'extras' => 'array',
            'is_approved' => 'boolean',
            'has_attended' => 'boolean',
            'approved_at' => 'datetime',
            'attended_at' => 'datetime',
            'last_blasted_at' => 'datetime',
            'last_successful_sent_at' => 'datetime',
        ];
    }

    // ==================== QR Code Attributes ====================

    protected function qrPath(): Attribute
    {
        return Attribute::make(
            get: fn() => asset('storage/qr_codes/' . $this->unique_code . '.png')
        );
    }

    protected function qrFullPath(): Attribute
    {
        return Attribute::make(
            get: fn() => 'storage/qr_codes/' . $this->unique_code . '.png'
        );
    }

    protected function qrDiskPath(): Attribute
    {
        return Attribute::make(
            get: fn() => 'qr_codes/' . $this->unique_code . '.png'
        );
    }

    // ==================== Extras Accessors ====================
    // Tambahkan di bagian Extras Accessors

    public function getRegionAttribute()
    {
        return $this->extras['region'] ?? null;
    }
    public function getOrganizationAttribute()
    {
        return $this->extras['organization'] ?? null;
    }

    public function getPositionAttribute()
    {
        return $this->extras['position'] ?? null;
    }

    public function getShirtNumberAttribute()
    {
        return $this->extras['shirt_number'] ?? null;
    }

    public function getEventNameAttribute()
    {
        return $this->extras['event_name'] ?? null;
    }

    public function getTypeAttribute()
    {
        return $this->extras['type'] ?? null;
    }

    public function getHasSessionAttribute()
    {
        return $this->extras['has_session'] ?? false;
    }

    // ==================== WhatsApp Status Methods ====================

    public function getMessageStatusAttribute()
    {
        return $this->getWhatsappDeliveryStatus();
    }

    public function getWhatsappDeliveryStatus()
    {
        $latestLog = $this->latestTwilioLog;

        if (!$latestLog) {
            return 'not_sent';
        }

        return $latestLog->status;
    }

    public function hasSuccessfulWhatsappDelivery()
    {
        return $this->twilioLogs()
            ->whereIn('status', ['delivered', 'sent'])
            ->exists();
    }

    public function getFailedWhatsappAttempts()
    {
        return $this->twilioLogs()
            ->whereIn('status', ['failed', 'undelivered', 'rejected'])
            ->count();
    }

    // ==================== Helper Methods ====================

    /**
     * Generate a unique code.
     *
     * @return string
     */
    private static function generateUniqueCode(): string
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $codeLength = 6;

        do {
            $code = '';
            for ($i = 0; $i < $codeLength; $i++) {
                $code .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (static::where('unique_code', $code)->exists());

        return $code;
    }

    // ==================== Relationships ====================

    public function seat()
    {
        return $this->hasOne(Seat::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function twilioLogs()
    {
        return $this->hasMany(TwilioLog::class);
    }

    public function latestTwilioLog()
    {
        return $this->hasOne(TwilioLog::class)->latestOfMany();
    }

    // ==================== Query Scopes ====================

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeAttended($query)
    {
        return $query->where('has_attended', true);
    }

    public function scopePending($query)
    {
        return $query->where('is_approved', false);
    }
}
