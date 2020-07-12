const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('./client/dist'));

app.listen(port, () => console.log(`Server is listening on http:localhost:${port}`));

