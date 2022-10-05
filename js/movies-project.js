"use strict"
// alert("Welcome to the movies project");

$(function(){
    /*API --- Application Programming Interface
    * a set of rules defining how applications and/ or devices can connect ot each other and communicate with one another
    *
    * REST means Representational State Transfer
    *A pattern of design principles for APIs
    *REST APIs communicate via HTTP requests
    *
    *In a REST API communication via HTTP reqeuests is used to perfomr the standard set of actions called CRUD
    * Create, Read, Update, Delete
    * HTTP only enables two kinds of request GET and POST
    *
    * REST API creates different request types
    *
    * JSON Javascript Object Notation - is not mandatory but is popular becuase
    * it is both human and machine-readable
    * */

//https://glitch.com/stingy-prickle-sternum
//URL constants:
    const booksURL = "https://stingy-prickle-sternum.glitch.me/books"


    const moviesURL = "https://stingy-prickle-sternum.glitch.me/movies"
    //
    // async function gitUserLastCommitAsync(username){
    //     let response = await fetch(`https://api.github.com/users/${username}/events/public`,{headers: {"Authorization": GITHUB_PROMISES_TOKEN}});
    //     response = await response.json();
    //     let events = response;
    //     const dateOfLastCommit = new Date(events[0].created_at);
    //     console.log(dateOfLastCommit)
    //     return dateOfLastCommit;
    // }
    //
    // https://api.themoviedb.org/3/movie/550?api_key=


    async function theMoviesDataBaseURL(){
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${J_TBD_TOKEN}`);
        response = await response.json();
        let events = response;
        console.log(events);
        return events;

    }

    theMoviesDataBaseURL();

    // $("#userNameInput").keyup(function(e){
//     console.log(e.key)
//     if (e.key === "Enter"){
//         // userName = $(this).val();
//         // usersLastCommitDate = gitUserLastCommitAsync(userName);
//         gitUserLastCommitAsync($(this).val()).then(response => $("#output").text(`${response}`))/
//     }
//
// })

    // $("#userFavMovie").keyup(function(e){
    //     console.log(e.key)
    //     if(e.key === "Enter"){
    //         theMoviesDataBaseURL($(this).val()).then(response =>$(#movies.a))
    //     }
    // })







//The R in CRUD is Read

    /*=====================FUNCTION THAT PRODUCES MOVIE CARDS=============*/

    function getMovies(){
        fetch("https://stingy-prickle-sternum.glitch.me/movies")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                $("#movies").empty();
                data.forEach((movie, index) => {
                    $("#movies").append(`
                    <div class="card col-4 mx-auto" data-id="${movie.id}" style="width: 18rem;">
                        <img src="${movie.poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Title: ${movie.title} (${movie.year})</h5>
                            <p class="card-text">${movie.plot}</p>
                            <button id="eddit${movie.id}" class="button btn-primary">Edit</button>
                            <button id="delete${movie.id}" class="button btn-danger">Delete</button>
                        </div>
                    </div>

                    `)
                    $(`#delete${movie.id}`).on("click", function () {
                        const deleteOptions = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "applications/json"
                            }
                        }
                        fetch(moviesURL + "/"+ movie.id, deleteOptions).then(getMovies)
                    });
                })
            });
        }//End of getMovies Function

    // getMovies();

    /*======================DELETE A MOVIE=========================*/

deleteMovie();
function deleteMovie() {
    fetch("https://stingy-prickle-sternum.glitch.me/movies")
        .then(response => response.json())
        .then(data => {
            console.log(data.id);

        })
}


//The C in CRUD is Create:

//In order to put Books in the Books array in the Json we have to make a POST request

    const bookToPost = {
        title: "Eleanor of Aquitaine",
        author: {
            firstName: "Ralph",
            lastName: "Turner"
        }
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookToPost)
    }

//Create a Read for the books

    function getBooks(){
        fetch(booksURL)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    getBooks();//We see an empty array thus far, because we havent posted the books array yet


//The below code will post the book to the books array in the json
// fetch(booksURL, postOptions).then(getBooks)

//The U in CRUD is Update
//With PUT and PATCH requests
//Well use PUT to replace the entire content
//Well use PATCH to modify only part of the entry

    let modification = {
        title: "Eleanor of Aquitaine: Queen of France, Queen of England"
    }

    const patchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modification)
    }

/*======================MODIFYING TITLES===================*/

    let modifyDown = {
        title: "Black Hawk Down"
    }

    let modifyTenet = {
        title: "Tenet"
    }

    const patchTenet = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifyTenet)
    }

    const patchDown = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifyDown)
    }

    fetch(moviesURL+ "/2", patchDown).then(getMovies);
    fetch(moviesURL+ "/3", patchTenet).then(getMovies);

//We need to grab the ID from the book we are modifying

// fetch(booksURL + "/1", patchOptions).then(getBooks);

//PUT Request
    /*=================ADDING A MOVIE FUNCTION==========================*/
    addAMovie()
    function addAMovie() {
        $("#userFavMovie").keyup(function (e) {
            if (e.key === "Enter") {
                let usersMovie = {
                    title: `${$(this).val()}`,

                }
                console.log(usersMovie)
                let putOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usersMovie)
                }
                fetch(moviesURL, putOptions).then(getMovies)
            }
        })
    }



   // let usersMovie = {
   //      title: `${$("#userFavMovie").val()}`,
   //
   //  }
   //
   //  const putOptions = {
   //      method: "PUT",
   //      headers: {
   //          "Content-Type": "application/json"
   //      },
   //      body: JSON.stringify(modification)
   //  }

//This will put the updated modifications to the 1st book
// fetch(booksURL +"/1", putOptions).then(getBooks);

//The D in CRUD is delete






    // fetch(booksURL +"/1", deleteOptions).then(getBooks);

//Loading Message: setTimeout

//Put the movies in cards: Use Bootstrap
//Recommend using Fetch
//Use Promises
//Form will be able to post a movie (similiar to how we posted a book)
//Feed into an object
//Event Driven Ajax Requests
//Then move on to DELETE
//we need the ID to delete something
//Where do you put the ID so when the user clicks on the delete button, it sends the iD to the request
//When printing on the screen set the ID of the movie to the button
//button data-id = 1
//After deleting something, edit will be similiar
//data atrribute on the div
    /*data property[#ofmovieID]

    * put the fetch inside of a function
    *
    *
    *
    *
    *
    *
    *
    *
    * */




})//End of document.ready

// $("#userNameInput").keyup(function(e){
//     console.log(e.key)
//     if (e.key === "Enter"){
//         // userName = $(this).val();
//         // usersLastCommitDate = gitUserLastCommitAsync(userName);
//         gitUserLastCommitAsync($(this).val()).then(response => $("#output").text(`${response}`))/
//     }
//
// })


// cat ~/.gitignore_global shows you your git ignore
// nano ~/.gitignore_global lets you add git ignore if you don’t have it