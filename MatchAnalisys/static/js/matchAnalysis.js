function activate_judge(user, session_id, judge) {
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
            token = (this.responseText.split('":"')[1].split('"')[0]);
        }
    });

    xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    xhr.send(data);

    data = new FormData()
    data.append('judge', judge);
    data.append('active', 1);
    var xhttp_start_session = new XMLHttpRequest();
    xhttp_start_session.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/active_judges/" + session_id + '/', true);
    xhttp_start_session.setRequestHeader("Authorization", "Token " + token);
    xhttp_start_session.send(data);
    document.getElementById('form_start').submit();

}
