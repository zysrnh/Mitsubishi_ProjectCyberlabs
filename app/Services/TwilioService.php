<?php

namespace App\Services;

use App\Enums\EventName;
use App\Exceptions\TwilioConfigurationException;
use App\Exceptions\TwilioMessageException;
use App\Models\Registration;
use Exception;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Api\V2010\Account\MessageInstance;
use Twilio\Rest\Client;

class TwilioService
{
    private Client $twilioClient;
    private string $fromNumber;
    private TwilioLogService $logService;

    public function __construct(?TwilioLogService $logService = null)
    {
        $this->validateConfiguration();
        $this->initializeTwilioClient();
        $this->logService = $logService ?? new TwilioLogService();
    }

    /**
     * Send WhatsApp message with image using content template
     */
    public function sendMessageWithImage(
        string $recipientNumber,
        string $filename,
        Registration $registration,
        ?bool $isVip = false,
        ?string $contentSid = null,
        ?string $messagingServiceSid = null,
    ): MessageInstance {
        $contentSid = $contentSid ?? config('twilio.default_content_sid');
        $messagingServiceSid = $messagingServiceSid ?? config('twilio.messaging_service_sid');

        try {
            $eventName = match ($registration->extras['event_name']) {
                EventName::EXHIBITION->value => 'Pameran',
                EventName::OPENING_CEREMONY->value => 'Opening Ceremony',
                EventName::PRESS_CONFERENCE->value => 'Press Conference',
                default => '-',
            };
            $contentVariables = [];
            if ($isVip) {
                $contentVariables = $this->buildVipContentVariables($filename, $eventName, $registration->seat->label ?? '-');
            } else {
                $contentVariables = $this->buildContentVariables($filename, $eventName);
            }

            $messageInstance = $this->sendMessage($recipientNumber, [
                'contentSid' => $contentSid,
                'contentVariables' => $contentVariables,
                'messagingServiceSid' => $messagingServiceSid,
            ]);

            $this->logService->logSuccessfulMessage($messageInstance, $registration);
            $this->incrementSendAttempts($registration);

            return $messageInstance;
        } catch (Exception $e) {
            $this->logService->logFailedMessage($e, $recipientNumber, $registration);
            throw new TwilioMessageException("Failed to send WhatsApp message: " . $e->getMessage(), $e->getCode(), $e);
        }
    }

    private function validateConfiguration(): void
    {
        $requiredConfigs = [
            'twilio.twilio_sid' => 'Twilio SID',
            'twilio.twilio_token' => 'Twilio Token',
            'twilio.twilio_from' => 'Twilio From Number',
            'twilio.default_content_sid' => 'Twilio Content Template Builder SID',
            'twilio.messaging_service_sid' => 'Twilio Messaging Service SID',
        ];

        foreach ($requiredConfigs as $configKey => $description) {
            if (empty(config($configKey))) {
                throw new TwilioConfigurationException("{$description} is required but not configured.");
            }
        }
    }

    private function initializeTwilioClient(): void
    {
        $sid = config('twilio.twilio_sid');
        $token = config('twilio.twilio_token');
        $this->fromNumber = config('twilio.twilio_from');

        $this->twilioClient = new Client($sid, $token);
    }

    private function sendMessage(string $recipientNumber, array $messageData): MessageInstance
    {
        $messageData['from'] = "whatsapp:{$this->fromNumber}";

        return $this->twilioClient->messages->create(
            "whatsapp:{$recipientNumber}",
            $messageData
        );
    }

    private function buildContentVariables(string $filename, string $eventName): string
    {
        return json_encode([
            '1' => $filename,
            '2' => $eventName,
        ]);
    }

    private function buildVipContentVariables(string $filename, string $eventName, string $seat): string
    {
        return json_encode([
            '1' => $filename,
            '2' => $eventName,
            '3' => $seat,
        ]);
    }

    private function incrementSendAttempts(Registration $registration): void
    {
        $registration->increment('whatsapp_send_attempts');
    }
}
