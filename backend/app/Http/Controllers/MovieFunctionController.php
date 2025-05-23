<?php

namespace App\Http\Controllers;
use App\Models\MovieList;
use App\Models\TheatreMovies;
use Illuminate\Http\Request;

class MovieFunctionController extends Controller
{
    protected $movieList;
    
    public function __construct()
    {
        $this->movieList = new movieList();

    }
    public function index()
{
    // Get the MovieList where the 'decision' column equals 1
    $MovieList = movieList::where('decision', 1)->get();
    
    return response(['data' => $MovieList], 200);
}
public function store(Request $request)
    {
        $request->validate([
            'theatreName' => 'required|string',
            'movieName' => 'required|string',
            'moviePoster' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'genre' => 'required|string',
            'language' => 'required|string',
            'duration' => 'required|string',
            'first_show' => 'nullable|string',
            'second_show' => 'nullable|string',
            'third_show' => 'nullable|string',
        ]);
        $path = $request->file('moviePoster')->store('images', 'public');

        $theatre = TheatreMovies::create([
            'theatreName' => $request->theatreName,
            'movieName' => $request->movieName,
            'moviePoster' => $path,
            'genre' => $request->genre,
            'language' => $request->language,
            'duration' => $request->duration,
            'first_show' => $request->first_show,
            'second_show' => $request->second_show,
            'third_show' => $request->third_show,
        ]);

        return response()->json(['message' => 'Movie added to theatre successfully', 'data' => $theatre], 201);
    }

}
