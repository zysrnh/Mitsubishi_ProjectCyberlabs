<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateQrFromCode;
use App\Models\Event;
use App\Models\Volunteer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Inertia\Inertia;

class VolunteerController extends Controller
{
    public function showWelcome()
    {
        return Inertia::render('RegistrationWelcome', [
            'redirectTo' => route('volunteer.registration'),
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function showVolunteerRegistration()
    {
        return Inertia::render('VolunteerRegistration', [
            'events' => Event::latest()->get(),
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function submitVolunteer(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required'],
            'event' => ['required', 'exists:events,id'],
            'job_title' => ['required'],
            'organization' => ['required'],
            'cv' => ['required'],
        ], [
            'phone' => 'Pastikan nomor terdiri hanya dari angka dan berawalan "+62" atau "0"'
        ]);

        $validated['cv'] = $request->file('cv')->store('cv_volunteers', 'public');
        $validated['event_id'] = $request->event;
        $volunteer = Volunteer::create($validated);
        
        Bus::chain([
            new GenerateQrFromCode($volunteer->unique_code),
            // new SendQrToWhatsapp($volunteer),
        ])->dispatch();

        return redirect()->route('volunteer.registration')->with('info', [
            'success' => 'Berhasil mendaftar sebagai volunteer pada acara ' . $volunteer->event->name,
        ]);
    }
}
