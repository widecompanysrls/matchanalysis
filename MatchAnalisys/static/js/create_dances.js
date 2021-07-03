function showDances(session_id, user) {
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
        if (this.readyState == 4 ) {
            // alert(this.responseText);
            var myArr = JSON.parse(this.responseText);
            var out = "";
            var i;
            var select = document.getElementById("dances_to_delete");
            document.getElementById("dances_to_delete").options.length = 0;
            if (myArr.length > 0) {
                document.getElementById("button_next_dances").disabled = false;
            } else {
                document.getElementById("button_next_dances").disabled = true;
            }
            for (i = 0; i < myArr.length; i++) {
                var name = myArr[i].name;
                var opt = document.createElement('option');
                opt.value = name;
                opt.innerHTML = name;
                select.appendChild(opt);
            }
        }
    }
    xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/dances/" + session_id+'/', false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Token " + token);
    xhttp.send();
}

function delete_dance(session_id, user) {
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


    var e = document.getElementById("dances_to_delete");
    var dance_name = e.options[e.selectedIndex].text;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showDances(session_id, user);
        }
    };
    xhttp.open("DELETE", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/dances/" + session_id + '/' + dance_name+'/', true);
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
