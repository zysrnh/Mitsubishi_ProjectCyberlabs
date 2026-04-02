<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateQr;
use App\Jobs\SendQrToWhatsapp;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AsitaController extends Controller
{
    /**
     * Show registration form
     */
    public function showForm()
    {
        return Inertia::render('Registration/AsitaRegistration');
    }

    /**
     * Submit registration form
     */
    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'nia' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^(\+?62|0)\d{8,}$/'],
            'email' => ['required', 'email', 'max:255'],
        ], [
            'phone.regex' => 'Format nomor WhatsApp tidak valid',
        ]);

        // Normalize phone number
        $phone = $validated['phone'];
        if (strpos($phone, '0') === 0) {
            $phone = '+62' . substr($phone, 1);
        } elseif (strpos($phone, '62') === 0) {
            $phone = '+' . $phone;
        } elseif (strpos($phone, '+62') !== 0) {
            $phone = '+62' . $phone;
        }

        // Create registration
        $registration = Registration::create([
            'company_name' => $validated['company_name'],
            'nia'          => $validated['nia'],
            'name'         => $validated['name'],
            'position'     => $validated['position'],
            'phone'        => $phone,
            'email'        => $validated['email'],
            'extras'       => [
                'event_name' => 'ASITA Meeting',
                'registered_at' => now()->toDateTimeString(),
            ],
        ]);

        // Generate QR Code
        GenerateQr::dispatchSync($registration);

        // Update qr_path
        $registration->update([
            'qr_path' => 'qr_codes/' . $registration->unique_code . '.png',
        ]);

        // Kirim QR via WhatsApp (async)
        Bus::chain([
            new SendQrToWhatsapp($registration),
        ])->dispatch();

        $registration->recordWhatsappSent();

        // Create signed URL untuk success page
        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHours(24),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl);
    }
}
