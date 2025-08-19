<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ComingSoonController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Placeholder/ComingSoon', [
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
                'alco_white' => asset('images/Logo-Alco_white.png'),
            ],
        ]);
    }
}
