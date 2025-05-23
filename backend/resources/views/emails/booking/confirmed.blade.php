@component('mail::message')
# Ticket Confirmed 🎉

**Movie:** {{ $bookings->movieName }}  
**Theatre:** {{ $bookings->theatreName }}  
**Date:** {{ $bookings->date }}  
**Time:** {{ $bookings->showtime }}  
**Seats:** {{ $bookings->seats }}  
**Total:** ₹{{ $bookings->total }}

Thank you for booking with us!

@endcomponent
