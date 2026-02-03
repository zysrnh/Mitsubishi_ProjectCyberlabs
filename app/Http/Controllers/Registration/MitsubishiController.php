<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use App\Jobs\GenerateQr;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class MitsubishiController extends Controller
{
    /**
     * Show landing page
     */
    public function showLanding()
    {
        return Inertia::render('Registration/MitsubishiLanding', [
            'redirectTo' => route('mitsubishi.show_form'),
        ]);
    }

    /**
     * Show vehicle selection page
     */
    public function showVehicleSelection()
    {
        return Inertia::render('Registration/VehicleSelection');
    }

    /**
     * Show registration form
     */
    public function showForm(Request $request)
    {
        $vehicle = $request->query('vehicle', null);
        
        return Inertia::render('Registration/MitsubishiRegistration', [
            'selectedVehicle' => $vehicle,
        ]);
    }

    /**
     * Submit registration form
     */
    public function submitForm(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'regex:/^(\+?62|0)\d{8,}$/'],
            'email' => ['required', 'email', 'max:255'],
            'assistant_sales' => ['nullable', 'string', 'max:255'],
            'dealer' => ['nullable', 'string', 'max:255'],
            'dealer_branch' => ['required', 'string', 'max:255'],
            'vehicle' => ['nullable', 'string', 'max:100'],
            'agree_terms' => ['accepted'],
        ]);

        // Create registration
        $registration = Registration::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'is_approved' => true,
            'approved_at' => now(),
            'extras' => [
                'type' => 'mitsubishi_iims',
                'event_name' => 'Indonesia International Motor Show',
                'has_session' => false,
                'assistant_sales' => $validated['assistant_sales'] ?? null,
                'dealer' => $validated['dealer'] ?? null,
                'dealer_branch' => $validated['dealer_branch'],
                'vehicle' => $validated['vehicle'] ?? null,
            ],
        ]);

        // Generate QR code
        GenerateQr::dispatchSync($registration);

        // Create signed URL for success page
        $signedUrl = URL::temporarySignedRoute(
            'registration_success',
            now()->addHour(),
            ['registration' => $registration->id]
        );

        return redirect($signedUrl)->with('info', [
            'success' => 'Registration successful! Your QR code will be sent via WhatsApp.',
        ]);
    }
}