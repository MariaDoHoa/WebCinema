import React from 'react'

export default function ShowtimeFormat({ showtimeString, dayOfWeekString }) {

    const [day, month, year] = dayOfWeekString.split('/').map(Number);

    // Split the showtime string into hours and minutes
    const [hours, minutes] = showtimeString.split(':').map(Number);
  
    // Create a new Date object with the extracted date and time
    const showtimeDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  
    // Format the date to ISO 8601 format with 'Z' indicating UTC timezone
    const formattedShowtime = showtimeDate.toISOString();

    
  return (
 
 <div>{formattedShowtime}</div>
  )
}
