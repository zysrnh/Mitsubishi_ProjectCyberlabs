<?php

use App\Http\Controllers\Registration\AsitaController;
use App\Http\Controllers\RegistrationSuccessController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - ASITA MEETING 
|--------------------------------------------------------------------------
*/

// Storage Link Helper
Route::get('/storage-link', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/laravel/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/storage';
    symlink($targetFolder, $linkFolder);
    return 'Storage link created!';
});

// Default redirect ke Asita
Route::redirect('/', '/asita');

// Registration Success Page
Route::get('/registration/{registration}/success', RegistrationSuccessController::class)
    ->name('registration_success')
    ->middleware(['signed']);

// ========================================
// ASITA MEETING REGISTRATION
// ========================================
Route::prefix('/asita')->name('asita.')->group(function () {
    // Registration form
    Route::get('/', [AsitaController::class, 'showForm'])
        ->name('show_form');
    
    // Submit registration
    Route::post('/register', [AsitaController::class, 'submitForm'])
        ->name('submit_form');
});