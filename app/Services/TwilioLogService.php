<?php

namespace App\Services;

use App\Models\Registration;
use App\Models\TwilioLog;
use Exception;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Api\V2010\Account\MessageInstance;

class TwilioLogService
{
    public function logSuccessfulMessage(MessageInstance $messageInstance, Registration $registration): void
    {
        TwilioLog::create([
            'message_sid' => $messageInstance->sid,
            'account_sid' => $messageInstance->accountSid,
            'registration_id' => $registration->id,
            'to_number' => $messageInstance->to,
            'from_number' => $messageInstance->from,
            'direction' => $messageInstance->direction,
            'status' => $messageInstance->status,
            'price' => $messageInstance->price,
            'price_unit' => $messageInstance->priceUnit,
            'twilio_date_created' => $messageInstance->dateCreated,
            'twilio_date_sent' => $messageInstance->dateSent,
            'twilio_date_updated' => $messageInstance->dateUpdated,
            'twilio_response' => $this->buildTwilioResponse($messageInstance),
        ]);

        Log::info('Twilio message sent successfully', [
            'message_sid' => $messageInstance->sid,
            'to' => $messageInstance->to,
            'status' => $messageInstance->status,
            'registration_id' => $registration->id,
        ]);
    }

    public function logFailedMessage(Exception $e, string $recipientNumber, Registration $registration): void
    {
        TwilioLog::create([
            'registration_id' => $registration->id,
            'to_number' => $recipientNumber,
            'from_number' => config('twilio.twilio_from'),
            'status' => 'failed',
            'error_message' => $e->getMessage(),
            'error_code' => $e->getCode(),
        ]);

        Log::error('Twilio message failed', [
            'error' => $e->getMessage(),
            'error_code' => $e->getCode(),
            'to' => $recipientNumber,
            'registration_id' => $registration->id,
        ]);
    }

    private function buildTwilioResponse(MessageInstance $messageInstance): array
    {
        return [
            'sid' => $messageInstance->sid,
            'account_sid' => $messageInstance->accountSid,
            'messaging_service_sid' => $messageInstance->messagingServiceSid,
            'body' => $messageInstance->body,
            'status' => $messageInstance->status,
            'direction' => $messageInstance->direction,
            'api_version' => $messageInstance->apiVersion,
            'price' => $messageInstance->price,
            'price_unit' => $messageInstance->priceUnit,
            'uri' => $messageInstance->uri,
            'num_segments' => $messageInstance->numSegments,
            'num_media' => $messageInstance->numMedia,
            'date_created' => $messageInstance->dateCreated?->format('Y-m-d H:i:s'),
            'date_sent' => $messageInstance->dateSent?->format('Y-m-d H:i:s'),
            'date_updated' => $messageInstance->dateUpdated?->format('Y-m-d H:i:s'),
        ];
    }
}
