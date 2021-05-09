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
 console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  // create a new object to hold the count and movies data
  // let moviesToReturn = {}
  
  // start with an empty array for the movies
  // returnValue.movies = []
  
    let moviesToReturn= {
      numResults: 0,
      movies: []
    }
 
  for (let i=0; i < moviesFromCsv.length; i++) {
    let movies = moviesFromCsv[i]
    
    moviesToReturn.movies.push(movies)
    
  }

  
  // add the number of listings to the returned listings Object
  moviesToReturn.numResults = moviesToReturn.movies.length
  

  // a lambda function returns a status code and a string of data
  return {
  statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  body: JSON.stringify(moviesToReturn) // a string of data

  }
} 
  