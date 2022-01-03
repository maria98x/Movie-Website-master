var movieids = localStorage.getItem('movieid').split(" ");

     if (movieids!=null){

    for(let i=0; i<movieids.length; i++){
        axios.get(`https://api.themoviedb.org/3/movie/${movieids[i]}?api_key=fa9abcd6439be44c12b955f7ac8c81c7`).then(
            (res) => {
                document.querySelector("#fav-data").innerHTML+=( `
                <div class="col-lg-4 mb-3 ">
    <div class="hover hover-2 text-white rounded"><img  src="https://image.tmdb.org/t/p/original/${res.data.poster_path}" alt="">
      <div class="hover-overlay"  id=${res.data.id}></div>
      <div class="hover-2-content px-5 py-4">
        <h3 class="hover-2-title text-uppercase font-weight-bold mb-0"> <span class="font-weight-light">${res.data.title} </span></h3>
        <p id="fav-btn" class="hover-2-description text-uppercase my-5"><i class="fas fa-trash" onclick=deletemovie(${res.data.id}) id="deletemv"> </i></p>
      </div>
    </div>
  </div>
          `);
        }
     
        )}
       
    }

    function deletemovie(mvid){
var old = localStorage.getItem('movieid')
old=old.replace(mvid," ");
localStorage.setItem('movieid', old.trim() );
location.reload()
    }