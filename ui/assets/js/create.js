fetch('/api/v1/reports/1')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        // Create and append the li's to the ul
        data.message.forEach(element => {
            const realDate = element.time.split('T')[0];
            document.getElementById('cards').innerHTML += `<div><p><span id="heady">Issue: </span> ${element.name} </p><p><span id="heady">Status: </span> ${element.status} 
                              </p><p><span id="heady">Date: </span> ${realDate} 
                             </p><p><span id="heady">Latitude: </span> ${element.latitude} 
                             </p><p><span id="heady">Longitude: </span> ${element.longitude}
                           </p><p><span id="heady">Description: </span> ${element.description}</div>`
        });
        // console.log(data.message);
    });

function createPost(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('issue').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        description: document.getElementById('description').value,
        placedby: document.getElementById('placedby').value,

    }
    fetch('/api/v1/reports', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            if (response) {
                console.log(response)
                // redirect: window.location.replace("../create.html")
            } else {
                console.log('Invalid user');
            }
        })
        .catch(error => console.error('Error:', error));
}


function resetData() {
    document.getElementById('issue').value = '';
    document.getElementById('latitude').value = '';
    document.getElementById('longitude').value = '';
    document.getElementById('description').value = '';
    document.getElementById('placedby').value = '';
}

document.getElementById('createReport').addEventListener('submit', createPost);
// $(document).ready(() => {
//     // SUBMIT FORM
//     $('#createReport').submit((event) => {

//         // Prevent the form from submitting via the browser.
//         event.preventDefault();
//         // if ($('#password').val() !== $('#c_password').val()) {
//         //   return alert('password does not match');
//         // }
//         ajaxPost();
//     });


//     function ajaxPost() {
//         // PREPARE FORM DATA
//         const formData = {
//             name: $('#issue').val(),
//             latitude: $('#latitude').val(),
//             longitude: $('#longitude').val(),
//             description: $('#description').val(),
//             placedby: $('#placedBy').val(),

//         };

//         console.log(formData);
//         // DO POST
//         $.ajax({
//             type: 'POST',
//             contentType: 'application/json',
//             url: '/api/v1/reports',
//             data: JSON.stringify(formData),
//             dataType: 'json',
//             success(user) {
//                 window.location.href = '../create.html'

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
//         $('#issue').val('');
//         $('#latitude').val('');
//         $('#longitude').val('');
//         $('#description').val('');
//         $('#placedBy').val('');
//     }
// });



// $(document).ready(function () {


//     // DO GET
//     function ajaxGet() {
//         $.ajax({
//             type: "GET",
//             url: "/api/v1/reports/1",
//             success: function (result) {
//                 // $('#getResultDiv ul').empty();
//                 // $.each(result, function (i, report) {
//                 //     $('.cards #me').append($(report).name + " " + this.status + "<br>");
//                 // });
//                 // console.log("Success: ", result);

//                 for (i in result.message) {
//                     document.getElementById('cards').innerHTML += `<div><p><span id="heady">Issue: </span> ${result.message[i].name} </p><p><span id="heady">Status: </span> ${result.message[i].status} 
//                     </p><p><span id="heady">Time: </span> ${result.message[i].time} 
//                     </p><p><span id="heady">Latitude: </span> ${result.message[i].latitude} 
//                     </p><p><span id="heady">Longitude: </span> ${result.message[i].longitude}
//                     </p><p><span id="heady">Description: </span> ${result.message[i].description}</div>`
//                 }

//             },
//             error: function (e) {
//                 $("#getResultDiv").html("<strong>Error</strong>");
//                 console.log("ERROR: ", e);
//             }
//         });
//     }
//     ajaxGet();
// })


