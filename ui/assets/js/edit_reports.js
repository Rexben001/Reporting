
$(document).ready(() => {
  // SUBMIT FORM
  $('#saveLoc').click((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost();
  });


  function ajaxPost() {

    const loc = document.getElementById('loc').innerHTML;
    const storeLoc = loc.split(',');
    const lats = storeLoc[0].trim();
    const logs = storeLoc[1].trim();

    const lat = document.getElementById('lat').value = lats;
    const log = document.getElementById('log').value = logs;

    const formData = {
      latitude: lat,
      longitude: log
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'PATCH',
      contentType: 'application/json',
      url: '/api/v1/reports/1/edit',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#acc').html(`${'<p>'
          + 'Post Successfully! <br>'
          + '--> '}${user.firstname} ${user.lastname}</p>`);
      },
      error(e) {
        alert('Error!');
        console.log('ERROR: ', e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $('#issue').val('');
    $('#latitude').val('');
    $('#longitude').val('');
    $('#description').val('');
    $('#placedBy').val('');
  }


  // SUBMIT FORM
  $('#save').click((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost2();
  });


  function ajaxPost2() {



    const formData = {
      status: $('#statuses').val(),
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'PATCH',
      contentType: 'application/json',
      url: '/api/v1/reports/1/status',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#acc').html(`${'<p>'
          + 'Post Successfully! <br>'
          + '--> '}${user.firstname} ${user.lastname}</p>`);
      },
      error(e) {
        alert('Error!');
        console.log('ERROR: ', e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $('#issue').val('');
    $('#latitude').val('');
    $('#longitude').val('');
    $('#description').val('');
    $('#placedBy').val('');
  }

  // SUBMIT FORM
  $('#save').click((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost3();
  });


  function ajaxPost3() {



    const formData = {
      status: $('#statuses').val(),
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'PATCH',
      contentType: 'application/json',
      url: '/api/v1/reports/1/status',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#acc').html(`${'<p>'
          + 'Post Successfully! <br>'
          + '--> '}${user.firstname} ${user.lastname}</p>`);
      },
      error(e) {
        alert('Error!');
        console.log('ERROR: ', e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $('#issue').val('');
    $('#latitude').val('');
    $('#longitude').val('');
    $('#description').val('');
    $('#placedBy').val('');
  }

  // SUBMIT FORM
  $('#save').click((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost4();
  });


  function ajaxPost4() {



    const formData = {
      status: $('#statuses').val(),
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'PATCH',
      contentType: 'application/json',
      url: '/api/v1/reports/1/status',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#acc').html(`${'<p>'
          + 'Post Successfully! <br>'
          + '--> '}${user.firstname} ${user.lastname}</p>`);
      },
      error(e) {
        alert('Error!');
        console.log('ERROR: ', e);
      }
    });

    // Reset FormData after Posting
    resetData();
  }

  function resetData() {
    $('#issue').val('');
    $('#latitude').val('');
    $('#longitude').val('');
    $('#description').val('');
    $('#placedBy').val('');
  }

  // SUBMIT FORM
  $('#del').click((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost5();
  });


  function ajaxPost5() {



    const formData = {
      status: 'Rejected',
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'PATCH',
      contentType: 'application/json',
      url: '/api/v1/reports/1/cancel',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#acc').html(`${'<p>'
          + 'Post Successfully! <br>'
          + '--> '}${user.firstname} ${user.lastname}</p>`);
      },
      error(e) {
        alert('Error!');
        console.log('ERROR: ', e);
      }
    });

    // Reset FormData after Posting
  }



  // DO GET
  function ajaxGet() {
    $.ajax({
      type: "GET",
      url: "/api/v1/reports/1",
      success: function (result) {

        for (i in result.message) {
          document.getElementById('tt').innerHTML += `<tr><td>${result.message[i].id}</td><td>${result.message[i].name}</td><td>${result.message[i].time}</td><td>${result.message[i].latitude + ', ' + result.message[i].longitude}</span><br><a href="#" id="editLo">Edit</a></td><td><span id="status">${result.message[i].status}</span><br><a href="#" id="edit">Edit</a></td>
          <td><button class="delete" id="del">Delete</button></td></tr>`
        }

      },
      error: function (e) {
        $("#getResultDiv").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });
  }
  ajaxGet();
  document.getElementById('edit').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay-pop');
    // const locs = document.getElementById('loc');
    const stat = document.getElementById('status');
    // const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');


    // const loc = locs.innerText;
    const status = stat.innerText;


    // Split the value of Status to remove Edit from the text
    // let sta = status.split('E');
    // let statusValue = sta[0];


    if (popup.style.display === 'block') {
      popup.style.display = 'none';
      overlay.className = 'overlay-pops';
    } else {
      popup.style.display = 'block';
      overlay.className = 'overlay-popup';
      // location.value = loc;
      statuses.value = status;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay-pop');
    // const locs = document.getElementById('loc');
    const stat = document.getElementById('status');

    // const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');
    console.log(statuses.value);

    popup.style.display = 'none';
    overlay.className = 'overlay-pops';
    // locs.innerHTML = location.value;
    stat.innerHTML = statuses.value;
  });


  document.getElementById('editLo').addEventListener('click', () => {
    const popup = document.getElementById('popupLoc');
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');
    const lat = document.getElementById('lat');
    const log = document.getElementById('log');


    const loc = locs.innerText;
    const storeLoc = loc.split(',');
    const lats = storeLoc[0].trim();
    const logs = storeLoc[1].trim();
    console.log(lat, log);

    // let sta = status.split('E');
    // Split the value of Status to remove Edit from the text
    // let statusValue = sta[0];


    if (popup.style.display === 'block') {
      popup.style.display = 'none';
      overlay.className = 'overlay-pops';
    } else {
      popup.style.display = 'block';
      overlay.className = 'overlay-popup';
      lat.value = lats;
      log.value = logs;
    }
  });

  document.getElementById('saveLoc').addEventListener('click', () => {
    const popup = document.getElementById('popupLoc');
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');

    const lat = document.getElementById('lat');
    const log = document.getElementById('log');


    popup.style.display = 'none';
    overlay.className = 'overlay-pops';
    locs.innerHTML = lat.value + ', ' + log.value;
  });
});
