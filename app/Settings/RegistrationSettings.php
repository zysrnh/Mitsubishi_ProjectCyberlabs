<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class RegistrationSettings extends Settings
{
    public int $session_1_limit;
    public int $session_2_limit;
    public int $session_3_limit;

    public static function group(): string
    {
        return 'registration';
    }
}