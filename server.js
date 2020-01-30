const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./platform/knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.set('port', process.env.PORT || 3000);

app.get('/api/v1/tweets', async (req, res) => {
  try {
    const tweets = await database('tweets').select();
    res.status(200).json(tweets)
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/tweets/:id', async (req, res) => {
  try {
    const user = await database('tweets').select().where('id', req.params.id)
    res.status(200).json(user)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await database('users').select();
    res.status(200).json(users)
  } catch(error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await database('users').select().where('id', req.params.id)
    res.status(200).json(user)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.get('/api/v1/users/:id/tweets', async (req, res) => {
  try {
    const tweets = await database('tweets').select().where('user_id', req.params.id)
    res.status(200).json(tweets)
  } catch(error) {
    res.status(500).json({ error })
  }
})

app.post('/api/v1/users', bodyParser.json(), async (req, res) => {
  const user = req.body;

  for (let requiredParameter of ['username', 'handle']) {
    if (!user[requiredParameter]) {
      return res
        .status(422)
        .reject({ error: `Expected format: { username: <String>, handle: <String> }. You're missing a ${requiredParameter} property`});
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

app.post('/api/v1/tweets', bodyParser.json(), async (req, res) => {
  const tweet = req.body;

  for (let requiredParameter of ['content', 'id']) {
    if (!tweet[requiredParameter]) {
      return res
        .status(422)
        .send({ error: `Expected format: { content: <String>, date: <String> }. You're missing a ${requiredParameter} property`});
    }
  }

  try {
    await database('tweets').insert({
      content: tweet.content,
      date: new Date(),
      user_id: tweet.id
    });
    res.status(201).json({ tweet })
  } 
  
  catch(error) {
    res.status(500).json({ error });
  }
});

app.delete('/api/v1/users/:id', async (req, res) => {
  try {
    await database('users').select().where('id', req.params.id).del()
    res.status(204).send('Account has been deleted')
  } catch(error) {
    res.status(500).json({ error })
  }
});

app.delete('/api/v1/users/:id/tweets/:tweet_id', async (req, res) => {
  try {
    await database('tweets').select().where('id', req.params.tweet_id).del()
    res.status(204).send('Tweet has been deleted')
  } catch(error) {
    res.status(500).json({ error })
  }
});

app.get('*', (req, res) => {
  res
  .status(404)
  .send('404: Not found')
});


app.listen(app.get('port'), () => {
  console.log(`Server is listening on localhost:${app.get('port')}...`)
});