$(document).ready(() => {
  // SUBMIT FORM
  $('#signup').submit((event) => {
    // Prevent the form from submitting via the browser.
    event.preventDefault();
    ajaxPost();
  });


  function ajaxPost() {
    // PREPARE FORM DATA
    const formData = {
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      othernames: $('#othernames').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      phonenumber: $('#phonenumber').val()
    };

    // DO POST
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${window.location}/users`,
      data: JSON.stringify(formData),
      dataType: 'json',
      success(user) {
        $('#postResultDiv').html(`${'<p>'
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
    $('#firstname').val('');
    $('#lastname').val('');
    $('#othernames').val('');
    $('#email').val('');
    $('#password').val('');
    $('#phonenumber').val('');
  }
});
