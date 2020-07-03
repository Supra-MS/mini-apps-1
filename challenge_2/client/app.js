const clear = document.getElementById('clear');
const json = document.getElementById('json');
const fileupload = document.getElementById('fileupload');

clear.addEventListener('click', function(e) {
  json.innerText = '';
});

fileupload.addEventListener('change', function(e) {
  console.log(e.target.files[0]);
});

