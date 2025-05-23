<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeatLock;
use Carbon\Carbon;

class SeatLockController extends Controller
{
    public function lockSeats(Request $request)
    {
        $validated = $request->validate([
            'movie_name' => 'required|string',
            'theatre' => 'required|string',
            'showtime' => 'required|string',
            'date' => 'required|date',
            'seats' => 'required|array'
        ]);

        $lockedSeats = [];

        foreach ($validated['seats'] as $seat) {
            $existingLock = SeatLock::where([
                ['movie_name', $validated['movie_name']],
                ['theatre', $validated['theatre']],
                ['showtime', $validated['showtime']],
                ['date', $validated['date']],
                ['seat', $seat],
            ])
            ->where('locked_at', '>', now()->subMinutes(2))
            ->first();

            if ($existingLock) {
                $lockedSeats[] = $seat;
            }
        }

        if (count($lockedSeats) > 0) {
            return response()->json([
                'message' => 'Some seats are already locked.',
                'lockedSeats' => $lockedSeats,
            ], 422);
        }

        foreach ($validated['seats'] as $seat) {
            SeatLock::updateOrCreate(
                [
                    'movie_name' => $validated['movie_name'],
                    'theatre' => $validated['theatre'],
                    'showtime' => $validated['showtime'],
                    'date' => $validated['date'],
                    'seat' => $seat,
                ],
                [
                    'locked_at' => now(),
                ]
            );
        }

        return response()->json(['message' => 'Seats locked successfully']);
    }

    public function getLockedSeats(Request $request)
    {
        $request->validate([
            'movie_name' => 'required|string',
            'theatre' => 'required|string',
            'showtime' => 'required|string',
            'date' => 'required|date',
        ]);

        $lockedSeats = SeatLock::where([
            ['movie_name', $request->movieName],
            ['theatre', $request->theatre],
            ['showtime', $request->showtime],
            ['date', $request->date],
        ])
        ->where('locked_at', '>', now()->subMinutes(2))
        ->pluck('seat');

        return response()->json($lockedSeats);
    }
}
