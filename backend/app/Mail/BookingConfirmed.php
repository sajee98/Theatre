<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $bookings;

    public function __construct($bookings)
    {
        $this->bookings = $bookings;
    }

    public function build()
    {
        return $this->markdown('emails.booking.confirmed')
                    ->with([
                        'bookings' => $this->bookings,
                    ]);
    }
}
