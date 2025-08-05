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
    ];

    protected $appends = [
        'cv_full_path',
    ];

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

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
