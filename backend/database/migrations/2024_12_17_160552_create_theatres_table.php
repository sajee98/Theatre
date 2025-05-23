<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('theatreList', function (Blueprint $table) {
            $table->id();
            $table->string('theatreName');
            $table->string('theatreID');
            $table->string('ownerName');
            $table->string('ownerNIC');
            $table->string('email');
            $table->string('location');
            $table->boolean('decision')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theatreList');
    }
};
