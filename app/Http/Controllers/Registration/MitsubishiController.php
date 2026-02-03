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

class MitsubishiController extends Controller
{
    /**
     * Show landing page dengan tombol TEST DRIVE
     */
    public function showLanding()
    {
        return Inertia::render('Registration/MitsubishiLanding', [
            'redirectTo' => route('mitsubishi.vehicles'),
        ]);
    }

    /**
     * Show vehicle selection page
     */
    public function showVehicleSelection()
    {
        return Inertia::render('Registration/VehicleSelection', [
            'vehicles' => [
                [
                    'id' => 'destinator',
                    'name' => 'DESTINATOR',
                    'image' => '/images/vehicles/destinator.png'
                ],
                [
                    'id' => 'xpander',
                    'name' => 'XPANDER',
                    'image' => '/images/vehicles/xpander.png'
                ],
                [
                    'id' => 'xforce',
                    'name' => 'XFORCE',
                    'image' => '/images/vehicles/xforce.png'
                ],
                [
                    'id' => 'pajero_sport',
                    'name' => 'NEW PAJERO SPORT',
                    'image' => '/images/vehicles/pajero.png'
                ]
            ]
        ]);
    }

    /**
     * Show registration form dengan kendaraan yang dipilih
     */
    public function showForm(Request $request)
    {
        $vehicle = $request->query('vehicle');
        
        // Redirect ke vehicle selection jika tidak ada mobil yang dipilih
        if (!$vehicle) {
            return redirect()->route('mitsubishi.vehicles');
        }

        $vehicleNames = [
            'destinator' => 'Destinator',
            'xpander' => 'Xpander',
            'xforce' => 'Xforce',
            'pajero_sport' => 'New Pajero Sport',
        ];

        return Inertia::render('Registration/MitsubishiRegistration', [
            'selectedVehicle' => [
                'id' => $vehicle,
                'name' => $vehicleNames[$vehicle] ?? 'Unknown Vehicle',
            ],
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
            'vehicle' => ['required', 'string', 'in:destinator,xpander,xforce,pajero_sport'],
            'agree_terms' => ['accepted'],
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
            'name' => $validated['name'],
            'phone' => $phone,
            'email' => $validated['email'],
            'extras' => [
                'vehicle' => $validated['vehicle'],
                'dealer_branch' => $validated['dealer_branch'],
                'assistant_sales' => $validated['assistant_sales'] ?? null,
                'dealer' => $validated['dealer'] ?? null,
                'event_name' => 'Indonesia International Motor Show',
            ],
        ]);

        // Generate QR Code
        GenerateQr::dispatchSync($registration);

        // Update qr_path di database (sesuaikan dengan logic GenerateQr job lu)
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