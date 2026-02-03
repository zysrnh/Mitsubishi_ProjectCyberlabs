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

class VipController extends Controller
{
    public function showWelcome()
    {
        return Inertia::render('VipConfirmationWelcome', [
            'redirectTo' => route('vip.show_confirmation'),
            'title' => 'Konfirmasi Kehadiran VIP & VVIP',
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
                'people_pic' => asset('images/FOTO-ORANG_compressed.png'),
            ],
        ]);
    }

    public function showConfirmation()
    {
        return Inertia::render('Registration/VipConfirmation', [
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
            ],
        ]);
    }

    public function submitConfirmation(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'phone' => ['required', 'regex:/^(\+?62|0)\d{8,}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'institution' => ['required', 'max:255'],
        ]);

        $registration = Registration::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'is_approved' => true,
            'approved_at' => now(),
            'extras' => [
                'type' => 'vip',
                'has_session' => false,
                'institution' => $validated['institution'],
            ],
        ]);

        // Generate QR Code
        GenerateQr::dispatchSync($registration);

        // Kirim QR ke WhatsApp
        Bus::chain([
            new SendQrToWhatsapp($registration),
        ])->dispatch();

        // Update timestamp pengiriman WhatsApp
        $registration->update([
            'last_blasted_at' => now(),
        ]);

        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' => 'Konfirmasi kehadiran berhasil. QR code akan dikirim melalui WhatsApp.',
        ]);
    }
}