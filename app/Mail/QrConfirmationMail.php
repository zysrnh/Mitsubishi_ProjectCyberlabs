<?php

namespace App\Mail;

use App\Enums\EventName;
use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QrConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Registration $registration) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'QR Konfirmasi Registrasi',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.qr-confirmation-mail',
            with: [
                'registration' => $this->registration,
                'event_name' => match ($this->registration->extras['event_name']) {
                    EventName::EXHIBITION->value => 'Pameran',
                    EventName::OPENING_CEREMONY->value => 'Opening Ceremony',
                    EventName::PRESS_CONFERENCE->value => 'Press Conference',
                    default => '-',
                }
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromStorageDisk('public', $this->registration->qrDiskPath),
        ];
    }
}
