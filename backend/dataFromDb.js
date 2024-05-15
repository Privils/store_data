const express = require('express');
const router = express.Router();
const { Pool }= require('pg')
require('dotenv').config(); 

//CONNECTING TO THE DB
const pool = new Pool ({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD
})

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Successfully connected to the database');
    } 
    release(); 
}); 

const fetchingDataFromDB = async () => {
    try {
      const query = 'SELECT * FROM  products';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      return null;
    }
  };
  router.get('/api/shop/images', async (request, response) => {
    const data = await fetchingDataFromDB();
    console.log(data);
    console.log(request.url);
    if (data && data.length > 0) {
        response.json(data);
        console.log('Data is present');
      } else if (data && data.length === 0) {
        response.status(200).json({ message: 'No data available in the database' });
      } else {
        response.status(500).json({ error: 'Error fetching data from the database' });
      }
  });
 
  
  module.exports = router;