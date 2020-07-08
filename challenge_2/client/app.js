/* jQuery / Ajax */
$(() => {
  const serverUrl = 'http://localhost:3000';
  let formData = new FormData;
  let endpoint = '';
  let textAreaContent;

  const ajaxFileUpload = (file) => {
    // formData.append('fileupload', file);
    formData.set('fileupload', file);
    $.ajax({
      url: endpoint,
      type: 'POST',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        console.log('Successfully able to receive csv data for the uploaded json file!!');
        $('#result')[0].innerHTML = data;
        $('#json')[0].innerHTML = '';
        $('#convert').attr('disabled', false);
        $('#fileupload')[0].value = '';
      },
      error: (error) => {
        console.log('Unable to post the uploaded json file: ', error);
      }
    });
  };

  const ajaxJsonText = (text) => {
    $.ajax({
      url: endpoint,
      type: 'POST',
      contentType: 'application/json',
      data: text,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        console.log('Successfully able to receive csv data for the pasted json text: ');
        $('#result')[0].innerHTML = data;
      },
      error: (error) => {
        console.log('Unable to post the json text: ', error);
      }
    });
  };

  let $jsonupload = $(document)[0]['forms'][0];
  let $jsontext = $(document)[0]['forms'][1];

  $('form').on('submit', (e) => {
    e.preventDefault();

    let form = $('form #fileupload')[0];

    console.log('--Ajax preventing form actions--', 'No of files selected: ', form.files.length);

    if (endpoint === 'http://localhost:3000/jsonupload') {
      if (form.files.length > 0) {
        if (form.files[0].type !== 'application/json') {
          console.log('Not a proper file format');
        } else {
          $('#convert').attr('disabled', true);
          ajaxFileUpload(form.files[0]);
        }
      } else {
        console.log('Please select a Json file to upload');
      }
    }

    if (endpoint === 'http://localhost:3000/json2csv') {
      textAreaContent = $('#json')[0].value;
      ajaxJsonText(textAreaContent);
    }

  });

  // Text area id
  $('#json').on('click', (e) => {
    $('#convert').attr('disabled', false);
    $('#jsonupload').attr('disabled', true);
    endpoint = `${serverUrl}/json2csv`;
    $('.err-text')[0].style.display = 'none';
  });

  // Input for file upload
  $('#fileupload').on('click', (e) => {
    $('#jsonupload').attr('disabled', false);
    $('#convert').attr('disabled', true);
    endpoint = `${serverUrl}/jsonupload`;
    $('.err-text')[0].style.display = 'none';
  });

  // File upload button
  $('#jsonupload').on('click', (e) => {
    $('#convert').attr('disabled', true);
    endpoint = `${serverUrl}/jsonupload`;
    let form = $('form #fileupload')[0];
    if (form.files.length === 0) {
      $('.err-text')[0].style.display = 'block';
    }
  });

  $('#clear').on('click', (e) => {
    $('#json')[0].innerText = '';
    console.log('Json text area cleared');
  });

  $('#csvclear').on('click', (e) => {
    $('#result')[0].innerText = '';
    console.log('Result text area cleared');
  });

  $('#convert').on('click', (e) => {
    $('#jsonupload').attr('disabled', true);
    endpoint = `${serverUrl}/json2csv`;
  });

  $('#download').on('click', (e) => {
    endpoint = '';
    let csvResult = $('#result')[0].value;

    const blob = new Blob([csvResult], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a  = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'csvDataResults');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

});