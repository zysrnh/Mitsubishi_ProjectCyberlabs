<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ==================== PERMISSIONS ====================
        $permissions = [
            // Registration permissions
            'view_any_registration',
            'view_registration',
            'create_registration',
            'update_registration',
            'delete_registration',
            'restore_registration',
            'force_delete_registration',
            
            // Additional permissions
            'approve_registration',
            'resend_qr',
            'export_registration',
            'view_qr_code',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ==================== ROLES ====================
        
        // Super Admin - Full Access
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Web Admin - Full Registration Access
        $webAdmin = Role::firstOrCreate(['name' => 'web_admin']);
        $webAdmin->givePermissionTo([
            'view_any_registration',
            'view_registration',
            'create_registration',
            'update_registration',
            'delete_registration',
            'approve_registration',
            'resend_qr',
            'export_registration',
            'view_qr_code',
        ]);

        // Admin Editor - Limited Access
        $adminEditor = Role::firstOrCreate(['name' => 'admin_editor']);
        $adminEditor->givePermissionTo([
            'view_any_registration',
            'view_registration',
            'update_registration',
            'view_qr_code',
        ]);
    }
}