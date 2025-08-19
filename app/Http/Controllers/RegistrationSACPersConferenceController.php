<?php

namespace App\Http\Controllers;

use App\Enums\EventName;
use App\Jobs\GenerateQr;
use App\Models\Event;
use App\Models\Registration;
use App\Settings\RegistrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

// Press Conference
class RegistrationSACPersConferenceController extends Controller
{
    public function showWelcome(RegistrationSettings $registrationSettings)
    {
        $count = Registration::where('extras->type', 'pers')
            ->where('extras->event_name', EventName::PRESS_CONFERENCE->value)
            ->count();
            
        if ($registrationSettings->pers_limit >= 0 && $count >= $registrationSettings->pers_limit) {
            return redirect()->route('full_registration');
        }

        return Inertia::render('RegistrationWelcome', [
            'redirectTo' => route('sac_pers.press.registration'),
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function showForm()
    {
        return Inertia::render('RegistrationSACPersConference', [
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'phone' => ['required'],
            'email' => ['required', 'email', 'max:255'],
            'job_title' => ['required', 'max:255'],
            'organization' => ['required', 'max:255'],
        ]);

        $registration =  Registration::create(array_merge($validated, [
            'is_approved' => false,
            'event_id' => Event::where('name', 'SBY Art Community')->first()->id,
            'extras' => [
                'event_name' => EventName::PRESS_CONFERENCE->value,
                'type' => 'pers',
                'is_vip' => false,
                'is_pers' => true,
                'job_title' => $validated['job_title'],
                'organization' => $validated['organization'],
            ]
        ]));

        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),      
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' =>  'Berhasil mendaftar untuk pers conference',
        ]);
    }
}
