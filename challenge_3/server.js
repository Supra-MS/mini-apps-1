const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { UserAccount, UserPII, UserPayment } = require('./models');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


/* Mongoose DB */
mongoose.connect('mongodb://localhost/reactCheckOut', {
  useNewUrlParser: true,
  useUnifiedTopology: true // These will take care about the deprecation warnings.
});

mongoose.connection.on('connected', () => console.log('!!! Mongoose is connected !!!'));

app.get('/', (req, res) => {
  console.log('----------Render index page-------------');
  res.render('index');
});

app.post('/authUser', (req, res) => {
  console.log('---Post for the authenticating user---', req.body);
  const authUserData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  };

  const hash = bcrypt.hashSync(authUserData.password, 10);
  authUserData.password = hash;

  UserAccount.create(authUserData);
  res.status(201).send('User account created successfully!!'); // for now hold res.json to send tokens
  res.end();
});

app.post('/userData', (req, res) => {
  console.log('---Post for the user pii---', req.body);
  UserPII.create({
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    zip: req.body.zip,
    mobile: req.body.mobile
  })
  res.status(201).send('User PII created successfully!!');
  res.end();
});

app.post('/billInfo', (req, res) => {
  console.log('---Post for the user payment details---', req.body);
  UserPayment.create({
    ccName: req.body.cardHolderName,
    ccNumber: req.body.cardNumber,
    expiry: req.body.expiry,
    cvv: req.body.cvv,
    billZip: req.body.billZip
  })
  res.status(201).send('User payment details created successfully!!');
  res.end();
});


app.listen(port, () => {
  console.log(`**** Server is listening on http://localhost:${port} ****`);
});

/* Note: cors, proxy; axios */