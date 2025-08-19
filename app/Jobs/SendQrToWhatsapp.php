<?php

namespace App\Jobs;

use App\Models\Registration;
use App\Services\MessagingService;
use App\Services\TwilioService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendQrToWhatsapp implements ShouldQueue
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
        $messagingService = app(MessagingService::class);
        $recipientNumber = $messagingService->parseTelToInternational($this->registration->phone);

        $isVip = $this->registration->extras['is_vip'] ?? false;
        if ($isVip) {
            $vipTemplateSid = 'HXe22b839928d408983a975d7f03f58016';

            app(TwilioService::class)->sendMessageWithImage(
                $recipientNumber,
                $this->registration->qr_full_path,
                $this->registration,
                $isVip,
                $vipTemplateSid
            );
        } else {
            app(TwilioService::class)->sendMessageWithImage(
                $recipientNumber,
                $this->registration->qr_full_path,
                $this->registration,
            );
        }
    }
}
