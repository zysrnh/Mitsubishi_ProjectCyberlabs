<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'start_date',
        'end_date',
        'location',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Event $event) {
            if (empty($event->slug)) {
                $event->slug = str($event->name)->slug();
            }
        });
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    // Scope untuk event yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk event yang sedang berlangsung
    public function scopeOngoing($query)
    {
        return $query->where('start_date', '<=', now())
            ->where('end_date', '>=', now());
    }
}