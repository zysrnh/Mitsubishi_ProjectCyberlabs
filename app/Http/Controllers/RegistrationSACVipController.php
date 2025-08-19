<?php

namespace App\Http\Controllers;

use App\Enums\EventName;
use App\Jobs\GenerateQr;
use App\Models\Event;
use App\Models\Registration;
use App\Models\Seat;
use App\Settings\RegistrationSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

// Opening Ceremony
class RegistrationSACVipController extends Controller
{
    public function showWelcome(RegistrationSettings $registrationSettings)
    {
        $count = Registration::where('extras->type', 'vip')
            ->where('extras->event_name', EventName::OPENING_CEREMONY->value)
            ->count();

        if ($registrationSettings->vip_limit >= 0 && $count >= $registrationSettings->vip_limit) {
            return redirect()->route('full_registration');
        }

        return Inertia::render('RegistrationWelcome', [
            'redirectTo' => route('sac_vip.registration'),
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function showForm()
    {
        $formData = session('registration_data');

        return Inertia::render('RegistrationSACVip', [
            'formData' => $formData,
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
            'email' => ['required', 'email', 'max:255'],
            'organization' => ['required', 'max:255'],
        ]);

        $registrationData = array_merge($validated, [
            'is_approved' => false,
            'approved_at' => now(),
            'event_id' => Event::where('name', 'SBY Art Community')->first()->id,
            'extras' => [
                EventName::OPENING_CEREMONY->value,
                'type' => 'vip',
                'is_vip' => true,
                'is_pers' => false,
                'organization' => $validated['organization'],
            ],
        ]);

        session(['registration_data' => $registrationData]);

        // GenerateQr::dispatchSync($registration);
        // Bus::chain([
        //     new SendQrToWhatsapp($registration),
        // ])->dispatch()

        // $signedUrl = URL::temporarySignedRoute(
        //     'registration_success',
        //     now()->addHour(),
        //     ['registration' => $registration->id]
        // );

        // return redirect($signedUrl)->with('info', [
        //     'success' =>  'Berhasil mendaftar pada SAC Opening Ceremony',
        // ]);

        return redirect()->route('sac_vip.seat');
    }

    public function showSeating()
    {
        $formData = session('registration_data');

        if (!$formData) {
            // If user skipped step 1, send back to registration
            return redirect()->route('sac_vip.registration')->with('info', 'Harap isi form registrasi terlebih dahulu sebelum memilih kursi.');
        }

        $seatingType = 'theater'; // Switch between 'theater' and 'table'

        if ($seatingType == 'table') {
            // Group by table and calculate remaining seats
            $tables = Seat::select('group_name')
                ->selectRaw('COUNT(*) as total')
                ->selectRaw('COUNT(CASE WHEN registration_id IS NULL THEN 1 END) as remaining')
                ->where('type', $seatingType) // Add this filter if you have a type column
                ->groupBy('group_name')
                ->orderBy('group_name') // Add consistent ordering
                ->get()
                ->map(function ($table) {
                    return [
                        'group_name' => $table->group_name,
                        'remaining' => $table->remaining,
                        'total' => $table->total,
                    ];
                });

            return Inertia::render('ChooseSeat', [
                'seatingType' => 'table',
                'tables' => $tables,
                'formData' => $formData,
                'images' => [
                    'ekraf_white' => asset('images/ekraf-text-white.png'),
                    'kkri_white' => asset('images/kkri-text-white.png'),
                    'sby_art_white' => asset('images/sbyart-logo.png'),
                ],
            ]);
        }

        // Theater seating logic remains the same
        $seats = Seat::where('type', $seatingType)
            ->orderBy('row')
            ->orderBy('column')
            ->get();
        $maxColumnCount = Seat::where('type', $seatingType)->max('column');

        return Inertia::render('ChooseSeat', [
            'seatingType' => $seatingType,
            'seats' => $seats,
            'maxColumnCount' => $maxColumnCount,
            'formData' => $formData,
            'images' => [
                'ekraf_white' => asset('images/ekraf-text-white.png'),
                'kkri_white' => asset('images/kkri-text-white.png'),
                'sby_art_white' => asset('images/sbyart-logo.png'),
            ],
        ]);
    }

    public function chooseSeat(Request $request)
    {
        $formData = session('registration_data');

        if (!$formData) {
            // If user skipped step 1, send back to registration
            return redirect()->route('sac_vip.registration')->with('info', 'Sesi Kadaluarsa. Harap mengulangi registrasi kembali.');
        }

        // Updated validation to handle both theater and table types
        $validated = $request->validate([
            'seat_id' => 'nullable|exists:seats,id',
            'group_name' => 'nullable|string',
            'type' => 'required|string|in:theater,table',
        ]);

        $registrationData = array_merge($formData, [
            'seat_id' => $validated['seat_id'] ?? null
        ]);

        try {
            $registration = DB::transaction(function () use ($validated, $registrationData) {
                if ($validated['type'] === 'theater') {
                    // Lock & assign specific seat
                    $seat = Seat::where('id', $validated['seat_id'])
                        ->lockForUpdate()
                        ->first();

                    if (!$seat || $seat->registration_id) {
                        throw new \Exception('seat_taken');
                    }
                } else {
                    // Table type: Lock & assign first available seat in the table
                    $seat = Seat::where('group_name', $validated['group_name'])
                        ->whereNull('registration_id')
                        ->orderBy('id') // or orderBy('seat_number') for lowest seat number first
                        ->lockForUpdate()
                        ->first();

                    if (!$seat) {
                        throw new \Exception('table_full');
                    }

                    // Update registration data with the actual seat_id
                    $registrationData['seat_id'] = $seat->id;
                }

                $registration = Registration::create($registrationData);
                $seat->update(['registration_id' => $registration->id]);

                return $registration;
            });

            // Clear session data after successful registration
            session()->forget('registration_data');

            return redirect()->to(
                URL::temporarySignedRoute(
                    'registration_success',
                    now()->addMinutes(60),
                    ['registration' => $registration->id]
                ),
            );
        } catch (\Exception $e) {
            if ($e->getMessage() === 'seat_taken') {
                return redirect()->route('sac_vip.choose_seat')->with('info', [
                    'error' => 'Sorry, this seat was just taken by another user. Please choose a different seat.',
                    'seat_taken' => true
                ]);
            }

            if ($e->getMessage() === 'table_full') {
                return redirect()->route('sac_vip.choose_seat')->with('info', [
                    'error' => 'Sorry, this table is now full. Please choose a different table.',
                    'table_full' => true
                ]);
            }

            // Log the error for debugging
            Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'user_data' => $formData,
                'seat_id' => $validated['seat_id'] ?? null,
                'group_name' => $validated['group_name'] ?? null
            ]);

            return redirect()->route('sac_vip.choose_seat')->with('info', [
                'error' => 'An error occurred during registration. Please try again.'
            ]);
        }
    }
}
