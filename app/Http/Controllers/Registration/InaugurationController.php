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

class InaugurationController extends Controller
{
    public function showWelcome(RegistrationSettings $registrationSettings)
    {
        return Inertia::render('RegistrationWelcome', [
            'redirectTo' => route('pelantikan.show_form'),
            'title' => 'Registrasi Pelantikan IKA ISMEI',
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
                'people_pic' => asset('images/FOTO-ORANG_compressed.png'),
            ],
        ]);
    }

    public function showForm()
    {
        return Inertia::render('Registration/Inauguration', [
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
            ],
        ]);
    }

    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'phone' => ['required'],
            'email' => ['required', 'email', 'max:255'],
            'organization' => ['required', 'max:255'],
        ]);

        $registration =  Registration::create(array_merge($validated, [
            'is_approved' => true,
            'approved_at' => now(),
            'event_id' => Event::where('name', 'Pelantikan IKA ISMEI')->first()->id,
            'extras' => [
                'event_name' => EventName::INAUGURATION->value,
                'type' => 'regular',
                'has_session' => false,
                'organization' => $validated['organization'],
            ],
        ]));

        GenerateQr::dispatchSync($registration);
        Bus::chain([
            new SendQrToEmail($registration),
            new SendQrToWhatsapp($registration),
        ])->dispatch();

        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' =>  'Berhasil mendaftar pada Pelantikan IKA ISMEI',
        ]);
    }
}
