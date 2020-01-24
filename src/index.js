/**
 * es6 modules and imports
 */
//import our javascript here:
import sayHello from './hello';
sayHello('World');


//jQuery import:
const $ = require("jquery");
// import $ from ("jquery");

/**
 * require style imports
 */




const {getMovies, addMovie, editMovie, deleteMovie} = require('./api.js');

//appends to html
const appendMovie = (movie) =>{
  const {id, title, rating} = movie;
  $("#movie-list").append(`<div id="${id}" class="card-deck card-align"><div class="row"><div class="card col"><div class="card-body"><h5 class="card-title">${title}</h5><p class="card-text">rating: ${rating}</p><br><button class="edit btn btn-outline-info btn-sm" value="${title}-${rating}-${id}">✏️</button><button type="button" value="${id}" class="delete btn btn-outline-danger btn-sm">🗑</button></div></div></div></div>`);
}

//reloading list
const readAndRenderMovies = () => {
  getMovies().then((movies) => {
    $("#loading").hide();
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      // $("#movie-header").html("Movies");
      $("#movie-list").append(`<div id="${id}" class="card-deck card-align"><div class="row"><div class="card col"><div class="card-body"><h5 class="card-title">${title}</h5><p class="card-text">rating: ${rating}</p><br><button class="edit btn btn-outline-info btn-sm" value="${title}-${rating}-${id}">✏️</button><button type="button" value="${id}" class="delete btn btn-outline-danger btn-sm">🗑</button></div></div></div></div>`);
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      $(".hidden-on-load").css("display", "inline-block");
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
}
readAndRenderMovies();

//API Post for adding Movies ---------------------------/

$(':radio').click(function() {
  console.log (this.value);
  $('#rating').val(this.value);
});
$('#add-movie-btn').click(function () {
  console.log('hello!');
  let movieTitle = $('#movie-title').val();
  let rating = $('#rating').val();
  console.log(movieTitle);
  console.log(rating);

  //adds to JSON file
  const newMovie = {title: movieTitle, rating: rating};
  console.log(newMovie);
  addMovie(newMovie)
      .then(function (movie) {
        appendMovie(movie)

        $('#movie-title').val("");
        //  add something in here to clear out the stars after submit is clicked
      })
});


//End of api for adding movies------------------------/

//delete button click function:
$("#movie-list").on('click', '.delete', function(event){
  let id = $(event.target).val();
  $("#loading").show();
  deleteMovie(id).then(function(){
    $("#movie-list").html("");
    readAndRenderMovies();
  });
});

//EDIT BUTTON AND FUNCTIONS TO SAVE NEW INPUTS

$(document).on('click', '.edit', function(event){
  event.preventDefault();
  let movie = $(event.target).val();
  console.log(movie);
  // gets title, rating, id string and splits into array
  movie = movie.split('-');
  console.log(movie);
  $(".edit-form").show();
  //populates edit movie input with movie title
  $("#edit-input").val(movie[0]);

// });

// new star rating to log before having to click save
  $(':radio').click(function() {
    console.log (this.value);
    $('#edit-rating').val(this.value);
  });

// separate function for when Save Btn clicked :
  $(document).on('click', '#save-movie', function (e) {
    e.preventDefault();
    let editTitle = $("#edit-input").val();
    let newRating = $('#edit-rating').val();
    console.log(editTitle);
    console.log(newRating);
    if((editTitle === '') || newRating === ''){
      alert('OOPS! No values were entered. Please enter movie information and try again.')
    } else {
//CREATE OBJECT AND ADD TO JSON
      const editedMovie = {title: editTitle, rating: newRating};
      $(".edit-form").hide();
      $("#loading").show();
      editMovie(movie[2], editedMovie).then(function () {
        $("#movie-list").html("");
        console.log("save button clicked");
        readAndRenderMovies();
      });
    }
  }); // ending function for edit button to include id of selected movie
});
