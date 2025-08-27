<?php

namespace App\Enums;

enum EventName: string
{
    case INAUGURATION = 'inauguration';
    case SEMINAR = 'seminar';

    public function title(): string
    {
        return match($this) {
            self::INAUGURATION => 'Pelantikan',
            self::SEMINAR => 'Seminar',
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