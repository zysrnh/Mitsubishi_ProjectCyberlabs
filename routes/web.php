<?php

use App\Http\Controllers\ComingSoonController;
use App\Http\Controllers\FullRegistrationController;
use App\Http\Controllers\Registration\InaugurationController;
use App\Http\Controllers\Registration\SeminarController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegistrationSACController;
use App\Http\Controllers\RegistrationSACOpeningCeremonyController;
use App\Http\Controllers\RegistrationSACPersConferenceController;
use App\Http\Controllers\RegistrationSACPersController;
use App\Http\Controllers\RegistrationSACVipController;
use App\Http\Controllers\RegistrationSuccessController;
use App\Http\Controllers\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::get('/storage-link', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/laravel/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/storage';
    $success = symlink($targetFolder, $linkFolder);
    echo 'Symlink completed '. $success;
});

Route::redirect('/', 'pelantikan');

Route::get('/full', FullRegistrationController::class)->name('full_registration');

Route::get('/registration/{registration}/success', RegistrationSuccessController::class)
    ->name('registration_success')
    ->middleware(['signed']);

Route::prefix('/pelantikan')->name('pelantikan.')->group(function () {
    Route::get('/', [InaugurationController::class, 'showWelcome'])->name('show_welcome');
    Route::get('/registration', [InaugurationController::class, 'showForm'])->name('show_form');
    Route::post('/registration', [InaugurationController::class, 'submitForm'])->name('submit_form');
});
Route::prefix('/seminar')->name('seminar.')->group(function () {
    Route::get('/', [SeminarController::class, 'showWelcome'])->name('show_welcome');
    Route::get('/registration', [SeminarController::class, 'showForm'])->name('show_form');
    Route::post('/registration', [SeminarController::class, 'submitForm'])->name('submit_form');
});