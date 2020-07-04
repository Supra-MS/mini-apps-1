const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Promise = require('bluebird');
const multer = require('multer');
const upload = multer({ dest: 'csvReports/' });
const randomId = require('randomatic');
const path = require('path');
const fs = require('fs');
const convertJSONToCSV = require('./JSFiles/convertJsonToCsv');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.text({
  type: "text/plain"
}));

app.use(express.static('../client'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log('----Able to render index page----');
  res.render('indexServer');
  res.end();
});

app.post('/json2csv', (req, res, next) => {
  let incomingJSON = JSON.parse(req.body);
  // let incomingJSON = JSON.parse(req.body.json);
  let csvResultData= convertJSONToCSV(incomingJSON);
  console.log('----Able to send csv as response for form submit----');
  // res.render('json2csv', { result: csvResultData, json: req.body.json });
  res.send(csvResultData);
  res.end();
  next();
});

app.post('/jsonupload', upload.single('fileupload'), (req, res, next) => {
  console.log('Files: ', req.file);
  let fileJSON, csvResultData;
  if (req.file === undefined) {
    res.send('Please select a file to upload');
  }
  let filename = req.file.filename;
  let oldFilePath = path.join(__dirname, `/csvReports/${filename}`);
  let randomCSVName = `csvReport${randomId('0', 2)}`;
  let newFilePath = path.join(__dirname, `/csvReports/${randomCSVName}.js`);


  const renameFile = (oldFile, newFile) => {
    return new Promise((resolve, reject) => {
      fs.rename(`${oldFile}`, `${newFile}`, (err, data) => {
        if (err) {
          reject('Unable to rename the file!', err);
        } else {
          console.log(`Renamed file is saved under ${newFile}`);
          resolve('Successfully able to rename the file', data);
        }
      });

    });
  };

  const readAFile = () => {
    return new Promise((resolve, reject) => {
      fs.readFile(newFilePath, 'utf8', (err, fileData) => {
        if (err) {
          reject('Unable to read the file!');
        } else {
          resolve(fileData);
        }
      });
    });
  };

  renameFile(oldFilePath, newFilePath).then(() => {
    readAFile().then((fileData) => {
      fileJSON = JSON.parse(fileData);
      csvResultData = convertJSONToCSV(fileJSON);
      res.send(csvResultData);
      // res.render('json2csv', {result: csvResultData, json: ''});
      res.end();
      next();
    })
    .then(() => {
      oldFilePath = newFilePath;
      newFilePath = path.join(__dirname, `/csvReports/${randomCSVName}.csv`);
      renameFile(oldFilePath, newFilePath).then(() => {
        fs.writeFile(newFilePath, csvResultData, 'utf8', (err, data) => {
          if (err) {
            console.log('Unable to overwrite the json file to csv!!');
          } else {
            console.log('Successfully able to overwrite the json file!');
          }
        })
        next();
      })
    })
    .catch((error) => {
      console.log('Error in reading/writing file: ', error);
    });
  })
  .catch((error) => {
    console.log('Error in renaming file: ', error);
  });

});

app.listen(port, () => { console.log(`*** Server is listening on http://localhost:${port} ***`); });

