import React, { useState } from 'react';
import SerialDetails from './SerialDetails';

function SerialList({ series, singleSeriesFacts }) {
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [selectedSerial2, setSelectedSerial2] = useState(null);

  const openSerialDetails = (serial) => {
    setSelectedSerial(serial);
  };

  const openSerialDetails2 = (serial2) => {
    setSelectedSerial2(serial2);
  };

  const closeSerialDetails = () => {
  setSelectedSerial(null);
  };

  if (!series) {
    return null;
  }

  return (
    <div>
      {series.map((serial, index) => {
        return (
          serial.poster_path ? (
            <div key={serial.id} className="movie-card" onClick={() => {openSerialDetails(serial); openSerialDetails2(singleSeriesFacts[index])}}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${serial.poster_path}`}
              alt={`Serial poster ${serial.title}`}
            />
            <h2>{serial.name}</h2>
            <p>{serial.overview}</p>
          </div>
        ) : null
        );
      })}
      <SerialDetails isOpen={selectedSerial !== null} onRequestClose={closeSerialDetails} serial={selectedSerial} serialFacts={selectedSerial2}/>
    </div>
  );
}

export default SerialList;
