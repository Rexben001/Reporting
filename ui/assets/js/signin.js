// $(document).ready(() => {
//     // SUBMIT FORM
//     $('#signin').submit((event) => {
//         // Prevent the form from submitting via the browser.
//         event.preventDefault();
//         ajaxPost();
//     });


//     function ajaxPost() {
//         // PREPARE FORM DATA
//         const formData = {
//             username: $('#username').val(),
//             password: $('#password').val(),
//         };

//         console.log(formData);
//         // DO POST
//         $.ajax({
//             type: 'POST',
//             contentType: 'application/json',
//             url: '/api/v1/users/login',
//             data: JSON.stringify(formData),
//             dataType: 'json',
//             success(user) {
//                 $('#acc').html(`${'<p>'
//                     + 'Post Successfully! <br>'
//                     + '--> '}</p>`);
//             },
//             error(e) {
//                 alert('Error!');
//                 console.log('ERROR: ', e);
//             }
//         });

//         // Reset FormData after Posting
//         resetData();
//     }

//     function resetData() {
//         $('#firstname').val('');
//         $('#lastname').val('');
//         $('#othernames').val('');
//         $('#email').val('');
//         $('#password').val('');
//         $('#phonenumber').val('');
//     }
// });



// function makereq() {
//     const xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = hi
//     xhr.open('GET', '/api/v1/reports', true);
//     xhr.send();
//     console.log('Working');
// }

// function hi() {
//     console.log('234567');
// }

// document.getElementById('signin').addEventListener('click', () => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     sendData('/api/v1/users/login', { username, password });
// });


// function sendData(url, data) {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = hi;
//     xhr.open('POST', url);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send({ username: encodeURIComponent(data.username), password: encodeURIComponent(data.password) });
// }



function signin(e) {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,

    }
    fetch('/api/v1/users/login', {
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


document.getElementById('signin').addEventListener('submit', signin);

