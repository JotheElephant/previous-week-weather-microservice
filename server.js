"use strict";

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("It's happening!")
})


app.listen(process.env.PORT);

