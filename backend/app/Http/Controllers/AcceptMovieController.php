<?php

namespace App\Http\Controllers;

use App\Models\MovieList;


use Illuminate\Http\Request;

class AcceptMovieController extends Controller

{
    protected $movieList;

    public function __construct()
    {
        $this->movieList = new MovieList();
    }




    public function index(Request $request)
    {
        $decision = $request->input('decision', 2);
        $movieName = $request->input('movieName'); 
        
        $query = movieList::where('decision', $decision);

        if ($movieName) {
            $query->where('movieName', $movieName);
        }

        $MovieList = $query->get();

        return response(['data' => $MovieList], 200);
    }


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
        $movieList = MovieList::findOrFail($id);
        $movieList->decision = $request->decision;
        $movieList->save();

        return response()->json(['message' => 'Movie updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //$movieList->delete();
    }
}
