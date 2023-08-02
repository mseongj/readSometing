const express = require('express');
const path = require('path');
const app = express();
const spawn = require("child_process").spawn;
const record = require('node-record-lpcm16');
const Speech = require('@google-cloud/speech');

const speech = new Speech.SpeechClient();

// const result = spawn("python", ["python/index.py"]);
// result.stdout.on('data', (dataToSend) => { result1 = dataToSend.toString();});
// result.stdout.on('data', (dataToSend) => { result2 = dataToSend.toString();});

app.listen(8080, () => {
  console.log('Server is running at port 8080');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'readsomething/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'readsomething/build/index.html'));
});

// app.get('/api/hello', (req, res) => {res.json({message: result1, message2: 'result2'})
// });


// 8.2 복붙한 내용 get, post
// app.get('/api/hello', (req, res) => {
//   const pythonProcess = spawn('python', ['python/index.py']);

//   let result1 = '';
//   let result2 = '';

//   pythonProcess.stdout.on('data', (data) => {
//     const output = data.toString().trim();

//     if (output.startsWith('result1: ')) {
//       result1 = output.substring('result1: '.length);
//     } else if (output.startsWith('result2: ')) {
//       result2 = output.substring('result2: '.length);
//     }
//   });

//   pythonProcess.on('close', () => {
//     res.json({ result1: result1, result2: result2 });
//   });
// });

// app.post('/api/hello', (req, res) => {
//   const request = {
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'ko-KR',
//     },
//     interimResults: false,
//   };

//   const recognizeStream = speech
//     .streamingRecognize(request)
//     .on('error', console.error)
//     .on('data', (data) => {
//       const audio = data.results[0].alternatives[0].transcript;
//       console.log(`Transcription: ${audio}`);
//       res.json({ message: audio });
//     });

//   record
//     .start({
//       sampleRateHertz: 16000,
//       threshold: 0,
//       verbose: false,
//       recordProgram: 'rec',
//       silence: '5.0',
//     })
//     .on('error', console.error)
//     .pipe(recognizeStream);

//   console.log('Listening, press Ctrl+C to stop.');
// });

app.post('/api/hello', (req, res) => {
  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'ko-KR',
    },
    interimResults: false,
  };

  const recognizeStream = speech
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', (data) => {
      const audio = data.results[0].alternatives[0].transcript;
      console.log(`Transcription: ${audio}`);
      res.end();
    });

  record
    .start({
      sampleRateHertz: 16000,
      threshold: 0,
      verbose: false,
      recordProgram: 'rec',
      silence: '5.0',
    })
    .on('error', console.error)
    .pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');
});


// last line of server.js
app.get('*', (req, res) => {res.sendFile(path.join(__dirname + '/readsomething/build/index.html'));
});





