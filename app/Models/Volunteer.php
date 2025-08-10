<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Volunteer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'job_title',
        'organization',
        'cv',
        'event_id',
        'unique_code',
    ];

    protected $appends = [
        'cv_full_path',
    ];

    protected static function booted(): void
    {
        static::creating(function (Volunteer $volunteer) {
            if (empty($volunteer->unique_code)) {
                $volunteer->unique_code = static::generateUniqueCode();
            }
        });
    }

    protected function cvFullPath(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->cv ? asset('storage/' . $this->cv) : null
        );
    }

    public function scopeWithoutEvent($query)
    {
        return $query->whereNull('event_id');
    }

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

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
