
  function printfav(element){
            var movieID = element.getAttribute("name");
            console.log(movieID)
            appendToStorage('movieid',movieID);
      }
      
      function appendToStorage(name, data){
        var old = localStorage.getItem(name);
        if(old === null){
         
          localStorage.setItem(name, data);
          console.log("first",old)
        }
        else if (old.includes(data)){
          old=old.replace(data," ");
          localStorage.setItem(name, old.trim() );
          console.log("delete",old)
        }
        else{
          localStorage.setItem(name, old +" "+ data);
          console.log("add",old)
        }
        }

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
              console.log(res)
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
              document.getElementById("rate").innerHTML = ` <i class="fas fa-star"></i> ${res.data.vote_average} / 10`;
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
    