import React, { useState, useEffect, useCallback } from 'react';
import MovieList from './MovieList';
import MovieCategories from './MovieCategories';
import './style/MovieSearch.css';
import SerialList from './SerialList';


function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
  const [singleMovieFacts, setSingleMovieFacts] = useState([]);
  const [singleSeries, setSingleSeries] = useState([]);
  const [singleSeriesFacts, setSingleSeriesFacts] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [chooseType, setChooseType] = useState('movies');
  const [sameChooseType, setSameChooseType] = useState(1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [prevSelectedCategory, setPrevSelectedCategory] = useState('');


  const fetchMovies = useCallback(async (searchTerm, category = '') => {
    const apiKey = '6985974957546d752f3a2af821f9f623';
    var url;
    try {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
      if (category) {
        url += `&with_genres=${category}`;
      }
      if (searchTerm === ''){
        if (category){
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${category}&sort_by=popularity.desc`;
        } else{
          url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;
        }
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      let filteredMovies = data.results;
      if (category) {
        if (searchTerm === ''){
          setMovies(data.results);
        } else{
          filteredMovies = data.results.filter(movie =>
            movie.genre_ids.includes(parseInt(category))
          );
            setMovies(filteredMovies);
        } 
        
        const allSingleMovieIds = filteredMovies.map(movie => movie.id);
        setSingleMovie(allSingleMovieIds);
      }else{
        setMovies(data.results);

        const allSingleMovieIds = data.results.map((singleMovie) => singleMovie.id);
        setSingleMovie(allSingleMovieIds);
      }

    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }  
  }, []);

  
  const fetchSeries = useCallback(async (searchTerm, category = '') => {
    const apiKey = '6985974957546d752f3a2af821f9f623';
    var url;
    try {
      url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}`;
      
      if (category) {
        url += `&with_genres=${category}`;
      }
      if (searchTerm === ''){
        if (category){
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${category}&sort_by=popularity.desc`;
        } else{
          url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${apiKey}`;
        }
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      let filteredSeries = data.results;


      if (category) {
        if (searchTerm === ''){
          setSeries(data.results);
        } else{
          filteredSeries = data.results.filter(series =>
            series.genre_ids.includes(parseInt(category))
          );
            setSeries(filteredSeries);
        } 
        const allSingleSeriesIds = filteredSeries.map(serial => serial.id);
        setSingleSeries(allSingleSeriesIds);
      }else{
        setSeries(data.results);

        const allSingleSeriesIds = data.results.map((singleSeries) => singleSeries.id);
        setSingleSeries(allSingleSeriesIds);
      }
  
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  
  const fetchPopularMovies = async () => {
    const apiKey = '6985974957546d752f3a2af821f9f623';
  
    try {
      let url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPopularMovies(data.results);
  
      if (!selectedCategory) {
        const allSingleMovieIds = data.results.map((singleMovie) => singleMovie.id);
        setSingleMovie(allSingleMovieIds);
      }
      let url2 = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${apiKey}`;
  
      const response2 = await fetch(url2);
      if (!response2.ok) {
        throw new Error('Network response was not ok');
      }
      const data2 = await response2.json();
      setPopularSeries(data2.results);
      if (!selectedCategory) {
        const allSingleSeriesIds = data2.results.map((singleSeries) => singleSeries.id);
        setSingleSeries(allSingleSeriesIds);
      }
  
      try {
        const moviesData = await Promise.all(singleMovie.map((singleMovieId) => fetchSingleMovie(singleMovieId)));
        setSingleMovieFacts(moviesData);
      } catch (error) {
        console.error('Error fetching single movie data:', error);
      }
  
      try {
        if(searchTerm === ''){
          const seriesData = await Promise.all(singleSeries.map((singleSeriesId) => fetchSingleSeries(singleSeriesId)));
          setSingleSeriesFacts(seriesData);
        }

      } catch (error) {
        console.error('Error fetching single movie data:', error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching popular movies data:', error);
    }
  };


  const fetchSingleMovie = useCallback(async (movieId) => {
    const apiKey = '6985974957546d752f3a2af821f9f623';
    try {
      if (chooseType === 'movies'){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
        console.error('Error fetching single movie data:', error);
    }
  }, [chooseType]);

  const fetchSingleSeries = useCallback(async (seriesId) => {
    const apiKey = '6985974957546d752f3a2af821f9f623';
    try {
      if (chooseType === 'series'){
        const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
        console.error('Error fetching single movie data:', error);
    }
  }, [chooseType]);

  useEffect(() => {
    setIsLoading(true);
  }, [searchTerm, selectedCategory]);
  
  useEffect(() => {
    setIsLoading(false);
  }, [movies, series]);

  useEffect(() => {
    if (searchTerm === '' && selectedCategory === ''){
      fetchPopularMovies();
    } if (selectedCategory !== ''){
      fetchMovies(searchTerm, selectedCategory).finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (chooseType === 'movies') {
      fetchMovies(searchTerm, selectedCategory);
    } else if (chooseType === 'series') {
      fetchSeries(searchTerm, selectedCategory);
    }
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      if ((searchTerm || selectedCategory) && ((searchTerm !== prevSearchTerm) || (selectedCategory !== prevSelectedCategory))) {
        if (chooseType === 'movies') {
          await fetchMovies(searchTerm, selectedCategory);
          setIsLoading(false);
        } else if (chooseType === 'series') {
          await fetchSeries(searchTerm, selectedCategory);
          setIsLoading(false);
        }
      } else if ((!searchTerm && !selectedCategory)) {
        if (chooseType === 'movies') {
          setMovies(popularMovies);
        } else if (chooseType === 'series') {
          setSeries(popularSeries);
        }
        setIsLoading(false);
      }
    };
    
    const fetchSingleMoviesData = async () => {
      try {
        const moviesData = await Promise.all(singleMovie.map((singleMovieId) => fetchSingleMovie(singleMovieId)));
        setSingleMovieFacts(moviesData);
      } catch (error) {
        console.error('Error fetching single movie data:', error);
      }
      
      try {
        const seriesData = await Promise.all(singleSeries.map((singleSeriesId) => fetchSingleSeries(singleSeriesId)));
        setSingleSeriesFacts(seriesData);
      } catch (error) {
        console.error('Error fetching single movie data:', error);
      }
    };
  
    fetchMoviesData();
    fetchSingleMoviesData();
    setPrevSearchTerm(searchTerm);
    setPrevSelectedCategory(selectedCategory);
  }, [fetchMovies, fetchSeries, searchTerm, selectedCategory, 
      popularMovies, popularSeries, chooseType, singleMovie, 
      singleSeries, fetchSingleMovie, fetchSingleSeries, movies.length, 
      series.length, prevSearchTerm, prevSelectedCategory]);
  

    const handleInputChange = async (event) => {
      if (selectedCategory !== ''){
        setSearchTerm(event.target.value);
        if(chooseType === 'movies'){
          fetchMovies(searchTerm, selectedCategory).finally(() => setIsLoading(false));
        }else{
          fetchSeries(searchTerm, selectedCategory).finally(() => setIsLoading(false));
        }
      } if (selectedCategory === ''){
        setSearchTerm(event.target.value);
      } if (event.target.value === ''){
        fetchPopularMovies();
      }
    };



  const handleCategoryChange = async (category) => {
    const categoryNumber = category;
    setSelectedCategory(categoryNumber);
    setSearchTerm('');

    if (categoryNumber || categoryNumber === '') {
      setIsLoading(true);
      const apiKey = '6985974957546d752f3a2af821f9f623';
      var url, url2;

      try {
        if(categoryNumber === ''){
          if(chooseType === 'movies'){
            url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;
          }if(chooseType === 'series'){
            url2 = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${apiKey}`;
          }
        }else {
          if (chooseType === 'movies'){
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryNumber}&sort_by=popularity.desc`;
          } if (chooseType === 'series') {
            url2 = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${categoryNumber}&sort_by=popularity.desc`; 
          }
        }
        if (chooseType === 'movies'){
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          const allSingleMovieIds = data.results.map((singleMovie) => singleMovie.id);
          setSingleMovie(allSingleMovieIds);

          setMovies(data.results);

        } else{
          const response2 = await fetch(url2);

          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data2 = await response2.json();
  
          const allSingleSeriesIds = data2.results.map((singleSeries) => singleSeries.id);
          setSingleSeries(allSingleSeriesIds);
  
          setSeries(data2.results);
  
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const choose = (type) => {
    handleCategoryChange('');
    setChooseType(type);
    setSearchTerm('');
    setSameChooseType(prevValue => prevValue + 1);
  };


  return (
    <div className='cont'>
      <MovieCategories handleCategoryChange={handleCategoryChange} chooseType={chooseType} sameChooseType={sameChooseType}/>
      <div className='movies-series-container'>
        <button className={`movies ${chooseType === 'movies' ? 'active-choose' : ''}`} onClick={() => choose('movies')}>Movies</button>
        <button className={`series ${chooseType === 'series' ? 'active-choose' : ''}`} onClick={() => choose('series')}>TV series</button>
      </div>
      <div className="search-box">
        <input
          type="text" 
          id='input'
          autoComplete='off'
          className="input-search" 
          placeholder="Search for the title"
          onChange={handleInputChange}
          value={searchTerm} 
        />
      </div>
      {isLoading ? (
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      ) : ((movies.length === 0 && chooseType === 'movies') || (series.length === 0 && chooseType === 'series')) && !isLoading ? (
        <div>
          <svg width="100%" height="100%">
            <text x="50%" y="60%" textAnchor='middle'>
              {`No ${chooseType} available`}
            </text>
          </svg>
        </div>
      ) : chooseType === 'movies' && singleMovieFacts.length !== 0 ? (
        <MovieList movies={movies} popularMovies={popularMovies} singleMovieFacts={singleMovieFacts} />
      ) : (singleSeriesFacts.length !== 0 && (
        <SerialList series={series} popularSeries={popularSeries} singleSeriesFacts={singleSeriesFacts} />
      ))}
    </div>
  );
}

export default MovieSearch;
