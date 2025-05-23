<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;
use App\Mail\BookingConfirmed;
use App\Models\Booking;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate request data
            $data = $request->validate([
                'name' => 'required|string',
                'nic' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|regex:/^\+94\d{9}$/',
                'cardName' => 'required|string',
                'cardNumber' => 'required',
                'expiry' => 'required',
                'cvv' => 'required',
                'theatreName' => 'required|string',
                'movieName' => 'required|string',
                'showtime' => 'required|string',
                'date' => 'required|string',
                'selectedSeats' => 'required|array',
                'total' => 'required|numeric',
            ]);

            // Create booking
            $booking = Booking::create([
                'name' => $data['name'],
                'nic' => $data['nic'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'cardName' => $data['cardName'],
                'cardNumber' => $data['cardNumber'],
                'expiry' => $data['expiry'],
                'cvv' => $data['cvv'],
                'theatreName' => $data['theatreName'],
                'movieName' => $data['movieName'],
                'showtime' => $data['showtime'],
                'date' => $data['date'],
                'seats' => implode(', ', $data['selectedSeats']),
                'total' => $data['total'],
            ]);

            // Send email
            Mail::to($data['email'])->send(new BookingConfirmed($booking));

            // Send SMS via Twilio
            try {
                $sid = env('TWILIO_SID');
                $authToken = env('TWILIO_AUTH_TOKEN');
                $twilioPhoneNumber = env('TWILIO_PHONE_NUMBER');

                $client = new Client($sid, $authToken);

                $client->messages->create(
                    $data['phone'],
                    [
                        'from' => $twilioPhoneNumber,
                        'body' => "Your ticket for '{$data['movieName']}' at '{$data['theatreName']}' on {$data['date']} at {$data['showtime']} is confirmed. Seats: " . implode(', ', $data['selectedSeats']) . ". Amount: ₹{$data['total']}.",
                    ]
                );

                Log::info('SMS sent successfully to ' . $data['phone']);
            } catch (\Exception $e) {
                Log::error('Error sending SMS: ' . $e->getMessage());
            }

            return response()->json(['success' => true, 'booking' => $booking]);

        } catch (\Exception $e) {
            Log::error('Error in booking process: ' . $e->getMessage(), [
                'request' => $request->all(),
                'exception' => $e
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getBookedSeats(Request $request)
{
    $request->validate([
        'movie_name' => 'required|string',
        'theatre' => 'required|string',
        'showtime' => 'required|string',
        'date' => 'required|string',
    ]);

    $bookedSeats = Booking::where([
        ['movieName', $request->movie_name],
        ['theatreName', $request->theatre],
        ['showtime', $request->showtime],
        ['date', $request->date],
    ])->pluck('seats');

    $allBookedSeats = [];

    foreach ($bookedSeats as $seatString) {
        $allBookedSeats = array_merge($allBookedSeats, array_map('trim', explode(',', $seatString)));
    }

    return response()->json($allBookedSeats);
}
}
