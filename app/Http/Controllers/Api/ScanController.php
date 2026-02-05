<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ScanController extends Controller
{
    /**
     * Mark attendance for a registration
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAttendance(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'unique_code' => 'required|string',
            'override'    => 'nullable|boolean',
        ]);

        // Find registration
        $registration = Registration::where('unique_code', $validated['unique_code'])->first();

        // If not found
        if (!$registration) {
            return response()->json([
                'success' => false,
                'message' => 'Kode QR tidak ditemukan. Pastikan kode sudah terdaftar.',
                'data'    => null,
            ], 404);
        }

        // VALIDASI APPROVAL SUDAH DIHAPUS - langsung bisa absen tanpa perlu approval

        // If override flag is set — just return model without marking
        if (!empty($validated['override']) && $validated['override']) {
            return response()->json([
                'success' => true,
                'message' => 'Mode override aktif - data ditampilkan tanpa mencatat kehadiran.',
                'data'    => $this->formatRegistrationResponse($registration),
            ], 200);
        }

        // If already attended
        if ($registration->has_attended && !empty($registration->attended_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Peserta sudah melakukan check-in pada ' . 
                           $registration->attended_at->format('d M Y H:i') . '.',
                'data'    => $this->formatRegistrationResponse($registration),
            ], 409); // Conflict
        }

        // Mark attendance
        try {
            $registration->markAsAttended();
            
            // Reload to get fresh data
            $registration->refresh();

            // Log successful attendance
            Log::info('Attendance marked successfully', [
                'unique_code' => $registration->unique_code,
                'name' => $registration->name,
                'attended_at' => $registration->attended_at,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Kehadiran berhasil dicatat! Selamat datang ' . $registration->name . '.',
                'data'    => $this->formatRegistrationResponse($registration),
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to mark attendance', [
                'unique_code' => $validated['unique_code'],
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mencatat kehadiran. Silakan coba lagi.',
                'data'    => null,
            ], 500);
        }
    }

    /**
     * Get registration details without marking attendance
     * Useful for preview/checking registration status
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkRegistration(Request $request)
    {
        $validated = $request->validate([
            'unique_code' => 'required|string',
        ]);

        $registration = Registration::where('unique_code', $validated['unique_code'])->first();

        if (!$registration) {
            return response()->json([
                'success' => false,
                'message' => 'Kode QR tidak ditemukan.',
                'data'    => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data registrasi ditemukan.',
            'data'    => $this->formatRegistrationResponse($registration),
        ], 200);
    }

    /**
     * Get attendance statistics
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics(Request $request)
    {
        $eventId = $request->get('event_id');

        $query = Registration::query();

        if ($eventId) {
            $query->where('event_id', $eventId);
        }

        $totalRegistrations = $query->count();
        $totalApproved = (clone $query)->where('is_approved', true)->count();
        $totalAttended = (clone $query)->where('has_attended', true)->count();
        $totalPending = (clone $query)->where('is_approved', false)->count();

        $attendanceRate = $totalApproved > 0 
            ? round(($totalAttended / $totalApproved) * 100, 2) 
            : 0;

        return response()->json([
            'success' => true,
            'message' => 'Statistik berhasil dimuat.',
            'data' => [
                'total_registrations' => $totalRegistrations,
                'total_approved' => $totalApproved,
                'total_attended' => $totalAttended,
                'total_pending' => $totalPending,
                'attendance_rate' => $attendanceRate,
                'not_attended_yet' => $totalApproved - $totalAttended,
            ],
        ], 200);
    }

    /**
     * Get list of recent attendance
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecentAttendance(Request $request)
    {
        $limit = $request->get('limit', 10);
        $eventId = $request->get('event_id');

        $query = Registration::where('has_attended', true)
            ->whereNotNull('attended_at')
            ->orderBy('attended_at', 'desc');

        if ($eventId) {
            $query->where('event_id', $eventId);
        }

        $recentAttendance = $query->limit($limit)->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar kehadiran terbaru berhasil dimuat.',
            'data' => $recentAttendance->map(function ($registration) {
                return $this->formatRegistrationResponse($registration);
            }),
        ], 200);
    }

    /**
     * Format registration response to match Flutter model expectations
     *
     * @param Registration $registration
     * @return array
     */
    private function formatRegistrationResponse(Registration $registration): array
    {
        return [
            'id' => $registration->id,
            'name' => $registration->name,
            'email' => $registration->email,
            'phone' => $registration->phone,
            'unique_code' => $registration->unique_code,
            'has_attended' => $registration->has_attended,
            'is_approved' => $registration->is_approved,
            'approved_at' => $registration->approved_at?->toIso8601String(),
            'attended_at' => $registration->attended_at?->toIso8601String(),
            'last_blasted_at' => $registration->last_blasted_at?->toIso8601String(),
            'last_successful_sent_at' => $registration->last_successful_sent_at?->toIso8601String(),
            'whatsapp_send_attempts' => $registration->whatsapp_send_attempts,
            'extras' => $registration->extras,
            'event_id' => $registration->event_id,
            'deleted_at' => $registration->deleted_at,
            'created_at' => $registration->created_at?->toIso8601String(),
            'updated_at' => $registration->updated_at?->toIso8601String(),
            'qr_path' => $registration->qr_path,
            'qr_full_path' => $registration->qr_full_path,
            'message_status' => $registration->message_status ?? null,
            // Mitsubishi-specific fields (from extras accessors)
            'vehicle' => $registration->vehicle,
            'dealer_branch' => $registration->dealer_branch,
            'assistant_sales' => $registration->assistant_sales,
            'dealer' => $registration->dealer,
        ];
    }
}