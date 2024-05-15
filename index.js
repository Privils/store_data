const express = require('express');
const app = express();
require('dotenv').config(); 

const dbRouter = require('./backend/dataFromDb.js');

app.use(dbRouter);

const PORT = process.env.PORT || 3212;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
