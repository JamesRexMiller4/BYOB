const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
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

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await database('users').select();
    res.status(200).json(users)
  } catch(error) {
    res.status(500).json({ error });
  }
});

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

// app.post('/api/v1/tweets', async (req, res) => {
//   console.log(req.body)
//   console.log(req)
//   const tweet = req.body;
//   console.log(user)

//   for (let requiredParameter of ['content', 'date', 'id']) {
//     if (!user[requiredParameter]) {
//       return res
//         .status(422)
//         .send({ error: `Expected format: { content: <String>, date: <String> }. You're missing a ${requiredParameter} property`});
//     }
//   }

//   try {
//     const id = await database('tweets').insert(tweet, 'id');
//     res.status(201).json({ id })
//   } 
  
//   catch(error) {
//     res.status(500).json({ error });
//   }
// });


app.listen(app.get('port'), () => {
  console.log(`Server is listening on localhost:${app.get('port')}...`)
});