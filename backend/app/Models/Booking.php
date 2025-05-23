<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nic',
        'email',
        'phone',
        'cardName',
        'cardNumber',
        'expiry',
        'cvv',
        'theatreName',
        'movieName',
        'showtime',
        'date',
        'seats',
        'total',
    ];
}
