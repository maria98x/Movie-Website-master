let searchdata= document.getElementById("search-data");
let searchinput = localStorage.getItem('searchinput')
localStorage.removeItem('searchinput')

let searchinputbtn = document.getElementById("search-input");
let searchbtn = document.getElementById("search-btn");

searchbtn.addEventListener("click", function () {
  localStorage.setItem("searchinput", searchinputbtn.value);
  location.href = "search.html";
});


searchResults(searchinput,searchdata);

function searchResults(searchinput ,  element) {
console.log("after")
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fa9abcd6439be44c12b955f7ac8c81c7&query=${searchinput}&page=1`).then(
      (res) => {
        element.innerHTML = res.data.results.map((mv) => 
             `
             <div class="col-lg-4 mb-3 ">
      <div class="hover hover-2 text-white rounded">
      <img  src="https://image.tmdb.org/t/p/original/${mv.poster_path}" alt="">
        <div class="hover-overlay" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${mv.id}></div>
        <div class="hover-2-content px-5 py-4">
          <h3 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">${mv.title} </span></h3>
          <p id="fav-btn" name=${mv.id} onclick="printfav()" class="hover-2-description text-uppercase my-5"><i class="far fa-heart"> Add to Favorites</i> &nbsp &nbsp &nbsp<i class="fas fa-plus"> Add to watch list</i></p>
        </div>
      </div>
    </div>
       `
          ).join("");
      }
      );
    }
   
  

