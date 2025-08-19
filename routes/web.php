<?php

use App\Http\Controllers\ComingSoonController;
use App\Http\Controllers\FullRegistrationController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RegistrationSACController;
use App\Http\Controllers\RegistrationSACOpeningCeremonyController;
use App\Http\Controllers\RegistrationSACPersConferenceController;
use App\Http\Controllers\RegistrationSACPersController;
use App\Http\Controllers\RegistrationSACVipController;
use App\Http\Controllers\RegistrationSuccessController;
use App\Http\Controllers\VolunteerController;
use Illuminate\Support\Facades\Route;

Route::get('/', ComingSoonController::class);

Route::get('/storage-link', function () {
    $targetFolder = $_SERVER['DOCUMENT_ROOT'].'/laravel/storage/app/public';
    $linkFolder = $_SERVER['DOCUMENT_ROOT'].'/storage';
    $success = symlink($targetFolder, $linkFolder);
    echo 'Symlink completed '. $success;
});

// Route::prefix('registration')->name('user.')->group(function () {
//     Route::get('/', [RegistrationController::class, 'showRegistrationPage'])->name('registration');
//     Route::post('/', [RegistrationController::class, 'submitRegistration'])->name('submit_registration');

//     Route::get('/choose-seat', [RegistrationController::class, 'showChooseSeat'])->name('choose_seat');
//     Route::post('/choose-seat', [RegistrationController::class, 'submitChosenSeat'])->name('submit_seat');

//     Route::get('/{registration}/success', [RegistrationController::class, 'showRegistrationSuccess'])
//         ->name('registration_success')
//         ->middleware(['signed']);
// });

Route::get('/full', FullRegistrationController::class)->name('full_registration');

Route::get('/registration/{registration}/success', RegistrationSuccessController::class)
    ->name('registration_success')
    ->middleware(['signed']);

Route::prefix('sac')->name('sac.')->group(function () {
    Route::get('/pameran', [RegistrationSACController::class, 'showWelcome'])->name('welcome');
    Route::get('/pameran/registration', [RegistrationSACController::class, 'showForm'])->name('registration');
    Route::post('/pameran/registration', [RegistrationSACController::class, 'submitForm'])->name('submit_registration');

    Route::get('/opening-ceremony', [RegistrationSACOpeningCeremonyController::class, 'showWelcome'])->name('opening.welcome');
    Route::get('/opening-ceremony/registration', [RegistrationSACOpeningCeremonyController::class, 'showForm'])->name('opening.registration');
    Route::post('/opening-ceremony/registration', [RegistrationSACOpeningCeremonyController::class, 'submitForm'])->name('opening.submit_registration');
});

Route::prefix('sac-vip')->name('sac_vip.')->group(function () {
    Route::get('/opening-ceremony', [RegistrationSACVipController::class, 'showWelcome'])->name('welcome');
    Route::get('/opening-ceremony/registration', [RegistrationSACVipController::class, 'showForm'])->name('registration');
    Route::post('/opening-ceremony/registration', [RegistrationSACVipController::class, 'submitForm'])->name('submit_registration');

    Route::get('/opening-ceremony/seat', [RegistrationSACVipController::class, 'showSeating'])->name('seat');
    Route::post('/opening-ceremony/seat', [RegistrationSACVipController::class, 'chooseSeat'])->name('choose_seat');
});

Route::prefix('sac-pers')->name('sac_pers.')->group(function () {
    Route::get('/opening-ceremony', [RegistrationSACPersController::class, 'showWelcome'])->name('welcome');
    Route::get('/opening-ceremony/registration', [RegistrationSACPersController::class, 'showForm'])->name('registration');
    Route::post('/opening-ceremony/registration', [RegistrationSACPersController::class, 'submitForm'])->name('submit_registration');

    Route::get('/press-conference', [RegistrationSACPersConferenceController::class, 'showWelcome'])->name('press.welcome');
    Route::get('/press-conference/registration', [RegistrationSACPersConferenceController::class, 'showForm'])->name('press.registration');
    Route::post('/press-conference/registration', [RegistrationSACPersConferenceController::class, 'submitForm'])->name('press.submit_registration');
});

Route::prefix('volunteer')->name('volunteer.')->group(function () {
    Route::get('/', [VolunteerController::class, 'showWelcome'])->name('welcome');
    Route::get('/registration', [VolunteerController::class, 'showVolunteerRegistration'])->name('registration');
    Route::post('/registration', [VolunteerController::class, 'submitVolunteer'])->name('submit_registration');
});
