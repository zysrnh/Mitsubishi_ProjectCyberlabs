<?php

use App\Http\Controllers\ComingSoonController;
use App\Http\Controllers\FullRegistrationController;
use App\Http\Controllers\Registration\InaugurationController;
use App\Http\Controllers\Registration\MitsubishiController;
use App\Http\Controllers\Registration\SeminarController;
use App\Http\Controllers\Registration\VipController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegistrationSACController;
use App\Http\Controllers\RegistrationSACOpeningCeremonyController;
use App\Http\Controllers\RegistrationSACPersConferenceController;
use App\Http\Controllers\RegistrationSACPersController;
use App\Http\Controllers\RegistrationSACVipController;
use App\Http\Controllers\RegistrationSuccessController;
use App\Http\Controllers\VolunteerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Storage Link Helper
Route::get('/storage-link', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/laravel/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/storage';
    $success = symlink($targetFolder, $linkFolder);
    echo 'Symlink completed '. $success;
});

// Default redirect
Route::redirect('/', 'karang-taruna');

// Full Registration
Route::get('/full', FullRegistrationController::class)->name('full_registration');

// Registration Success Page (with signed URL)
Route::get('/registration/{registration}/success', RegistrationSuccessController::class)
    ->name('registration_success')
    ->middleware(['signed']);

// ========================================
// KARANG TARUNA REGISTRATION
// ========================================
Route::prefix('/karang-taruna')->name('karang_taruna.')->group(function () {
    Route::get('/', [InaugurationController::class, 'showWelcome'])->name('show_welcome');
    Route::get('/registration', [InaugurationController::class, 'showForm'])->name('show_form');
    Route::post('/registration', [InaugurationController::class, 'submitForm'])->name('submit_form');
});

// ========================================
// UMUM (PESERTA UMUM) REGISTRATION
// ========================================
Route::prefix('/umum')->name('umum.')->group(function () {
    Route::get('/', [SeminarController::class, 'showWelcome'])->name('show_welcome');
    Route::get('/registration', [SeminarController::class, 'showForm'])->name('show_form');
    Route::post('/registration', [SeminarController::class, 'submitForm'])->name('submit_form');
});

// ========================================
// VIP REGISTRATION
// ========================================
Route::prefix('/vip')->name('vip.')->group(function () {
    Route::get('/', [VipController::class, 'showWelcome'])->name('show_welcome');
    Route::get('/confirmation', [VipController::class, 'showConfirmation'])->name('show_confirmation');
    Route::post('/confirmation', [VipController::class, 'submitConfirmation'])->name('submit_confirmation');
});

// ========================================
// MITSUBISHI IIMS REGISTRATION
// ========================================
Route::prefix('/mitsubishi')->name('mitsubishi.')->group(function () {
    Route::get('/', [MitsubishiController::class, 'showLanding'])->name('landing');
    Route::get('/vehicles', [MitsubishiController::class, 'showVehicleSelection'])->name('vehicles');
    Route::get('/register', [MitsubishiController::class, 'showForm'])->name('show_form');
    Route::post('/register', [MitsubishiController::class, 'submitForm'])->name('submit_form');
});