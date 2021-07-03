function session_ready(user, session_id) {
    var user_decoded = atob(user);
    username = user_decoded.split('-')[0]
    password = user_decoded.split('-')[1]
    var token;
    var data = new FormData();
    data.append("password", password);
    data.append("username", username);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            // console.log(this.responseText);
            token = (this.responseText.split('":"')[1].split('"')[0]);
        }
    });

    xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    xhr.send(data);
    window.setInterval(function () {
        check_session_ready(session_id, token);
    }, 1000); // 1000 milliseconds (1 second)
}

function check_session_ready(session_id, token) {
    var xhttp_session_ready = new XMLHttpRequest();
    xhttp_session_ready.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < myArr.length; ++i) {
                var session_ready = myArr[i].start;
                if (session_ready === 1) {
                    document.getElementById('form_start_session').submit();
                }
            }
        }
    }
    xhttp_session_ready.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/start_session/" + session_id + '/', true);
    xhttp_session_ready.setRequestHeader("Authorization", "Token " + token);
    xhttp_session_ready.send();

}
