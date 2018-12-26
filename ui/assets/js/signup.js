$(document).ready(() => {
  // SUBMIT FORM
  $('#signup').submit((event) => {

    // Prevent the form from submitting via the browser.
    event.preventDefault();
    // if ($('#password').val() !== $('#c_password').val()) {
    //   return alert('password does not match');
    // }
    ajaxPost();
  });


  function ajaxPost() {
    // PREPARE FORM DATA
    const formData = {
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      othernames: $('#othernames').val(),
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      phonenumber: $('#phonenumber').val()
    };

    console.log(formData);
    // DO POST
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: '/api/v1/users',
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        window.location.href = '../index.html'
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
    $('#firstname').val('');
    $('#lastname').val('');
    $('#othernames').val('');
    $('#email').val('');
    $('#password').val('');
    $('#phonenumber').val('');
  }
});
