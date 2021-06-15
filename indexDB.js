const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
 })

try{
    mongoose.connect('mongodb+srv://lara123:lara123@cluster0.dx91w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}, function(){
        console.log("Connected to MongoDB ");
    })
} catch(error){
    console.log(error.message);
}

var MovieSchema = mongoose.Schema({
  title: {
      type: String
  },
  year: {
      type: Number
  },
  rating:{
      type: Number,
      default:4
  }
});

var Movies = mongoose.model('movies', MovieSchema);

app.get("/movies/read", function (req, res) {
    const MoviesReaded = await Movies.save()
    res.send({ status: 200, message: MoviesReaded });
  })

app.post("/movies/add", function(req, res) {
    const tlt = req.query.title;
    const y = req.query.year;
    const rat = req.query.rating;

    if(tlt == null || y == null || y.length != '4' || isNaN(y))
    {
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    else {
        if(rat == null){
        mov=new Movies ({title:tlt, year:y, rating:4})
        }
        else{
            mov=new Movies ({title:tlt, year:y, rating:r})
        }
    }
    const MoviesAdded = await movie.save()
    res.send({ status: 200, message: MoviesAdded});
})

