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
            'redirectTo' => route('seminar.show_form'),
            'title' => 'Registrasi Seminar IKA ISMEI',
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
                'people_pic' => asset('images/FOTO-ORANG_compressed.png'),
            ],
        ]);
    }

    public function showForm(RegistrationSettings $registrationSettings)
    {
        $event = Event::where('name', 'Seminar IKA ISMEI')->first();

        $registrations = Registration::where('event_id', $event->id)->get();
        $sessionCounts = $registrations->groupBy('extras.session')
            ->map->count()
            ->toArray();

        $sessions = [
            [
                'value' => 1,
                'label' => "Sesi 1",
                'limit' => $registrationSettings->session_1_limit,
                'registered' => $sessionCounts[1] ?? 0,
            ],
            [
                'value' => 2,
                'label' => "Sesi 2",
                'limit' => $registrationSettings->session_2_limit,
                'registered' => $sessionCounts[2] ?? 0,
            ],
            [
                'value' => 3,
                'label' => "Sesi 3",
                'limit' => $registrationSettings->session_3_limit,
                'registered' => $sessionCounts[3] ?? 0,
            ],
        ];

        foreach ($sessions as &$s) {
            $remaining = $s['limit'] - $s['registered'];
            $s['remaining'] = max($remaining, 0);
            $s['disabled'] = $remaining <= 0;
            $s['label'] = "{$s['label']} ({$s['remaining']} kursi tersisa)";
        }

        return Inertia::render('Registration/Seminar', [
            'sessions' => $sessions,
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
            'session' => ['required', 'numeric'],
        ]);

        $registration =  Registration::create(array_merge($validated, [
            'is_approved' => true,
            'approved_at' => now(),
            'event_id' => Event::where('name', 'Seminar IKA ISMEI')->first()->id,
            'extras' => [
                'event_name' => EventName::SEMINAR->value,
                'type' => 'regular',
                'has_session' => true,
                'session' => $validated['session'],
                'organization' => $validated['organization'],
            ],
        ]));

        GenerateQr::dispatchSync($registration);
        Bus::chain([
            new SendQrToEmail($registration),
            // new SendQrToWhatsapp($registration),
        ])->dispatch();

        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' =>  'Berhasil mendaftar pada Seminar IKA ISMEI',
        ]);
    }
}
