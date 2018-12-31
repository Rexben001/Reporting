// $(document).ready(() => {
//   // SUBMIT FORM
//   $('#signup').submit((event) => {

//     // Prevent the form from submitting via the browser.
//     event.preventDefault();
//     // if ($('#password').val() !== $('#c_password').val()) {
//     //   return alert('password does not match');
//     // }
//     ajaxPost();
//   });


//   function ajaxPost() {
//     // PREPARE FORM DATA
//     const formData = {
//       firstname: $('#firstname').val(),
//       lastname: $('#lastname').val(),
//       othernames: $('#othernames').val(),
//       username: $('#username').val(),
//       email: $('#email').val(),
//       password: $('#password').val(),
//       phonenumber: $('#phonenumber').val()
//     };

//     console.log(formData);
//     // DO POST
//     $.ajax({
//       type: 'POST',
//       contentType: 'application/json',
//       url: '/api/v1/users',
//       data: JSON.stringify(formData),
//       dataType: 'json',
//       success(user) {
//         window.location.href = '../index.html'
//       },
//       error(e) {
//         alert('Error!');
//         console.log('ERROR: ', e);
//       }
//     });

//     // Reset FormData after Posting
//     resetData();
//   }

//   function resetData() {
//     $('#firstname').val('');
//     $('#lastname').val('');
//     $('#othernames').val('');
//     $('#email').val('');
//     $('#password').val('');
//     $('#phonenumber').val('');
//   }
// });



function signUp(e) {
  e.preventDefault();
  const data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    othernames: document.getElementById('othernames').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phonenumber: document.getElementById('phonenumber').value,

  }
  fetch('/api/v1/users', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      if (response) {
        redirect: window.location.replace("../index.html")
      } else {
        console.log('Invalid user');
      }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('signup').addEventListener('submit', signUp);

