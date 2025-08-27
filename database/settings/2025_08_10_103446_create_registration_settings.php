<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('registration.session_1_limit', 200);
        $this->migrator->add('registration.session_2_limit', 200);
        $this->migrator->add('registration.session_3_limit', 200);
    }
};
