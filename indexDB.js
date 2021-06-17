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
      type: Number,
      min: 1000,
      max:9999
  },
  rating:{
      type: Number,
      default:4
  }
});

var Movies = mongoose.model('movies', MovieSchema);

app.get("/movies/read", function (req, res) {
    const MoviesReaded = await Movies.find()
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

const users = [
    { username: 'Lara', password: 123},
    { username: 'Rayane', password: 456},
    { username: 'Ahmad', password: 789},
]

app.post("/users/add", function(req, res) {
    const name = req.query.username;
    const pass = req.query.password;

    if(name == null || pass == null || pass.length != '3' || isNaN(pass))
    {
        res.send({status:403, error:true, message:'you cannot create a user without providing a username and a password'})
    }
    else{
        users.push({username:name , password:pass});
        res.send({ status: 200, message: users});
    }
})

app.delete("/users/delete/:userID", function (req, res) {
    const u= req.params.userID;
    if(u>=0 && u <= users.length )
    {
        users.splice(m,1);
        res.send({status:200, message:users})
    } else{
        res.send({status:404, error:true, message:'the user '+u+ ' does not exist'});
    }
})

app.put("/users/update/:userID", function (req, res) {

    if(req.params.userID < 0 || req.params.userID > users.length){
        res.status(404).send("The user " + req.params.userID + " does not exist");
      } 
      else if((req.query.username == "" && req.query.password == "") || (typeof req.query.username === "undefined" && typeof req.query.password === "undefined")){
          users[req.params.movieID] = {
              username: users[req.params.userID].username,
              password: users[req.params.userID].password,
          };
      } 
      else if(req.query.username == "" || typeof req.query.username === "undefined"){
          users[req.params.userID] = {
              username: users[req.params.userID].username,
              password: req.query.password,
          };
      } 
      else if(req.query.password == "" || typeof req.query.password === "undefined") {
          users[req.params.userID ] = {
              username: req.query.username,
              password: users[req.params.userID].password,
          };
      } 
      else{
          users[req.params.userID ].username = req.query.username;
          users[req.params.userID ].password = req.query.password;
      }
      res.status(200).send(users);
});

app.get("/users/read", function (req, res) {
    res.send({ status: 200, message: users });
  })

const user = {
    username: "Lara",
    password: "123"
}

const authenticate = (users, username, password)=> {
    
    let authenticate = false;
    users.forEach(user => {
        if(user.username == username && user.password == password){
            authenticate = true;
           return authenticate;
        }
    });
    return authenticate;
}

app.delete("/movies/delete/:movieID", function (req, res) {
    
    if(authenticate(users, username, password)){
        const m= req.params.movieID;
        if(m>=0 && m <= movies.length )
        {
            const MoviesDeleted = await Movies.remove({m})
            res.send({status:200, message:MoviesDeleted})
        } else{
        res.send({status:404, error:true, message:'the movie '+m+ ' does not exist'});
    }
}
})

app.put("/movies/update/:movieID", function (req, res) {

    if(authenticate(users, username, password)){
        let m = req.params.movieID;
        let t= req.query.title;
        let y = req.query.year;
        let r = req.query.rating;
        var query= {m};
        var newValues= { $set: {title:t, year:y, rating:r } };
        
        const MoviesUpdated = await Movies.updateOne(query, newValues)
        res.status(200).send(MoviesUpdated);
    } else{
        res.status(404).send("The movie " + m + " does not exist");
    }
});