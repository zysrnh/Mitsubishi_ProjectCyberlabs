<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Registration extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'unique_code',
        'qr_path',
        'has_attended',
        'attended_at',
        'last_blasted_at',
        'whatsapp_send_attempts',
        'extras',
    ];

    protected $casts = [
        'extras' => 'array',
        'has_attended' => 'boolean',
        'attended_at' => 'datetime',
        'last_blasted_at' => 'datetime',
    ];

    protected $appends = [
        'qr_url',
    ];

    // ==================== AUTO GENERATE UNIQUE CODE ====================
    protected static function booted(): void
    {
        static::creating(function (Registration $registration) {
            if (empty($registration->unique_code)) {
                $registration->unique_code = static::generateUniqueCode();
            }
        });
    }

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

    // ==================== QR CODE ATTRIBUTES ====================
    protected function qrUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->qr_path 
                ? asset('storage/' . $this->qr_path)
                : null
        );
    }

    // ✅ TAMBAHAN BARU - QR Full Path untuk WhatsApp
    protected function qrFullPath(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->qr_path 
                ? Storage::disk('public')->path($this->qr_path)
                : null
        );
    }

    // ==================== MITSUBISHI DATA ACCESSORS ====================
    public function getVehicleAttribute()
    {
        return $this->extras['vehicle'] ?? null;
    }

    public function getDealerBranchAttribute()
    {
        return $this->extras['dealer_branch'] ?? null;
    }

    public function getAssistantSalesAttribute()
    {
        return $this->extras['assistant_sales'] ?? null;
    }

    public function getDealerAttribute()
    {
        return $this->extras['dealer'] ?? null;
    }

    // ==================== HELPER METHODS ====================
    public function markAsAttended(): void
    {
        $this->update([
            'has_attended' => true,
            'attended_at' => now(),
        ]);
    }

    public function recordWhatsappSent(): void
    {
        $this->update([
            'last_blasted_at' => now(),
            'whatsapp_send_attempts' => $this->whatsapp_send_attempts + 1,
        ]);
    }

    // ==================== QUERY SCOPES ====================
    public function scopeAttended($query)
    {
        return $query->where('has_attended', true);
    }

    public function scopeNotAttended($query)
    {
        return $query->where('has_attended', false);
    }

    public function scopeByVehicle($query, string $vehicle)
    {
        return $query->whereJsonContains('extras->vehicle', $vehicle);
    }

    public function scopeByDealerBranch($query, string $branch)
    {
        return $query->whereJsonContains('extras->dealer_branch', $branch);
    }
}