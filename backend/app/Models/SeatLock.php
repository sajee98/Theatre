<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeatLock extends Model
{
    protected $fillable = [
        'movie_name',
        'theatre',
        'showtime',
        'date',
        'seat',
        'locked_at',
    ];

    public $timestamps = true;

    protected $dates = ['locked_at'];
}
