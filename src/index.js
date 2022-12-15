const API_KEY = 'c65b1581ed69fd3b6701ed620730aaec'
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day'
const list = document.querySelector('.list');
const modal = document.querySelector('.modal__film-card')
const body = document.body
const modalCloseBtn = document.querySelector('.modal__close')
const backdrop= document.querySelector('.backdrop')
console.log(body);


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
        return `<li class="film-item"> <img class="movie__poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" height="574px" width="395px" alt="">
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
    
    const filmCard = event.target.closest('.film-item')
     if (event.target === event.currentTarget)     
    {
        console.log('not film card');
        return
    }
    console.log(filmCard); 
    const filmId = filmCard.querySelector('.id').textContent     
    console.log(filmId);
   
    onFilmCardClick(filmId).then((data) => {
        body.classList.add('show-modal')
        window.addEventListener('keydown', onEscKeyPress)
        createFilmModalCard(data)       
    })
    
}
 async function onFilmCardClick(filmId) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${API_KEY}`)
        if (!response.ok) {
        throw new Error
    }
    return await response.json(); 
}
function createFilmModalCard(data) {
    const markup = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}
" alt="${data.original_title}" width="375px" height="478px">
    <div class="modal__info">
    <h1 class="modal__title"> ${data.title} </h1>
    <ul class="modal__statistic-list">
    <li class="modal__statistic-item"> Vote / Votes <span>${data.vote_average}/ ${data.vote_count}</span></li>
    <li class="modal__statistic-item"> Popularity <span>${data.popularity}</span></li>
    <li class="modal__statistic-item">Original Title <span>${data.original_title}</span></li>
    <li class="modal__statistic-item">Genre <span>${data.genres.map((item)=>{return item['name']})}</span></li>
    </ul>
    <h2 class="modal__subtitle">ABOUT</h2>
    <p class="modal__text">${data.overview}</p>
    <button class="modal__adding-button"> ADD TO WATCHED </button>
    <button class="modal__queue-button"> ADD TO QUEUE</button>    
   
    </div> `;
   
    modal.insertAdjacentHTML('beforeend', markup)
}

modalCloseBtn.addEventListener('click', onCloseModal)
function onCloseModal(event) {
    body.classList.remove('show-modal')
    modal.innerHTML = ""
    window.removeEventListener('keydown', onEscKeyPress)
}
backdrop.addEventListener('click', onBackdropClick)
 function onBackdropClick(event){
     if (event.currentTarget === event.target) {
         onCloseModal()
}
}
function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal()
    }
    
}

// const API_KEY = 'fbee7941f117d258bba2ad0706e433a4';
// const BASE_URL = "https//api.themoviedb.org/3/";
//   const refs = {
//     list: document.querySelector('list'),
//     body: document.body, 
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('backdrop__modal'),
//     backdrop: document.querySelector('backdrop'),
//     modalCard: document.querySelector('.modal__film-card'),
//   };

//   refs.list.addEventListener('click', onListClick)
//   refs.closeModalBtn.addEventListener('click', onCloseModal);
//   refs.backdrop.addEventListener('click', onBackdropClick);




// function onListClick(event) {   
//     const filmCard = event.target.closest('.film-item')
//      if (event.target === event.currentTarget)     
//     {
//         console.log('not film card');
//         return
//     }
//     console.log(filmCard); 
//     const filmId = filmCard.querySelector('.id').textContent     
//     console.log(filmId);
   
//     onFilmCardClick(filmId).then((data) => {
//         refs.body.classList.add('show-modal')
//         window.addEventListener('keydown', onEscKeyPress)
//         createFilmModalCard(data)       
//     })
    
// }
//  async function onFilmCardClick(filmId) {
//     const response = await fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`)
//         if (!response.ok) {
//         throw new Error
//     }
//     return await response.json(); 
// }

// function onBackdropClick(event) {
//   if (event.currentTarget === event.target) {
//     onCloseModal()
//   }
// };
// function onCloseModal() {
//   refs.body.classList.remove('show-modal');
// };

// function onEscKeyPress(event) {
//     if (event.code === 'Escape') {
//         onCloseModal()
//     }    
// };
// function onCloseModal(event) {
//   refs.body.classList.remove('show-modal');
//   refs.modalCard.innerHTML = "";
//   window.removeEventListener('keydown', onEscKeyPress);
// }

// function createFilmModalCard(data) {
// //     const markup = `<img src="https://image.tmdb.org/t/p/original/${data.poster_path}
// // " alt="${data.original_title}" width="375px" height="478px">
// //     <div class="modal__info">
// //     <h1 class="modal__title"> ${data.title} </h1>
// //     <ul class="modal__statistic-list">
// //     <li class="modal__statistic-item"> Vote / Votes <span>${data.vote_average}/ ${data.vote_count}</span></li>
// //     <li class="modal__statistic-item"> Popularity <span>${data.popularity}</span></li>
// //     <li class="modal__statistic-item">Original Title <span>${data.original_title}</span></li>
// //     <li class="modal__statistic-item">Genre <span>${data.genres.map((item)=>{return item['name']})}</span></li>
// //     </ul>
// //     <h2 class="modal__subtitle">ABOUT</h2>
// //     <p class="modal__text">${data.overview}</p>
// //     <button class="modal__adding-button"> ADD TO WATCHED </button>
// //     <button class="modal__queue-button"> ADD TO QUEUE</button>    
   
// //     </div> `;
   
//     refs.modalCard.insertAdjacentHTML('beforeend', markup)
// }