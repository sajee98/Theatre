<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\movieController;
use App\Http\controllers\AcceptMovieController;
use App\Http\controllers\deletedMovieController;
use App\Http\controllers\addTheatreController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MovieFunctionController;
use App\Http\Controllers\SeatLockController;


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Protected
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/admin', function (Request $request) {
        if ($request->user()->role !== 'theatre') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json(['message' => 'Welcome Admin']);
    });

    Route::get('/super-admin', function (Request $request) {
        if ($request->user()->role !== 'super_admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json(['message' => 'Welcome Super Admin']);
    });
});



Route::apiResource('/movieList',MovieController::class);
Route::apiResource('/acceptMovie',AcceptMovieController::class);
Route::apiResource('/deletedMovie',deletedMovieController::class);
Route::apiResource('/theatreList',addTheatreController::class);
Route::apiResource('/publishMovies',MovieFunctionController::class);
Route::post('/lock-seats', [SeatLockController::class, 'lockSeats']);
Route::get('/get-locked-seats', [SeatLockController::class, 'getLockedSeats']);
Route::post('/bookticket', [BookingController::class, 'store']);
Route::get('/get-booked-seats', [BookingController::class, 'getBookedSeats']);