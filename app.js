const API_KEY = '5ecc7cc3-a04b-4579-9258-796ddbe998e3';
const API_URL_POPULAR =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      'X-API-KEY': '5ecc7cc3-a04b-4579-9258-796ddbe998e3',
      'Content-Type': 'application/json',
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function showMovies(data) {
  const moviesElement = document.querySelector('.movies');

  document.querySelector('.movies').innerHTML = '';

  document.getElementById('search').focus();

  data.films.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
    <div class="movie-cont">    
      <img src="${movie.posterUrlPreview}" 
      class="movie-img" 
      alt="${movie.nameRu} />
      <div class="movie-inner"></div>
      </div>
      <div class="movie-info">
      <h3 class="movie-title">${movie.nameRu}</h3>
      <div class="movie-duration">Продолжительность: ${movie.filmLength} </div>
      <div class="movie-year">${movie.year} год</div>
        ${
          movie.rating &&
          `
      <div class="movie-rating--${getClassByRate(
        movie.rating
      )}">Рейтинг IMDb: ${movie.rating}</div> </div>
    `
        }
        </div>
    `;
    moviesElement.appendChild(movieElement);
  });
}

const form = document.querySelector('form');
const search = document.querySelector('.search');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = '';
  }
});
