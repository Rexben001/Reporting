$(document).ready(() => {
    // SUBMIT FORM
    $('#signin').submit((event) => {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {
        // PREPARE FORM DATA
        const formData = {
            username: $('#username').val(),
            password: $('#password').val(),
        };

        console.log(formData);
        // DO POST
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/v1/users/login',
            data: JSON.stringify(formData),
            dataType: 'json',
            success(user) {
                $('#acc').html(`${'<p>'
                    + 'Post Successfully! <br>'
                    + '--> '}</p>`);
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
