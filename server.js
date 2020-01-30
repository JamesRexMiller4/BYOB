const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./platform/knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);


app.get('/api/v1/tweets', async (req, res) => {
  try {
    const tweets = await database('tweets').select();
    res.status(200).json(tweets)
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening on localhost:${app.get('port')}...`)
})