const express = require('express');
const { createHash } = require('crypto');

const path = require('path');

const app = express();
const port = 4000;

const calculateHash256 = (hash) =>{
  return createHash('sha256').update(hash).digest('hex');
}

const calculateNonce = (data,result) =>{
  let nonce = 0;
  let originalMessage = data.sha256Message
  let validSha256 = calculateHash256(originalMessage);
  while (validSha256.substring(0, data.difficulty) !== Array(data.difficulty + 1).join("0")) {
    nonce++;
    validSha256 = calculateHash256(`${originalMessage}${nonce}`);
  }
result(JSON.stringify(nonce));
}

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.post('/api/v1/users', (req, res) => {
    res.status(200).json({id:1,next_challenge: {
      challenge: 'Hello, world!'
    } })
})
app.post('/api/v1/createSha256/message', (req, res) => {
  res.status(200).json(calculateHash256(req.body.message));
})

app.post('/api/v1/calculateNonce/pow', (req, res) => {
  calculateNonce(req.body, function(data) {
    res.status(200).json({next_challenge: {
      nonce: data,
    } })
   });
})

app.put('/api/v1/users/:id/challenge/digest', (req, res) => {
    res.status(200).json({next_challenge: {
      difficulty: 3,
      challenge: 'Hello, world!'
    } })
})

app.put('/api/v1/users/:id/challenge/pow', (req, res) => {
    res.status(200).json("Done")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})