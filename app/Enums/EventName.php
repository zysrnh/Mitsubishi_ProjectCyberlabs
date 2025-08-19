<?php

namespace App\Enums;

enum EventName: string
{
    case PRESS_CONFERENCE = 'press_conference';
    case OPENING_CEREMONY = 'opening_ceremony';
    case EXHIBITION = 'exhibition';

    public function title(): string
    {
        return match($this) {
            self::PRESS_CONFERENCE => 'Press Conference',
            self::OPENING_CEREMONY => 'Opening Ceremony',
            self::EXHIBITION => 'Exhibition',
        };
    }

    public static function fromValue(string $value): ?self
    {
        foreach (self::cases() as $case) {
            if ($case->value === $value) {
                return $case;
            }
        }
        return null; // returns null if no match
    }
}