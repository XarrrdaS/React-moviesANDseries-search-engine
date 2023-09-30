import React from 'react';
import Modal from 'react-modal';
import './style/MovieDetails.css';

Modal.setAppElement('#root');

function MovieDetails({ isOpen, onRequestClose, movie, movieFacts }) {
  if (!movie) {
    return null;
  }

  const genres = movieFacts.genres.map((genre) => genre.name).join(', ');

  const runTime = () => {
    let mins = movieFacts.runtime;
    let hours = 0;

    if (mins >= 60) {
      hours += Math.floor(mins / 60);
      mins -= hours * 60;
    }

    return `${hours}h ${mins}min`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`Movie details for ${movie.title}`}
    >
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`Movie poster ${movie.title}`}
        />
        <p>{movie.release_date ? (<span>{movie.release_date} &#9679;</span>) : ''} {genres ? (<span>{genres} &#9679;</span>) : ''} {runTime()}</p>
        <p>{movieFacts.overview}</p>
        <p>Rating: {movie.vote_average}/10 ({movie.vote_count} votes)</p>
        <a href={movieFacts.homepage} className="button-homepage" target='_blank' rel='noreferrer'>Home page</a>
      </div>
    </Modal>
  );
}

export default MovieDetails;
