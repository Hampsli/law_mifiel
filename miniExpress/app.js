const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.json(`HTTP GET request received`);
})


app.post('/api/v1/users', (req, res) => {
  console.log(req);
    let data = req.body;
    res.send('Data received' + JSON.stringify(data));
    res.status(200).json({next_challenge: {
      challenge: 3
    } })
})

app.put('/api/v1/users/:id/challenge/digest', (req, res) => {
  console.log(req);
    let data = req.body;
    res.send('Data received' + JSON.stringify(data));
    res.status(200).json({next_challenge: {
      challenge: 3
    } })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})