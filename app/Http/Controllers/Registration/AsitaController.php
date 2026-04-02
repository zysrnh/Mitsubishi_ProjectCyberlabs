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
            'company_name'   => ['required', 'string', 'max:255'],
            'name'           => ['required', 'string', 'max:255'],
            'position'       => ['required', 'string', 'max:255'],
            'nia'            => ['required', 'string', 'max:255'],
            'company_address'=> ['required', 'string'],
            'company_phone'  => ['required', 'string', 'max:255'],
            'phone'          => ['required', 'string', 'regex:/^(\+?62|0)\d{8,}$/'],
            'email'          => ['nullable', 'email', 'max:255'], // Keep as optional
            'website'        => ['nullable', 'string', 'max:255'],
            'social_media'   => ['nullable', 'string', 'max:255'],
            'commission_type'=> ['required', 'in:A,B'],
        ], [
            'phone.regex' => 'Format nomor WhatsApp tidak valid',
            'commission_type.in' => 'Pilih Tipe Komisi A atau B',
        ]);

        // Normalize phone number (WA)
        $waPhone = $validated['phone'];
        if (strpos($waPhone, '0') === 0) {
            $waPhone = '+62' . substr($waPhone, 1);
        } elseif (strpos($waPhone, '62') === 0) {
            $waPhone = '+' . $waPhone;
        } elseif (strpos($waPhone, '+62') !== 0) {
            $waPhone = '+62' . $waPhone;
        }

        // Create registration
        $registration = Registration::create([
            'company_name'    => $validated['company_name'],
            'nia'             => $validated['nia'],
            'company_address' => $validated['company_address'],
            'company_phone'   => $validated['company_phone'],
            'name'            => $validated['name'],
            'position'        => $validated['position'],
            'phone'           => $waPhone,
            'email'           => $validated['email'] ?? null,
            'website'         => $validated['website'] ?? null,
            'social_media'    => $validated['social_media'] ?? null,
            'commission_type' => $validated['commission_type'],
            'extras'          => [
                'event_name' => 'RAKERDA 1 ASITA JABAR',
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
