// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!

   // Get the parameters
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  // If these two parameters are not provided, return a simple String with an error message.
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }  
  }

  // If these two parameters are provided, return an Object, which includes two key-value pairs – numResults and movies.
  else {
  let moviesToReturn= {
      numResults: 0,
      movies: []
    }
    // Loop through the movies, for each one:
    for (let i=0; i < moviesFromCsv.length; i++) {
   
    // Store each post from the Reddit API in memory
    let movies = moviesFromCsv[i]

    // Only provide results for the given year and genre.
    if (movies.startYear == year && movies.genres.includes(genre) == true && movies.runtimeMinutes != `\\N`) {
    
  // Create a new object where the value of movies should be an Array of Objects containing the following details on each movie.
   let postObject = {
    primaryTitle: movies.primaryTitle,
    startYear: movies.startYear,
    genres: movies.genres
   }
      moviesToReturn.movies.push(postObject)
    }
  }
  // add the number of movies to the returned movies Object
  moviesToReturn.numResults = moviesToReturn.movies.length

  // a lambda function returns a status code and a string of data
  return {
  statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  body: JSON.stringify(moviesToReturn) // a string of data
  }
  }
} 
  