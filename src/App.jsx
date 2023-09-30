import React from 'react';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';
import './App.css'

function App() {
  return (
    <div className="App">
      <main>
        <MovieSearch />
        <MovieList />
      </main>
    </div>
  );
}

export default App;
