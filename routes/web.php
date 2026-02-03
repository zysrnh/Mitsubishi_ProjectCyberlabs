<?php

use App\Http\Controllers\Registration\MitsubishiController;
use App\Http\Controllers\RegistrationSuccessController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - MITSUBISHI IIMS ONLY
|--------------------------------------------------------------------------
*/

// Storage Link Helper
Route::get('/storage-link', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/laravel/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/storage';
    symlink($targetFolder, $linkFolder);
    return 'Storage link created!';
});

// Default redirect ke Mitsubishi
Route::redirect('/', '/mitsubishi');

// Registration Success Page (dengan signed URL untuk security)
Route::get('/registration/{registration}/success', RegistrationSuccessController::class)
    ->name('registration_success')
    ->middleware(['signed']);

// ========================================
// MITSUBISHI IIMS REGISTRATION
// ========================================
Route::prefix('/mitsubishi')->name('mitsubishi.')->group(function () {
    // Landing page
    Route::get('/', [MitsubishiController::class, 'showLanding'])
        ->name('landing');
    
    // Vehicle selection page
    Route::get('/vehicles', [MitsubishiController::class, 'showVehicleSelection'])
        ->name('vehicles');
    
    // Registration form (with selected vehicle)
    Route::get('/register', [MitsubishiController::class, 'showForm'])
        ->name('show_form');
    
    // Submit registration
    Route::post('/register', [MitsubishiController::class, 'submitForm'])
        ->name('submit_form');
});