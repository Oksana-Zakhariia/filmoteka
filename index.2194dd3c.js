const t=document.querySelector(".list"),e=document.querySelector(".modal");(async function(){const t=await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=c65b1581ed69fd3b6701ed620730aaec");if(!t.ok)throw new Error;return await t.json()})().then((e=>{!function(e){const i=e.results.map((t=>{const e=t.original_title;return`<li> <img class="movie__poster" src="https://image.tmdb.org/t/p/original/${t.poster_path}" height="574px" width="395px" alt="">\n    <div class="movie__information"><h2 class="movie__title"> ${e.toUpperCase()}</h2></div>\n    <div class="movie__genres">\n     <div class="movie__genres-list"> <p >${t.genre_ids}</p>  </div>\n    \n    <span class="movie__year"> ${Number.parseInt(t.release_date)}\n    </span>\n    <div class="id" hidden> ${t.id} </div>\n    </div>\n</li>`})).join("");t.insertAdjacentHTML("beforeend",i)}(e),console.log(e)})).catch((t=>{console.log(t.statusText)})),t.addEventListener("click",(function(t){const i=t.target.parentNode.querySelector(".id").textContent;console.log(i),async function(t){const e=await fetch(`https://api.themoviedb.org/3/movie/${t}?api_key=c65b1581ed69fd3b6701ed620730aaec`);if(!e.ok)throw new Error;return await e.json()}(i).then((t=>{console.log(t),function(t){const i=`<img src="https://image.tmdb.org/t/p/original/${t.poster_path}\n" alt="${t.original_title}" width="375px" height="478px">\n    <div class="modal__info">\n    <h1 class="modal__title"> ${t.title} </h1>\n    <ul class="modal__statistic-list">\n    <li class="modal__statistic-item"> Vote / Votes <span>${t.vote_average}/ ${t.vote_count}</span></li>\n    <li class="modal__statistic-item"> Popularity <span>${t.popularity}</span></li>\n    <li class="modal__statistic-item">Original Title <span>${t.original_title}</span></li>\n    <li class="modal__statistic-item">Genre <span>${t.genres.map((({name:t})=>{Object.values(t)}))}</span></li>\n    </ul>\n    <h2 class="modal__subtitle">ABOUT</h2>\n    <p class="modal__text">${t.overview}</p>\n    <button class="modal__adding-button"> ADD TO WATCHED </button>\n    <button class="modal__queue-button"> ADD TO QUEUE</button>\n    </div> `;e.insertAdjacentHTML("beforeend",i)}(t)}))}));
//# sourceMappingURL=index.2194dd3c.js.map
