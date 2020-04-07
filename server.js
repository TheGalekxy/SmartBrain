const express = require('express');
// const bcrypt = require('bcrypt-nodejs');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Meitsme309331239',
      database : 'smartbrain'
    }
  });




const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) =>{
    res.send('it is working!');
})


app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { msWriteProfilerMark.handleProfileGet(req, res, db)}) // :id syntax means we can enter any id and grab that id through the request.id params

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})





app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})



/* 

Route / --> response = this is working
Route /signin ---> POST = success/fail
Route /register --> POST = user
Route /profile/:userId --> GET = user
Route /image --> PUT --> user

*/