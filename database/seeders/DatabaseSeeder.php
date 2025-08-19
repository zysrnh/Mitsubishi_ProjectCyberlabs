<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            EventSeeder::class,
        ]);

        $admin = User::firstOrCreate(
            ['email' => 'super-admin@alcomedia.id'],
            [
                'name' => 'Super Admin',
                'password' => '4Lc0@dm1nistrat0r0917',
            ]
        );
        $admin->assignRole('super_admin');
    }
}
