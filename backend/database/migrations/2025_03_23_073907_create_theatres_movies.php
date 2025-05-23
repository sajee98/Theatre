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
        Schema::create('theatres_movies', function (Blueprint $table) {
            $table->id();
            $table->string('theatreName');
            $table->string('movieName');
            $table->string('moviePoster');
            $table->string('genre');
            $table->string('language');
            $table->string('duration');
            $table->string('first_show')->nullable();
            $table->string('second_show')->nullable();
            $table->string('third_show')->nullable();
            $table->boolean('decision')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theatres_movies');
    }
};
