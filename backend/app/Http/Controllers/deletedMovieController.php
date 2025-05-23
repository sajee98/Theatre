<?php

namespace App\Http\Controllers;
use App\Models\MovieList;


use Illuminate\Http\Request;

class deletedMovieController extends Controller

{
    protected $movieList;
    
        public function __construct(){
            $this->movieList = new MovieList();
        }
        

        

public function index()
{
    // Get the MovieList where the 'decision' column equals 1
    $MovieList = movieList::where('decision', 3)->get();
    
    return response(['data' => $MovieList], 200);
}

/**
 * Store a newly created resource in storage.
 */
public function store(Request $request)
{
    // return $this->movieList->create($request->all());
    // $data = $request->only(['id','theatreName','movieName','moviePoster']);
    // MovieList::create($data);
    // return response(['message' => 'success',], 200);

  
}

/**
 * Display the specified resource.
 */
public function show(string $id)
{
   return $movieList = $this->movieList->find($id);
}

/**
 * Update the specified resource in storage.
 */
public function update(Request $request, string $id)
{
    
      
    
}

/**
 * Remove the specified resource from storage.
 */
public function destroy(string $id)
{
    //$movieList->delete();
}
}
