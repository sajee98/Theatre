<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TheatreList extends Model
{
    protected $table = 'theatreList';
    protected $primarykey = 'id';
    protected $fillable =[
        'theatreName',
        'theatreID',
        'ownerName',
        'ownerNIC',
        'email',
        'location',
        'decision'
    ];
}
