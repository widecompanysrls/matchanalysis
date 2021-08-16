function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById('clipboard'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById('clipboard_copied').style.display = 'block';

}

function show_judging_details(user, session_id, heats_dances, heats_list, solo_dances, solo_list, judges) {
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
    var random_method = false;
    var xhttp_params = new XMLHttpRequest();
    xhttp_params.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var p = JSON.parse(this.responseText);
            if (p.length > 0) {
                random_method = false;
            } else {
                random_method = true;
            }
        }
    });
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/', false);
    xhttp_params.setRequestHeader("Authorization", "Token " + token);
    xhttp_params.send();
    if (random_method) {
        var c = 0;
        var j = 0;
        for (j = 0; j < judges.length; ++j) {
            judge_id = judges[j];
            var hd = 0;
            for (hd = 0; hd < heats_dances.length; ++hd) {
                var params = heats_list[j].split('-')
                var p = 0;
                for (p = 0; p < params.length; ++p) {
                    c += 1;
                    var hhttp_param = new XMLHttpRequest();
                    hhttp_param.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                        }
                    }
                    var data = new FormData();
                    data.append("param_name", params[p].toString());
                    hhttp_param.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judges[j] + '/' + heats_dances[hd] + '/', true);
                    hhttp_param.setRequestHeader("Authorization", "Token " + token);
                    hhttp_param.send(data);

                }
            }

        }
        // alert(c)
        var c = 0
        for (j = 0; j < judges.length; ++j) {
            judge_id = judges[j];
            var sd = 0;
            for (sd = 0; sd < solo_dances.length; ++sd) {
                var params = solo_list[j].split('-')
                var p = 0;
                for (p = 0; p < params.length; ++p) {
                    c += 1
                    var hhttp_param = new XMLHttpRequest();
                    hhttp_param.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                        }
                    }
                    var data = new FormData();
                    data.append("param_name", params[p].toString());
                    hhttp_param.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judges[j] + '/' + solo_dances[sd] + '/', true);
                    hhttp_param.setRequestHeader("Authorization", "Token " + token);
                    hhttp_param.send(data);
                }
            }

        }
    }
    // alert(c)
    window.setInterval(function () {
        check_active_judges(session_id, token);
    }, 1000); // 1000 milliseconds (1 second)
    // check_active_judges(session_id, token);
}

function check_active_judges(session_id, token) {

    var hhttp_param = new XMLHttpRequest();
    hhttp_param.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < myArr.length; ++i) {
                var id_login = myArr[i].fk_judge.id_login;
                var active = myArr[i].active;
                if (active === 0) {
                    document.getElementById(id_login).style.color = 'red'
                } else {
                    document.getElementById(id_login).style.color = 'green'

                }
            }

        }
    }
    hhttp_param.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/active_judges/" + session_id + '/', true);
    hhttp_param.setRequestHeader("Authorization", "Token " + token);
    hhttp_param.send();

}

function startSession(session_id, user) {
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


    var hhttp_param = new XMLHttpRequest();
    hhttp_param.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            var i = 0;
            var active_judges = 0;
            for (i = 0; i < myArr.length; ++i) {
                var id_login = myArr[i].fk_judge.id_login;
                var active = myArr[i].active;
                if (active === 1) {
                    active_judges += 1;
                }
            }
            if (active_judges === myArr.length) {
                data = new FormData()
                data.append('start', 1);
                var xhttp_start_session = new XMLHttpRequest();
                xhttp_start_session.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                    }
                }
                xhttp_start_session.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/start_session/" + session_id + '/', true);
                xhttp_start_session.setRequestHeader("Authorization", "Token " + token);
                xhttp_start_session.send(data);

            } else {
                alert('Attenzione, attendere che TUTTI i giudici siano correttamente registrati')
            }

        }
    }
    hhttp_param.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/active_judges/" + session_id + '/', true);
    hhttp_param.setRequestHeader("Authorization", "Token " + token);
    hhttp_param.send();

}
