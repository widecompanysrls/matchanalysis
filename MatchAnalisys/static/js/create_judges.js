function showJudges(session_id, user, form) {
    document.getElementById('id_id_login').readOnly = true;
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
            // console.log('aaaaa' + this.responseText);
            token = (this.responseText.split('":"')[1].split('"')[0]);
        }
    });

    xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    xhr.send(data);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var myArr = JSON.parse(this.responseText);
            var out = "";
            var i;
            var select = document.getElementById("judges_to_delete");
            document.getElementById("judges_to_delete").options.length = 0;
            if (myArr.length > 0) {
                document.getElementById("button_next_judges").disabled = false;
            } else {
                document.getElementById("button_next_judges").disabled = true;
                document.getElementById('id_id_login').value = 'G1';

            }
            for (i = 0; i < myArr.length; i++) {
                var name = myArr[i].name;
                var surname = myArr[i].surname;
                var id_login = myArr[i].id_login;
                var opt = document.createElement('option');
                var judge = id_login + '_' + name + '_' + surname;
                opt.value = judge;
                opt.innerHTML = judge;
                select.appendChild(opt);
                document.getElementById('id_id_login').value = 'G' + (parseInt(id_login.split('G')[1]) + 1);
                var xhttp_active_judges = new XMLHttpRequest();
                xhttp_active_judges.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                    }
                }
                var data = new FormData();
                data.append("judge", name + '__' + surname + '__' + id_login);
                data.append("active", 0);
                xhttp_active_judges.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/active_judges/" + session_id + '/', true);
                xhttp_active_judges.setRequestHeader("Authorization", "Token " + token);
                xhttp_active_judges.send(data);

            }
        }
    }
    xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/judges/" + session_id + '/', false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Token " + token);
    xhttp.send();

    data = new FormData()
    data.append('start', 0);
    var xhttp_start_session = new XMLHttpRequest();
    xhttp_start_session.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
        }
    }
    xhttp_start_session.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/start_session/" + session_id + '/', true);
    xhttp_start_session.setRequestHeader("Authorization", "Token " + token);
    xhttp_start_session.send(data);
}

function delete_judge(session_id, user) {
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


    var e = document.getElementById("judges_to_delete");
    var judge = e.options[e.selectedIndex].text;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showJudges(session_id, user);
        }
    };
    xhttp.open("DELETE", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/judges/" + session_id + '/' + judge + '/', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Token " + token);

    xhttp.send();

}

function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById('clipboard'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById('clipboard_copied').style.display = 'block';

}
