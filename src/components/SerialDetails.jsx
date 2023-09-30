import React, { useState } from 'react';
import Modal from 'react-modal';
import './style/SerialDetails.css';

Modal.setAppElement('#root');

function SerialDetails({ isOpen, onRequestClose, serial, serialFacts }) {
  const [isSeasonsOpen, setSeasonsOpen] = useState(false);

  const handleClose = () => {
    setSeasonsOpen(false);
    onRequestClose();
  };

  if (!serial) {
    return null;
  }
  const genres = (serialFacts.genres ? serialFacts.genres.map((genre) => genre.name).join(', ') : '');

  const seasons = () => {
    const seasonCount = serialFacts.seasons.length;
    if (seasonCount <= 1) {
      return seasonCount + ' season';
    } else if (seasonCount > 1) {
      return seasonCount + ' seasons';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={`Serial details for ${serial.title}`}
    >
      <div className="movie-details">
        <h2>{serial.name}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${serial.poster_path}`}
          alt={`Serial poster ${serial.title}`}
        />
        <p>{serialFacts.tagline ? serialFacts.tagline : ''}</p>
        <p>{serial.first_air_date ? (<span>{serial.first_air_date} &#9679;</span>) : ''} {genres ? (<span>{genres} &#9679;</span>) : ''} <span className={`seasons-button ${isSeasonsOpen ? 'season-button-open' : ''}`} onClick={() => setSeasonsOpen(!isSeasonsOpen)}>{seasons()}</span></p>
        {(isSeasonsOpen && (
          serialFacts.seasons.map(season => (
            <p key={season.id}>
              <span className='season'>
                {season.season_number ? `Season ${season.season_number}` : 'Specials'}
              </span><br />
              <span className={`vote ${!season.vote_average ? ' vote-hidden' : ''}`}>
                {season.vote_average ? `\u2606 ${season.vote_average}/10` : null}
              </span>
              {season.air_date ? (<span>{season.air_date} &#9679;</span>) : ''} {season.episode_count <= 1 ? (season.episode_count === 0 ? '' : `${season.episode_count} episode`) : `${season.episode_count} episodes`}<br />
              {season.overview}
            </p>
          ))))
        }
        <p className='rating'>Rating: {serial.vote_average}/10 ({serial.vote_count} votes)</p>
        {serialFacts.homepage ? (
        <a href={serialFacts.homepage} className="button-homepage" target='_blank' rel='noreferrer'>Home page</a>
        ) : (null)}
      </div>
    </Modal>
  );
}

export default SerialDetails;