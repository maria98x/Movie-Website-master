
let url = "https://api.themoviedb.org/3/movie/popular?api_key=fa9abcd6439be44c12b955f7ac8c81c7"

axios.get(url)
  .then(res => {
    console.log(res.data);
    document.getElementById("movies-").innerHTML =`
    <div class="col-10">
  <div class="w-75">
    <img src=  "https://image.tmdb.org/t/p/original/${res.data.results[0].poster_path}" class="img-responsive w-75 myImage" alt="...">
    </div>
    </div>
    <div class="col-2">
      <h5 class="card-title">${res.data.results[0].title}</h5>
         <span class="movie_info">${res.data.results[0].release_date.split("-")[0]}</span><br>
         <span class="movie_info float-right"><i class="fas fa-star"></i> ${res.data.results[0].vote_average} / 10</span>
    </div>
  

    
    `
  

   
   
  });


// popMovie();
function popMovie(){
  axios.get(url)
  .then(res => {
    console.log(res.data);
    document.getElementById("movies-data").innerHTML = res.data.results.map ((mv) => `
    <div class="col-sm">

  <div class="card movie_card">
    <img src=  "https://image.tmdb.org/t/p/original/${mv.poster_path}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mv.title}</h5>
         <span class="movie_info">${mv.release_date.split("-")[0]}</span><br>
         <span class="movie_info float-right"><i class="fas fa-star"></i> ${mv.vote_average} / 10</span>
    </div>
  </div>
</div>
    
    `
      ).join("");

   
   
  });
}

let horror = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=27"
let horrorid = document.getElementById("horror-movies")
let action = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=28"
let actionid = document.getElementById("action-movies")
let comedy = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=35"
let comedyid = document.getElementById("comedy-movies")
let drama = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=18"
let dramaid = document.getElementById("drama-movies")
let fantasy = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=14"
let fantasyid = document.getElementById("fantasy-movies")
let history = "https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=36"
let historyid = document.getElementById("history-movies")
movieGen(horrorid,horror);
movieGen(actionid,action);
movieGen(comedyid,comedy);
movieGen(dramaid,drama);
movieGen(fantasyid,fantasy);
movieGen(historyid,history);

function movieGen(id,genURL){
  axios.get(genURL)
  .then(res => {
    id.innerHTML = res.data.results.map ((mv) => ` <div class="col-lg-4 mb-3 ">
    <div class="hover hover-2 text-white rounded"><img src="https://image.tmdb.org/t/p/original/${mv.poster_path}" alt="">
      <div class="hover-overlay"></div>
      <div class="hover-2-content px-5 py-4">
        <h3 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">${mv.title} </span></h3>
        <p class="hover-2-description text-uppercase my-5"><i class="far fa-heart"> Add to Favorites</i> &nbsp &nbsp &nbsp<i class="fas fa-plus"> Add to watch list</i></p>
      </div>
    </div>
  </div>
    `
      ).join("");

   
   
  });
}







