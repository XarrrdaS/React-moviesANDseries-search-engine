import React, { useState } from 'react';
import MovieDetails from './MovieDetails';


function MovieList({ movies, singleMovieFacts }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovie2, setSelectedMovie2] = useState(null);


  const openMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const openMovieDetails2 = (movie2) => {
    setSelectedMovie2(movie2);
  };

  const closeMovieDetails = () => {
  setSelectedMovie(null);
  };

  if (!movies) {
    return null;
  }

  return (
    <div>
      {movies.map((movie, index) => {
        const facts = singleMovieFacts[index];
        return (
          movie.poster_path ? (
            <div key={movie.id} className="movie-card" onClick={() => {openMovieDetails(movie); openMovieDetails2(singleMovieFacts[index])}}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`Movie poster ${movie.title}`}
              />
              <h2>{movie.title}</h2>
              <p>{(facts && facts.tagline !== undefined && facts.tagline !== '') ? facts.tagline : ''}</p>
            </div>
          ) : null
        );
      })}
      <MovieDetails isOpen={selectedMovie !== null} onRequestClose={closeMovieDetails} movie={selectedMovie} movieFacts={selectedMovie2}/>
    </div>
  );
}

export default MovieList;
