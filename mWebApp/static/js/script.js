
document.querySelector("#submit-btn").addEventListener("click", () => {
    document.querySelector(".cards").innerHTML = "";
    // Add movie in the search box
    let movie = document.querySelector("#search-field").value.toLowerCase();
    const apiKey = '6195ec56'
    // check if input is empty
    if (movie == "") {
        alert("Please type a movie title");
      }else{
          fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`)
              .then(res => {
                  return res.json()
              }).then(data => {
                let searchOutput = data.Search;
                if (data.res == "False") {
                  alert(data.Error);
                  document.querySelector("#search-field").value = "";
                }
                // get the values in the json data
                searchOutput.forEach(result =>{
                    let title = result.Title;
                    let poster = result.Poster;
                    let year = result.Year;
                  let type = result.Type;
                  let imdbID = result.imdbID;
                  let rating = 0.0;
                  fetch(`https://www.omdbapi.com/?t=${title}&r=json&apikey=${apiKey}`)
                  .then(res => res.json())
                    .then((out) => {
                      let titleData = out;
                      //console.log('Checkout this JSON! ', titleData.imdbRating);
                                rating = titleData.imdbRating;
                      //var csrf = $(this).attr('csrf');
                      //var post = $(this).attr('page-id');

                      const data2 = {
                        title: title,
                        year: year,
                        rate: rating,
                        searchQuery: movie,
                        imdbID: imdbID,
                        csrfmiddlewaretoken: 'csrf'
                      };
                      console.log(data2)
                      const jsonString = JSON.stringify(data2)
                      const xhr = new XMLHttpRequest();
                      xhr.open("POST", '');
                      xhr.setRequestHeader("Content-Type", "application/json");
                      xhr.send(jsonString)
                      // $.ajax({
                      //     url: '',
                      //     data: {
                      //       'title': title,
                      //       'year': year,
                      //       'rate': rating,
                      //       'searchQuery': movie,
                      //       'imdbID': imdbID,
                      //         //'csrfmiddlewaretoken': csrf
                      //         },
                      //     type: 'post',
                      //     cache: false,
                      //     success: function (returned_values) {
                      //       console.log('working');// do whatever you want after success!                
                      //         },
                      // });
                      //console.log('Checkout this JSON! ', rating);

                  // Elements
                    let cards = document.querySelector(".cards")
                    let cardDiv = document.createElement("div");
                    let movieImageBox = document.createElement("div")
                    let movieImage = document.createElement("div")
                    let movieDescription = document.createElement("div")
                    let movieTitle = document.createElement("h2")
                    let movieRate = document.createElement("p")
                    let rateSpan = document.createElement("span")
                    let rateIcon = document.createElement("i")
                    let rateNumber = document.createElement("span")
                    let moviePlot = document.createElement("p")
                    let movieTopic = document.createElement("p")
                    let typeSpan = document.createElement("span")
                    let topicGenre = document.createElement("p")
                    let genreSpan = document.createElement("span")
                    
                    // check if search matches the type/series of the movie
                    if (type == "movie" || type == "series") {
                      // append elements to child nodes
                        cards.appendChild(cardDiv)
                        cardDiv.appendChild(movieImageBox)
                        movieImageBox.appendChild(movieImage)
                        cardDiv.appendChild(movieDescription)
                        movieDescription.appendChild(movieTitle)
                        movieDescription.appendChild(movieRate)
                        movieDescription.appendChild(moviePlot)
                        movieRate.appendChild(rateSpan)
                        movieRate.appendChild(rateIcon)
                        movieRate.appendChild(rateNumber)
                        movieDescription.appendChild(moviePlot)
                        movieDescription.appendChild(movieTopic)
                        movieTopic.appendChild(typeSpan)
                        movieDescription.appendChild(topicGenre)
                        topicGenre.appendChild(genreSpan)

                        // Added classes to the elements
                        cards.classList.add( "cards")
                        cardDiv.classList.add("card");
                        movieImageBox.classList.add( "card-image-box")
                        movieImage.classList.add( "card-image")
                        movieDescription.classList.add( "card-description")
                        movieTitle.classList.add( "card-title")

                        // add movie image to the image element
                        movieImage.innerHTML = `<img alt='movie-image'src=${poster}/>`
                        // add title and year
                      movieDescription.innerHTML = `<h2>${title}, ${year}, ${rating}</h2>`
                      movieRate.innerHTML = `<h2>${movieRate}, ${type}</h2>`
                      
                      }
                      else{
                        console.log(`There is also a ${type} with the name: ${title}`);
                        document.querySelector("#search-field").value = "";
                      }  
                })
              })
              })
              
      }

});
