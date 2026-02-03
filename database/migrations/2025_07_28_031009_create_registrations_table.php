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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            
            // Basic Info
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone');
            
            // QR Code
            $table->string('unique_code')->unique();
            $table->string('qr_path')->nullable();
            
            // Status
            $table->boolean('has_attended')->default(false);
            $table->timestamp('attended_at')->nullable();
            
            // WhatsApp Tracking
            $table->timestamp('last_blasted_at')->nullable();
            $table->integer('whatsapp_send_attempts')->default(0);
            
            // Mitsubishi Specific Data (JSON)
            // {
            //   "vehicle": "xpander",
            //   "dealer_branch": "Jakarta Pusat", 
            //   "assistant_sales": "Budi",
            //   "dealer": "PT Krama Yudha"
            // }
            $table->json('extras')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('unique_code');
            $table->index('phone');
            $table->index('has_attended');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};