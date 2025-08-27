<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationSuccessController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Registration $registration)
    {
        return Inertia::render('RegistrationSuccess', [
            'is_approved' => $registration->is_approved,
            'qr_full_path' => $registration->qr_path ?? '',
            'images' => [
                'logo_ikaismei' => asset('images/logo-ika-ismei_compressed.png'),
            ],
        ]);
    }
}
