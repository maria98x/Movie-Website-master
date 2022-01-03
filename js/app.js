//localStorage.clear()
var str = "hi my name is "
var wordCount = str.match(/(\w+)/g).length;

let url =
  "https://api.themoviedb.org/3/movie/popular?api_key=fa9abcd6439be44c12b955f7ac8c81c7";

popMovie();
function popMovie(){
  axios.get(url)
  .then(res => {
    document.getElementById("movies-data").innerHTML = res.data.results.map ((mv) => `
    <div class="col-lg-4 mb-3 ">
    <div class="hover hover-2 text-white rounded"><img  src="https://image.tmdb.org/t/p/original/${mv.poster_path}" alt="">
      <div class="hover-overlay" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${mv.id}></div>
      <div class="hover-2-content px-5 py-4">
        
        <p id="fav-btn" name=${mv.id} onclick="printfav(this)" class="hover-2-description text-uppercase my-5"><i class="far fa-heart"> Add to Favorites</i> &nbsp &nbsp &nbsp<i class="fas fa-plus"> Add to watch list</i></p>
      </div>
    </div>
  </div>

    `
      ).join("");

  });
}

let horrorid = document.getElementById("horror-movies");
let actionid = document.getElementById("action-movies");
let comedyid = document.getElementById("comedy-movies");
let dramaid = document.getElementById("drama-movies");
let fantasyid = document.getElementById("fantasy-movies");
let historyid = document.getElementById("history-movies");

let favbtn = document.getElementById("fav-btn");
let listbtn = document.getElementById("list-btn");

movieGen(horrorid, 27);
movieGen(actionid, 28);
movieGen(comedyid, 35);
movieGen(dramaid, 18);
movieGen(fantasyid, 14);
movieGen(historyid, 36);
//------ display movies categories------ 
function movieGen(id, cat) {
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&with_genres=${cat}`
    )
    .then((res) => {
      id.innerHTML = res.data.results
        .map(
          (mv) => `
     <div class="col-sm-4 mb-3 ">
    <div class="hover hover-2 text-white rounded"><img  src="https://image.tmdb.org/t/p/original/${mv.poster_path}" alt="">
      <div class="hover-overlay" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${mv.id}></div>
      <div class="hover-2-content px-5 py-4">
        <h3 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">${mv.title} </span></h3>
        <p id="fav-btn" name=${mv.id} onclick="printfav(this)" class="hover-2-description text-uppercase my-5"><i class="far fa-heart"> Add to Favorites</i> &nbsp &nbsp &nbsp<i class="fas fa-plus"> Add to watch list</i></p>
      </div>
    </div>
  </div>
    `
        )
        .join("");
    });
}
//---------modal--------
document.addEventListener("DOMContentLoaded", function () {
  var myModal = document.getElementById("exampleModal");
  myModal.addEventListener("show.bs.modal", function (event) {
    var button = event.relatedTarget;
    var movieID = button.getAttribute("id");

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=fa9abcd6439be44c12b955f7ac8c81c7&append_to_response=videos`
      )
      .then((res) => {
        console.log(res);
        document
          .getElementById("modal-img")
          .setAttribute(
            "src",
            `https://image.tmdb.org/t/p/original/${res.data.poster_path}`
          );
        document.getElementById("title").innerHTML = res.data.title;
        document.getElementById("date").innerHTML =
          res.data.release_date.split("-")[0];
        console.log(res.data);
        document.getElementById("min").innerHTML = `${res.data.runtime} min`;
        var genres = res.data.genres.map(function (item) {
          return item["name"];
        });
        document.getElementById(
          "rate"
        ).innerHTML = ` <i class="fas fa-star"></i> ${res.data.vote_average} / 10`;
        document.getElementById("all-gen").innerHTML = genres;
        document.getElementById("overview").innerHTML = res.data.overview;
        document
          .getElementById("imdb")
          .setAttribute(
            "onclick",
            `window.location.href = 'https://www.imdb.com/title/${res.data.imdb_id}'`
          );
        //------ movies trailer
        var moviekeys = [];
        res.data.videos.results.map(function (mov) {
          if (mov["type"] == "Trailer") {
            moviekeys.push(mov["key"]);
          }
        });

        document.getElementById("movie-trailer").innerHTML = moviekeys
          .map(
            (moviekeys) =>
              `
      <div class="col"><div class=" embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${moviekeys}?rel=0" allowfullscreen></iframe>
    </div></div>
      `
          )
          .join("");
      });
  });
});





  

  