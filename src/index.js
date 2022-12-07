const API_KEY = 'c65b1581ed69fd3b6701ed620730aaec'
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day'
const list = document.querySelector('.list')

// https://api.themoviedb.org/3/trending/movie/day?api_key=c65b1581ed69fd3b6701ed620730aaec
async function moviesApi() {
   const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`)
    if (!response.ok) {
        throw new Error
    }
    return await response.json(); 
}
moviesApi().then(data => { createMarkup(data)
    console.log(data)
}).catch(error => {
    console.log(error.statusText);
})
function createMarkup(data) {
    const markup = data.results.map((item) => {
        const name = item.original_title
        return `<li> <img class="movie__poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" height="574px" width="395px" alt="">
    <div class="movie__information"><h2 class="movie__title"> ${name.toUpperCase()}</h2></div>
    <div class="movie__genres">
     <div class="movie__genres-list"> <p >${item.genre_ids}</p>  </div>
    
    <span class="movie__year"> ${Number.parseInt(item.release_date)}
    </span>
    <div class="id" hidden> ${item.id} </div>
    </div>
</li>`
    }).join("")
    list.insertAdjacentHTML('beforeend', markup)
}
list.addEventListener('click', onListClick)
 
function onListClick(event) {
   
    const filmId= event.target.parentNode.querySelector('.id').textContent
    console.log(filmId);
    onFilmCardClick().then((data)=>{console.log(data);})
    
}
 async function onFilmCardClick(filmId) {
    const response = fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}`)
        if (!response.ok) {
        throw new Error
    }
    return await response.json(); 
    }