import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "14500a59d223db436d88eeb50c221361"; 
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      {/* NavBar */}
      <nav className="navbar">
        <div className="left">
          <img className="logo" src="src/assets/bks-logo.png" alt="Logo" />
          <input
            className="searchbar"
            type="text"
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
          />
        </div>
        <div className="right">
          <h4 className="location">Chennai ▼</h4>
          <button className="sign-in">Sign in</button>

          {/* Hamburger Menu */}
          <label className="burger" htmlFor="burger">
            <input type="checkbox" id="burger" />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </nav>

      {/* NavBar-2 */}
      <nav className="second-nav">
        <div className="s-left">
          <p>Movies</p>
          <p>Stream</p>
          <p>Events</p>
          <p>Plays</p>
          <p>Sports</p>
          <p>Activities</p>
        </div>
        <div className="s-right">
          <p>List Your Show</p>
          <p>Corporates</p>
          <p>Offers</p>
          <p>Gift Cards</p>
        </div>
      </nav>

      {/* Movie Section */}
      <div className="main">
        <h1>Popular Movies</h1>

        {isLoading && <p>Loading movies...</p>}
        {error && <p>Sorry, something went wrong: {error.message}</p>}

        <div className="movie-gallery">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;