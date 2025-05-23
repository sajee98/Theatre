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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nic');
            $table->string('email');
            $table->string('phone');
            $table->string('cardName');
            $table->string('cardNumber');
            $table->string('expiry');
            $table->string('cvv');
            $table->string('theatreName');
            $table->string('movieName');
            $table->string('showtime');
            $table->string('date');
            $table->text('seats');
            $table->decimal('total', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
