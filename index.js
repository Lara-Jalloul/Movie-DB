const express = require('express')
const app = express()
const port = 3000

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
    res.send('{status: 200,message: "ok",data: data}')
  else{
    res.send('{status: 500,error: true,message: "you have to provide a search"}')
  }
})

app.get("/movies/create", function (req, res) {})

app.get("/movies/read", function (req, res) {
  res.send({ status: 200, message: movies });
})

app.get("/movies/update", function (req, res) {})

app.get("/movies/delete", function (req, res) {})

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