const express = require('express');
const { createHash } = require('crypto');

const path = require('path');

const app = express();
const port = 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.post('/api/v1/users', (req, res) => {
    res.status(200).json({id:1,next_challenge: {
      challenge: 'Hello, world!'
    } })
})
app.post('/api/v1/createSha256/message', (req, res) => {
  res.status(200).json(createHash('sha256').update(req.body.message).digest('hex'));
})

app.put('/api/v1/users/:id/challenge/digest', (req, res) => {
    res.status(200).json({next_challenge: {
      difficulty: 3,
      challenge: 'Hello, world!'
    } })
})

app.put('/api/v1/users/:id/challenge/pow', (req, res) => {
  console.log(req);
    let data = req.body;
    res.send('Data received' + JSON.stringify(data));
    res.status(200).json({next_challenge: {
      difficulty: 3,
      challenge: 'Hello, world!'
    } })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})