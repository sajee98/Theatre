<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TheatreMovies extends Model
{
    protected $table = 'theatre_movies';
    protected $primarykey = 'id';
    protected $fillable =[
       'theatreName',
        'movieName',
        'moviePoster',
        'genre',
        'language',
        'first_show',
        'first_show',
        'second_show',
        'third_show',
        'decision'
    ];
}
