<?php

namespace App\Services;

class MessagingService
{
    /**
     * Converts a given phone number to an international format.
     *
     * Standardizes Indonesian phone numbers by ensuring the `+62` country code is used,
     * and adds a `+` prefix to other international numbers if missing.
     *
     * @param string $phoneNumber The input phone number.
     * @return string The phone number in international format.
     */
    static public function parseTelToInternational($phoneNumber)
    {
        // Already in international format
        if (preg_match('/^\+\d+$/', $phoneNumber)) {
            return $phoneNumber;
        }

        if (str_starts_with($phoneNumber, '08')) {
            return '+62' . substr($phoneNumber, 1);
        }

        if (str_starts_with($phoneNumber, '8')) {
            return '+62' . $phoneNumber;
        }

        // Assume international number without "+" prefix
        return '+' . $phoneNumber;
    }
}
