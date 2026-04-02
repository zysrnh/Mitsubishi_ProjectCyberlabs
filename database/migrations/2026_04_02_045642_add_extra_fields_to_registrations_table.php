<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->text('company_address')->nullable()->after('nia');
            $table->string('company_phone')->nullable()->after('company_address');
            $table->string('website')->nullable()->after('email');
            $table->string('social_media')->nullable()->after('website');
            $table->string('commission_type')->nullable()->after('social_media'); // A or B
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropColumn(['company_address', 'company_phone', 'website', 'social_media', 'commission_type']);
        });
    }
};
