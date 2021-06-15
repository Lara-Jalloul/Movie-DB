const express = require('express')
const app = express()
const port = 3000

//connect to MongoDB
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost::27017/MovieDB",{useNewUrlParser: true, useUnifiedTopology: true});
// var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// mongoose.connection.on("connected", ()=>{
//     console.log("Connected to MongoDB using MongooseJS");
// })


app.get('/', (req, res) => {
   res.send('ok')
})
  
app.listen(port, () => {
   console.log(`listening at http://localhost:${port}`)
})

app.get('/test', (req, res) => {
   res.send('{status:200, message:"ok"}')
})

app.get('/time', (req, res) => {
   let date_ob = new Date();
   let hours = date_ob.getHours();
   let seconds = date_ob.getSeconds();
   res.send('{status:200, message:' + hours +":" + seconds + '}')
})

app.get('/hello/:userID', function (req, res) {
    res.send('{status:200, message:Hello,'+req.params.userID+'}')
})

app.get('/hello', function (req, res) {
    res.send('{status:200, message:Hello"}')
})

app.get('/search', function (req, res) {
const data = req.query.s;
  if (data != null)
    res.send('{status: 200,message: "ok",data:' + data +'}')
  else{
    res.send('{status: 500,error: true,message: "you have to provide a search"}')
  }
})

app.get("/movies/read", function (req, res) {
  res.send({ status: 200, message: movies });
})

app.put("/movies/update/:movieID", function (req, res) {

    if(req.params.movieID < 0 || req.params.movieID > movies.length){
        res.status(404).send("The movie " + req.params.movieID + " does not exist");
      } 
      else if((req.query.title == "" && req.query.year == "") || (typeof req.query.title === "undefined" && typeof req.query.year === "undefined")){
          movies[req.params.movieID] = {
              title: movies[req.params.movieID].title,
              year: movies[req.params.movieID].year,
              rating: req.query.rating,
          };
      } 
      else if((req.query.title == "" && req.query.rating == "") || (typeof req.query.title === "undefined" && typeof req.query.rating === "undefined")){
          movies[req.params.movieID] = {
              title: movies[req.params.movieID].title,
              year: req.query.year,
              rating: movies[req.params.movieID].rating,
          };
      } 
      else if((req.query.year=="" && req.query.rating == "") || (typeof req.query.year === "undefined" && typeof req.query.rating==="undefined")){
          movies[req.params.movieID] = {
              title: req.query.title,
              year: movies[req.params.movieID].year,
              rating: movies[req.params.movieID].rating,
          };
      } 
      else if(req.query.title == "" || typeof req.query.title === "undefined"){
          movies[req.params.movieID] = {
              title: movies[req.params.movieID].title,
              year: req.query.year,
              rating: req.query.rating,
          };
      } 
      else if(req.query.year == "" || typeof req.query.year === "undefined") {
          movies[req.params.movieID ] = {
              title: req.query.title,
              year: movies[req.params.movieID].year,
              rating: req.query.rating,
          };
      } 
      else if(req.query.rating == "" || typeof req.query.rating === "undefined"){
          movies[req.params.movieID] = {
              title: req.query.title,
              year: req.query.year,
              rating: movies[req.params.movieID].rating,
          };
      } 
      else{
          movies[req.params.movieID ].title = req.query.title;
          movies[req.params.movieID ].year = req.query.year;
          movies[req.params.movieID ].rating = req.query.rating;
      }
      res.status(200).send(movies);
    });

app.delete("/movies/delete/:movieID", function (req, res) {
    const m= req.params.movieID;
    if(m>=0 && m <= movies.length )
    {
        movies.splice(m,1);
        res.send({status:200, message:movies})
    } else{
        res.send({status:404, error:true, message:'the movie '+m+ ' does not exist'});
    }
})

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/movies/read/by-date', (req, res) => {
    movies.sort( (a, b) => a.year - b.year)
    res.send({ status: 200, message: movies })
})

app.get('/movies/read/by-rating', (req, res) => {
    movies.sort( (a, b) => b.rating - a.rating)
    res.send({ status: 200, message: movies })
})

app.get('/movies/read/by-title', (req, res) => {
    movies.sort( (a, b) => {
       if(a.title< b.title) return -1;
       if (a.title>b.title) return 1;
       return 0;
    })
    res.send({ status: 200, message: movies })
})

app.get('/movies/read/id/:movieID',(req,res) => {
    let r = req.params.movieID;
    if(r>=0 && r <= movies.length ) {
        res.send({status:200, data:movies[r]})
    }
    else {
        res.send({status:404, error:true, message:'the movie '+r+ ' does not exist'})
    }
})

app.post("/movies/add", function(req, res) {
    const tlt = req.query.title;
    const y = req.query.year;
    const rat = req.query.rating;

    if(tlt == null || y == null || y.length != '4' || isNaN(y))
    {
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    else{
        if(rat == null)
        {
        movies.push({title:tlt , year:y , rating:4});
        }
        else{
            movies.push({title:tlt , year:y , rating:rat});
        }
        res.send({ status: 200, message: movies});
    }
})
