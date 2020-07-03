const clear = document.getElementById('clear');
const csvclear = document.getElementById('csvclear');
const result = document.getElementById('result');
const json = document.getElementById('json');
const fileupload = document.getElementById('fileupload');

clear.addEventListener('click', function(e) {
  json.innerText = '';
});

csvclear.addEventListener('click', function(e) {
  result.innerText = '';
});

fileupload.addEventListener('change', function(e) {
  console.log(e.target.files[0]);
});

