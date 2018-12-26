$(document).ready(() => {
    // SUBMIT FORM
    $('#createReport').submit((event) => {

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
            name: $('#issue').val(),
            latitude: $('#latitude').val(),
            longitude: $('#longitude').val(),
            description: $('#description').val(),
            placedby: $('#placedBy').val(),

        };

        console.log(formData);
        // DO POST
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/v1/reports',
            data: JSON.stringify(formData),
            dataType: 'json',
            success(user) {
                window.location.href = '../create.html'

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
});



$(document).ready(function () {


    // DO GET
    function ajaxGet() {
        $.ajax({
            type: "GET",
            url: "/api/v1/reports/1",
            success: function (result) {
                // $('#getResultDiv ul').empty();
                // $.each(result, function (i, report) {
                //     $('.cards #me').append($(report).name + " " + this.status + "<br>");
                // });
                // console.log("Success: ", result);

                for (i in result.message) {
                    document.getElementById('cards').innerHTML += `<div><p><span id="heady">Issue: </span> ${result.message[i].name} </p><p><span id="heady">Status: </span> ${result.message[i].status} 
                    </p><p><span id="heady">Time: </span> ${result.message[i].time} 
                    </p><p><span id="heady">Latitude: </span> ${result.message[i].latitude} 
                    </p><p><span id="heady">Longitude: </span> ${result.message[i].longitude}
                    </p><p><span id="heady">Description: </span> ${result.message[i].description}</div>`
                }

            },
            error: function (e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        });
    }
    ajaxGet();
})