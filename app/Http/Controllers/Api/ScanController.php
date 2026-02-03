<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;

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
        $registration = Registration::with(['seat', 'event'])
            ->where('unique_code', $validated['unique_code'])
            ->first();

        // If not found
        if (!$registration) {
            return response()->json([
                'success' => false,
                'message' => 'Kode QR tidak ditemukan. Pastikan kode sudah terdaftar.',
                'data'    => null,
            ], 404);
        }

        // If not approved
        if (!$registration->is_approved) {
            return response()->json([
                'success' => false,
                'message' => 'Registrasi belum disetujui. Hubungi panitia untuk approval.',
                'data'    => $registration,
            ], 403);
        }

        // If override flag is set — just return model without marking
        if (!empty($validated['override']) && $validated['override']) {
            return response()->json([
                'success' => true,
                'message' => 'Mode override aktif - data ditampilkan tanpa mencatat kehadiran.',
                'data'    => $registration,
            ], 200);
        }

        // If already attended
        if ($registration->has_attended && !empty($registration->attended_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Peserta sudah melakukan check-in pada ' . 
                           $registration->attended_at->format('d M Y H:i') . '.',
                'data'    => $registration,
            ], 409); // Conflict
        }

        // Mark attendance
        $registration->update([
            'attended_at'  => now(),
            'has_attended' => true,
        ]);

        // Reload to get fresh data with relationships
        $registration->refresh();
        $registration->load(['seat', 'event']);

        return response()->json([
            'success' => true,
            'message' => 'Kehadiran berhasil dicatat! Selamat datang ' . $registration->name . '.',
            'data'    => $registration,
        ], 200);
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

        $registration = Registration::with(['seat', 'event'])
            ->where('unique_code', $validated['unique_code'])
            ->first();

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
            'data'    => $registration,
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

        $query = Registration::with(['seat', 'event'])
            ->where('has_attended', true)
            ->whereNotNull('attended_at')
            ->orderBy('attended_at', 'desc');

        if ($eventId) {
            $query->where('event_id', $eventId);
        }

        $recentAttendance = $query->limit($limit)->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar kehadiran terbaru berhasil dimuat.',
            'data' => $recentAttendance,
        ], 200);
    }
}