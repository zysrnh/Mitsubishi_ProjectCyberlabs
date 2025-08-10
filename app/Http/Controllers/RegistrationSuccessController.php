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
            'qr_full_path' => $registration->qr_path,
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }
}
