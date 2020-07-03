const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../client'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log('----Able to render index page----');
  res.render('indexServer');
  res.end();
});

app.listen(port, () => { console.log(`*** Server is listening on ${port} ***`); });

