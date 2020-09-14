const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 5000

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', (req, res) => {
  res.send({ message: "Hello, World!" });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
