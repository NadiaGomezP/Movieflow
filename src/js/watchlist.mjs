const IMG_URL = "https://image.tmdb.org/t/p/w500";


document.getElementById('watchlist-button').addEventListener('click', function() {
  window.location.href = 'watchlist.html';});

const displayWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.querySelector('.watchlist');

   watchlistContainer.innerHTML = '';

    if (watchlist.length === 0) {
        const noMoviesMessage = document.createElement('h2');
        noMoviesMessage.textContent = 'No movies added to Watchlist';
        watchlistContainer.appendChild(noMoviesMessage);
        noMoviesMessage.setAttribute("style", "text-align:center;");
        return; 
    }

    watchlist.forEach((movie, index) => {
      const movieElement = document.createElement('div');

        const posterElement = document.createElement('img');
        posterElement.src = movie.poster_path ? IMG_URL + movie.poster_path : './img/poster-placeholder.jpg';
        posterElement.alt = 'Movie Poster';
        movieElement.appendChild(posterElement);

        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;
        movieElement.appendChild(titleElement);

        const starsElement = document.createElement('div');
        starsElement.classList.add('stars');

        const filledStars = calculateFilledStars(movie.popularity);
        console.log(filledStars)

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = i < filledStars ? '★' : '☆';
            starsElement.appendChild(star);
        }

        movieElement.appendChild(starsElement);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            removeFromWatchlist(index);
            displayWatchlist();
        });
        movieElement.appendChild(deleteButton);

        watchlistContainer.appendChild(movieElement);
    });
};


const removeFromWatchlist = (index) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); 
};

const calculateFilledStars = (popularity) => {
    if (isNaN(popularity) || popularity <= 0) {
        // If popularity is not a valid number or less than or equal to 0, return 0 filled stars
        return 0;
    }

    const maxPopularity = 10;
    const filledStars = (popularity / maxPopularity) * 5; // Calculate stars out of 5
    return filledStars;
};

const clearWatchlistForm = document.getElementById('clearWatchlistForm');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submitBtn');

clearWatchlistForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value;
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlist.length === 0) {
        alert('Watchlist is already empty.');
        return;
    }

    localStorage.removeItem('watchlist');
    alert(`Watchlist has been sent to ${email}.`);
    window.location.href = 'watchlist.html';
});

document.addEventListener('DOMContentLoaded', function () {
  if (submitButton) {
      const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      if (watchlist.length === 0) {
          submitButton.disabled = true;
      }
  }
});

displayWatchlist();