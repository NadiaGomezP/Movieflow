const API_KEY = "api_key=1a8016c3880600b346675274804359e0";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const API_URL = BASE_URL + "/discover/movie?sort_by=popular.desc&" + API_KEY;
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const form = document.querySelector("#form")
const search = document.querySelector("#search");
const movies = document.querySelector(".movies");

const getMovies = (url) => {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .catch(err => {
            console.error(err);
            return [];
        });
}


const showMoviesFromJson = async () => {
    try {
        const response = await fetch('./public/json/movies.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        return [];
    }
};

const fetchData = async () => {
    const jsonMovies = await showMoviesFromJson();
    showMovies(jsonMovies);
};

fetchData();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if (searchTerm) {
    const apiMovies = await getMovies(SEARCH_URL + "&query=" + searchTerm);
        showMovies(apiMovies);
    } else {
    const jsonMovies = await showMoviesFromJson();
        showMovies(jsonMovies);
    }
});


const showMovies = (data) => {
    movies.innerHTML = '';
    data.forEach(movie => {
        const { id, title, poster_path } = movie;
        
        const imageUrl = poster_path ? IMG_URL + poster_path : './img/poster-placeholder.jpg';

        const movieEl = `<li>
            <img src="${imageUrl}">
            <h2>${title}</h2>
            <button class="details-button" data-movie-id="${id}">Details</button>
        </li>`;
        movies.innerHTML += movieEl;
    });

    const detailsButtons = document.querySelectorAll('.details-button');
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const movieId = button.getAttribute('data-movie-id');
            window.location.href = `movie_details.html?id=${movieId}`;
        });
    });
};

