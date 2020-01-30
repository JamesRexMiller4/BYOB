const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./platform/knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3001);


app.get('/api/v1/tweets', async (req, res) => {
  try {
    const tweets = await database('tweets').select();
    res.status(200).json(tweets)
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await database('users').select();
    res.status(200).json(users)
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/users', async (req, res) => {
  const user = req.body;
  console.log(user)

  for (let requiredParameter of ['username', 'handle']) {
    if (!user[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property`});
    }
  }

  try {
    const id = await database('users').insert(user, 'id');
    res.status(201).json({ id })
  } 
  
  catch(error) {
    res.status(500).json({ error });
  }
});


app.listen(app.get('port'), () => {
  console.log(`Server is listening on localhost:${app.get('port')}...`)
});