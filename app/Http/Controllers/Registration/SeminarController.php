<?php

namespace App\Http\Controllers\Registration;

use App\Enums\EventName;
use App\Http\Controllers\Controller;
use App\Jobs\GenerateQr;
use App\Jobs\SendQrToEmail;
use App\Jobs\SendQrToWhatsapp;
use App\Models\Event;
use App\Models\Registration;
use App\Settings\RegistrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class SeminarController extends Controller
{
    public function showWelcome()
    {
        return Inertia::render('RegistrationWelcome', [
            'redirectTo' => route('umum.show_form'),
            'title' => 'Registrasi Umum ',
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
                'people_pic' => asset('images/FOTO-ORANG_compressed.png'),
            ],
        ]);
    }

    public function showForm(RegistrationSettings $registrationSettings)
    {
        // Seminar untuk umum, tidak perlu session logic lagi
        return Inertia::render('Registration/Seminar', [
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
            ],
        ]);
    }

    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'phone' => ['required', 'regex:/^(\+?62|0)\d{8,}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'organization' => ['required', 'max:255'],
        ]);

        $registration = Registration::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'is_approved' => true,
            'approved_at' => now(),
            'extras' => [
                'type' => 'umum',
                'has_session' => false,
                'organization' => $validated['organization'],
            ],
        ]);

        GenerateQr::dispatchSync($registration);

        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' => 'Berhasil mendaftar. QR code akan dikirim melalui WhatsApp.',
        ]);
    }
}