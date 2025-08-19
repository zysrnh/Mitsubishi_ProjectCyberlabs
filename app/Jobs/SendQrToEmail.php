<?php

namespace App\Jobs;

use App\Mail\QrConfirmationMail;
use App\Models\Registration;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendQrToEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Registration $registration) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $recipientEmail = $this->registration->email;

        Mail::to($recipientEmail)->send(new QrConfirmationMail($this->registration));
    }
}
