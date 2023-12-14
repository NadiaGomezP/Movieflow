
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const API_KEY = "api_key=1a8016c3880600b346675274804359e0";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MOVIE_DETAILS_URL = BASE_URL + "movie/" + movieId + "?" + API_KEY;

const movieDetailsContainer = document.querySelector('.movie-details');

const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieTagline = document.getElementById('movieTagline');
const movieReleaseDate = document.getElementById('movieReleaseDate');
const movieOverview = document.getElementById('movieOverview');
const popularityStars = document.getElementById('popularityStars'); // Added this line
const getMovieDetails = () => {
    fetch(MOVIE_DETAILS_URL)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    displayMovieNotAvailable();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then((data) => {
            if (Object.keys(data).length === 0) {
                displayMovieNotAvailable();
            } else {
                showMovieDetails(data);
            }
        })
        .catch(err => { 
            console.error("Error fetching movie details:", err);
        });
}

const showMovieDetails = (movie) => {
    const { title, poster_path, overview, tagline, release_date, popularity } = movie;

    const imageUrl = poster_path ? IMG_URL + poster_path : './img/poster-placeholder.jpg';

    moviePoster.src = imageUrl;
    movieTitle.textContent = title;
    movieTagline.textContent = tagline;
    movieReleaseDate.textContent = release_date;
    movieOverview.textContent = overview;

    const filledStars = calculateFilledStars(popularity);

    displayPopularityStars(filledStars);
    
}

const calculateFilledStars = (popularity) => {
    const maxPopularity = 10;
    const filledStars = (popularity / maxPopularity) * 5; 
    return filledStars;
};

const displayMovieNotAvailable = () => {
    movieDetailsContainer.innerHTML = '<h1 class="movie-not-available">This movie is currently not available</h1>';
}
const displayPopularityStars = (filledStars) => {
    popularityStars.innerHTML = '';
     for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = i < filledStars ? '★' : '☆';
        popularityStars.appendChild(star);
    }
};

const addToWatchlist = () => {
    const movieId = urlParams.get('id');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (!watchlist.some(movie => movie.id === movieId)) {
        // Fetch the movie details to get the popularity value
        fetch(MOVIE_DETAILS_URL)
            .then(response => response.json())
            .then(movieDetails => {
                const { title, poster_path, popularity } = movieDetails;
                watchlist.push({
                    id: movieId,
                    title: title,
                    poster_path: poster_path,
                    popularity: popularity, // Include the popularity value
                });
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                alert('Movie successfully added to watchlist!');
            })
            .catch(err => {
                console.error("Error fetching movie details:", err);
                alert('Failed to fetch movie details. Please try again.');
            });
    } else {
        alert('This movie is already in the watchlist!');
    }
};

document.getElementById('watchlistButton').addEventListener('click', addToWatchlist);

getMovieDetails();

