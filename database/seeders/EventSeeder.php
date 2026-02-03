<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create Mitsubishi IIMS Event
        Event::firstOrCreate(
            ['slug' => 'indonesia-international-motor-show'],
            [
                'name' => 'Indonesia International Motor Show',
            ]
        );
    }
}