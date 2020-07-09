const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(req.body, '-----------------------');
  res.render('index');
});

app.post('/authUser', (req, res) => {
  console.log('---Post for the authenticating user---', req.body);

});

app.post('/userData', (req, res) => {
  console.log('---Post for the user pii---', req.body);

});

app.post('/billInfo', (req, res) => {
  console.log('---Post for the user payment details---', req.body);

});


app.listen(port, () => {
  console.log(`**** Server is listening on http://localhost:${port} ****`);
});

