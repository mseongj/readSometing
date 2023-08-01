const express = require('express');
const path = require('path');
const app = express();

const spawn = require("child_process").spawn;
const result = spawn("python", ["python/index.py"]);
// result.stdout.on('data', function(data) {result1 = console.log(data.toString());});
// result.stderr.on('data', function(data) {console.log(data.toString());});
result.stdout.on('data', (dataToSend) => { result1 = dataToSend.toString();});
result.stdout.on('data', (dataToSend) => { result2 = dataToSend.toString();});

app.listen(8080, () => {
  console.log('Server is running at port 8080');
});

app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use(express.static(path.join(__dirname, 'readsomething/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'readsomething/build/index.html'));
});

app.get('/api/hello', (req, res) => {res.json({message: result1, message2: 'result2'})
});



// last line of server.js
app.get('*', (req, res) => {res.sendFile(path.join(__dirname + '/readsomething/build/index.html'));
});