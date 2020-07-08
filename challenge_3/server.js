const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`**** Server is listening on http://localhost:${port} ****`);
});



