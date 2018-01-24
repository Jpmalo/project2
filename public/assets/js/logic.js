
var votes = 0;

/* Vote Tally */
$('.vote-button').click(function () {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
})


$(function () {
    $(".create-poll").on("click", function (event) {

        var pollQuestion = $('input[name="new_poll-question"]').val().trim();
        var pollOption1 = $('input[name="create_poll-answer-1"]').val().trim();
        var pollOption2 = $('input[name="create_poll-answer-2"]').val().trim();
        var pollOption3 = $('input[name="create_poll-answer-3"]').val().trim();
        var pollOption4 = $('input[name="create_poll-answer-4"]').val().trim();

        var newPoll = {
            "question": pollQuestion,
            "answers": [
                {
                    "option": pollOption1,
                    "num": 1

                },
                {
                    "option": pollOption2,
                    "num": 2
                }

            ]
        };

        if (pollOption3 !== "") {
            var option3 = {
                "option": pollOption3,
                "num": 3
            }

            newPoll.answers.push(option3);
        };

        if (pollOption4 !== "") {
            var option4 = {
                "option": pollOption4,
                "num": 4
            }

            newPoll.answers.push(option4);
        };



        // Validate if at least 2 options have been added
        if ((pollOption1 && (pollOption2 || pollOption3 || pollOption4) === "") || (pollOption2 && (pollOption1 || pollOption3 || pollOption4) === "") || (pollOption3 && (pollOption1 || pollOption3 || pollOption4) === "") || (pollOption4 && (pollOption1 || pollOption3 || pollOption4) === "")) {
            alert('at least two text inputs are filled');
            return false;
        } else {
            console.log(newPoll);
            // window.location.replace('/');

            axios.post('/api/poll', newPoll, {headers: { Authorization: sessionStorage.jwt}})
                .then(function (response) {
                    var pollID = response.data[0].PollId;
                    console.log("The Poll ID is : " + pollID);
                    console.log(response);

                    window.location.replace('/api/poll/' + pollID);


                })
                .catch(function (error) {
                    console.log(error);
                });

        }

    });
});


$(function () {
    $(".login").on("click", function (event) {
        event.preventDefault();
        if (document.getElementById('loginBtn').innerHTML === 'Sign out') {
            return
        }
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        console.log(username)
        console.log(password)
        //TODO: create a post request. save the resulting token in session storage.
        $.post("/api/auth/login",{ userName: username, password: password }, function (data, status) {
            console.log (status)
            console.log(data)
            if (status === "success"){
                sessionStorage.jwt=data.token
                sessionStorage.userName = data.userName
                document.getElementById('username').remove()
                document.getElementById('password').remove()
                document.getElementById('loginBtn').innerHTML = 'Sign out ' + sessionStorage.userName
                document.getElementById('loginBtn').onClick = function (event) {
                    sessionStorage.clear()
                    location.reload()
                }
            }

        });
    })
})