<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TwilioLog extends Model
{
    protected $fillable = [
        'message_sid',
        'account_sid',
        'registration_id',
        'to_number',
        'from_number',
        'direction',
        'status',
        'error_message',
        'error_code',
        'twilio_response',
        'webhook_data',
        'price',
        'price_unit',
        'twilio_date_created',
        'twilio_date_sent',
        'twilio_date_updated',
    ];

    protected $casts = [
        'twilio_response' => 'array',
        'webhook_data' => 'array',
        'price' => 'decimal:4',
        'twilio_date_created' => 'datetime',
        'twilio_date_sent' => 'datetime',
        'twilio_date_updated' => 'datetime',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    public function isSuccessful(): bool
    {
        return in_array($this->status, ['delivered', 'sent']);
    }

    public function isFailed(): bool
    {
        return in_array($this->status, ['failed', 'undelivered', 'rejected']);
    }

    public function isPending(): bool
    {
        return in_array($this->status, ['accepted', 'queued', 'sending']);
    }

    public function getStatusLabel(): string
    {
        $status = $this->status;

        if (!$status) {
            return 'Unknown Status';
        }

        return match ($status) {
            'accepted' => 'Accepted by Twilio',
            'queued' => 'Queued for sending',
            'sending' => 'Currently sending',
            'sent' => 'Sent to WhatsApp',
            'delivered' => 'Delivered to recipient',
            'undelivered' => 'Failed to deliver',
            'failed' => 'Send failed',
            'rejected' => 'Rejected by Twilio',
            default => ucfirst($status)
        };
    }
}
