<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TheatreList;

class addTheatreController extends Controller
{
        protected $theatreList;
        
            public function __construct(){
                $this->theatreList = new theatreList();
            }
            
  
            

    public function index()
    {
        $theatreList = theatreList::where('decision', 0)->get();
    
        return response(['data' => $theatreList], 200);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'theatreName'=>'required',
            'theatreID'=>'required',
            'ownerName'=>'required',
            'ownerNIC'=> 'required',
            'email'=> 'required',
              
        ]);

        $data = theatreList::create([
            'theatreName' => $request->theatreName,
            'theatreID' => $request->theatreID,
            'ownerName' => $request->ownerName,
            'ownerNIC' => $request->ownerNIC,
            'email' => $request->email,
            'location' => $request->location,
          
            
        ]);
          return Response()
            ->json([
                'message' => 'success',
                'data' => $data
            ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       return $theatreList = $this->theatreList->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $theatreList = $this->theatreList->find($id);
        $theatreList->update($request->all());
        return $theatreList;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //$theatreList->delete();
    }
}
