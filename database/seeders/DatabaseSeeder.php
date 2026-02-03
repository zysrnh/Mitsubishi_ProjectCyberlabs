<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles & permissions dulu
        $this->call([
            RoleSeeder::class,
            EventSeeder::class,
        ]);

        // Create Super Admin
        $admin = User::firstOrCreate(
            ['email' => 'super-admin@alcomedia.id'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('4Lc0@dm1nistrat0r0917'),
            ]
        );
        $admin->assignRole('super_admin');
        
        // Create Web Admin
        $webAdmin = User::firstOrCreate(
            ['email' => 'web-admin@alcomedia.id'],
            [
                'name' => 'Web Admin',
                'password' => bcrypt('40wLCpD9dc'),
            ]
        );
        $webAdmin->assignRole('web_admin');

        // Create Editor Admin
        $editorAdmin = User::firstOrCreate(
            ['email' => 'editor-admin@alcomedia.id'],
            [
                'name' => 'Editor Admin',
                'password' => bcrypt('9Ey6N4Axms'),
            ]
        );
        $editorAdmin->assignRole('admin_editor');
        
        $this->command->info('✅ Users seeded successfully!');
        $this->command->info('📧 Super Admin: super-admin@alcomedia.id');
        $this->command->info('📧 Web Admin: web-admin@alcomedia.id');
        $this->command->info('📧 Editor Admin: editor-admin@alcomedia.id');
    }
}