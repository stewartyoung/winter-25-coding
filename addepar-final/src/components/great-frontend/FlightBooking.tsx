import { useState } from 'react';

const FlightBookingType = {
  ONEWAY: "One-way",
  ROUNDTRIP: "Round-trip"
}

export default function FlightBoooking() {
  const [flightBookingType, setFlightBookingType] = useState(FlightBookingType.ONEWAY);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [minMaxDate, setMinMaxDate] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const stringifyDate = (date: Date) => {
    return (date).toISOString().split("T")[0]
  }

  const minDate = stringifyDate(new Date());

  const toggleFlightBookingType = () => {
    const curr = flightBookingType;
    switch(curr) {
      case FlightBookingType.ONEWAY:
        setFlightBookingType(FlightBookingType.ROUNDTRIP)
        break;
      case FlightBookingType.ROUNDTRIP:
        setFlightBookingType(FlightBookingType.ONEWAY)
        break;
      default:
        break
    }
  }

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDepartureDate(date);
    setMinMaxDate(date);
  }

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const date = e.target.value;
    setReturnDate(date);
  }

  const handleBookingConfirmation = () => {
    setIsFormSubmitted(true);
  }

  const handleMakeAnotherBooking = () => {
    setFlightBookingType(FlightBookingType.ONEWAY);
    setDepartureDate('');
    setReturnDate('');
    setMinMaxDate('');
    setIsFormSubmitted(false);
  }

  const handleDisableBookingConfirmation = () => {
    if (flightBookingType === FlightBookingType.ROUNDTRIP && returnDate === '' || departureDate === '') {
      return true;
    }
    return false;
  }

  return (
    <>
    {!isFormSubmitted && (
    <form>
      <div>
        <label htmlFor="depart-date">Departure Date: </label>
        <input 
          type="date" 
          id="depart-date" 
          value={departureDate} 
          min={minDate} 
          onChange={handleDepartureDateChange}/>
      </div>
      <div>
        <label htmlFor="flight-booking-type-return">{FlightBookingType.ROUNDTRIP}?</label>
        <input
          type="checkbox" 
          id="flight-booking-type-return" 
          value={flightBookingType} 
          onClick={toggleFlightBookingType}  
        />
      </div>
      {flightBookingType === FlightBookingType.ROUNDTRIP && (
        <div>
          <label htmlFor="return-date">Return Date: </label>
          <input 
            type="date" 
            id="return-date" 
            value={returnDate}
            onChange={handleReturnDateChange}
            min={minMaxDate} />
        </div>
      )}
      <button
        type='button'
        disabled={handleDisableBookingConfirmation()}
        onClick={handleBookingConfirmation}>Confirm booking</button>
    </form>
    )}
    {isFormSubmitted && (
      <div>
        <p>Congratulations! You've booked your flights from {departureDate}
        {flightBookingType === FlightBookingType.ROUNDTRIP ? " to " + returnDate : ""}.</p>
        <button onClick={handleMakeAnotherBooking}>Make another booking</button>
      </div>
    )}
    </>
  );
}
