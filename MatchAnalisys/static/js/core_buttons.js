function get_couple_number() {
    var e = document.getElementById("balli");
    var strUser = e.options[e.selectedIndex].text;
    alert(strUser);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function disable_highlighting_couple(session_id, token) {
    //
    // var user_decoded = atob(user);
    // username = user_decoded.split('-')[0]
    // password = user_decoded.split('-')[1]
    // var token;
    // var data = new FormData();
    // data.append("password", password);
    // data.append("username", username);
    //
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    //
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         // console.log(this.responseText);
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);

    var xhttp_params = new XMLHttpRequest();
    xhttp_params.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArrparams = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < myArrparams.length; i++) {
                var couple_number = myArrparams[i].number;
                document.getElementById(couple_number).style = "  background-color: #ffffff;color: #ff5855";
            }
        }
    }
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/couples/" + session_id + '/', false);
    xhttp_params.setRequestHeader("Content-type", "application/json");
    xhttp_params.setRequestHeader("Authorization", "Token " + token);

    xhttp_params.send();
}

function enable_disable_params_and_notes(session_id, enable, token) {
    // var user_decoded = atob(user);
    // username = user_decoded.split('-')[0]
    // password = user_decoded.split('-')[1]
    // var token;
    // var data = new FormData();
    // data.append("password", password);
    // data.append("username", username);
    //
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    //
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         // console.log(this.responseText);
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            var i;
            for (i = 0; i < myArr.length; i++) {
                var param_name = myArr[i].name;
                document.getElementById(param_name).disabled = enable !== true;
                document.getElementById("notes").disabled = enable !== true;
            }
        }
    }
    xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/params/" + session_id + '/', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Token " + token);

    xhttp.send();

}

function reset_couple_cookie() {
    document.cookie = "couple= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

function showVotationData(session_id, couple_number, judge, user) {
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

    var e = document.getElementById("balli");
    var dance = e.options[e.selectedIndex].text;
    disable_highlighting_couple(session_id, token);
    if (couple_number) {
        document.getElementById(couple_number).style = "background-color: #1F3351;color: #ff5855;border: 4px solid #1F3351 ";
        enable_disable_params_and_notes(session_id, true, token);
    } else {
        disable_highlighting_couple(session_id, token);
        enable_disable_params_and_notes(session_id, false, token);
        // change_dance(session_id, judge)
    }
    var judge_name = judge.split('  ')[0];
    var judge_surname = judge.split('  ')[1];
    var judge = judge_name + '_' + judge_surname;
    var actual_couple = getCookie("couple");
    var actual_dance = getCookie("dance");
    // alert(document.cookie);
    if (!actual_couple) {
        document.cookie = "couple=" + couple_number;
    }
    if (!actual_dance) {
        document.cookie = "dance=" + dance;
    }

    if (actual_couple !== couple_number) {
        var old_couple_number = getCookie("couple");
        var _params_number = getCookie("params_number");
        var i;
        var params = []
        var xhttp_params = new XMLHttpRequest();
        xhttp_params.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myArrparams = JSON.parse(this.responseText);
                var i;
                for (i = 0; i < myArrparams.length; i++) {
                    var param_name = myArrparams[i].name;
                    params.push(param_name);
                }
            }
        }
        xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/params/" + session_id + '/', false);
        xhttp_params.setRequestHeader("Content-type", "application/json");
        xhttp_params.setRequestHeader("Authorization", "Token " + token);

        xhttp_params.send();

        for (i = 0; i < _params_number; i++) {
            // alert(getCookie('p' + i));
            // var param = getCookie('p' + i);
            // var param_name = param.split('_')[0];
            var param_name = params[i];
            var param_vote;
            try {
                param_vote = document.getElementById(param_name).value;
            } catch (error) {
                // alert('erroroooo00');
                param_vote = 0;
            }
            if (!param_vote) {
                param_vote = 0;
            }
            var xhttp_update = new XMLHttpRequest();
            xhttp_update.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                }
            }

            // Push our data into our FormData object
            var data = new FormData();
            data.append("param", param_name);
            data.append("vote", parseInt(param_vote));

            // alert('post ' + param_name + ' ' + param_vote);
            xhttp_update.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + old_couple_number + '/' + judge + '/' + actual_dance + '/', true);
            // xhttp_update.setRequestHeader("Content-type", "application/json");
            xhttp_update.setRequestHeader("Authorization", "Token " + token);
            xhttp_update.send(data);

        }
        document.cookie = "couple=" + couple_number;
        document.cookie = "dance=" + dance;

        var xhttp_note = new XMLHttpRequest();
        xhttp_note.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
            }
        }

        // Push our data into our FormData object
        var data = new FormData();
        var notes = document.getElementById("notes").value;
        if (!notes) {
            notes = "";
        }
        data.append("notes", notes);

        // alert('post ' + param_name + ' ' + param_vote);
        xhttp_note.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/note/" + session_id + '/' + old_couple_number + '/' + judge + '/' + actual_dance + '/', true);
        // xhttp_update.setRequestHeader("Content-type", "application/json");
        xhttp_note.setRequestHeader("Authorization", "Token " + token);
        xhttp_note.send(data);


    }

    _params_number = getCookie('params_number');
    if (!_params_number) {
        var xhttp_params = new XMLHttpRequest();
        xhttp_params.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myArrparams = JSON.parse(this.responseText);
                var i;
                var params = [];
                var params_number = 0;
                for (i = 0; i < myArrparams.length; i++) {
                    var param_name = myArrparams[i].name;
                    var param_value = document.getElementById(param_name).value;
                    if (!param_value) {
                        param_value = 0;
                    }
                    params_number += 1;
                    params.push(param_name + '_' + param_value);

                }
                document.cookie = "params_number=" + (params_number);
                var i = 0;
                // for (i = 0; i < params.length; i++) {
                //     document.cookie = 'p' + i + '=' + params[i].split('_')[0] + '_' + params[i].split('_')[1];
                // }


            }
        }
        xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/params/" + session_id + '/', true);
        xhttp_params.setRequestHeader("Content-type", "application/json");
        xhttp_params.setRequestHeader("Authorization", "Token " + token);
        xhttp_params.send();
    } else {
        var xhttp_get = new XMLHttpRequest();
        xhttp_get.onreadystatechange = function () {
            if (this.readyState === 4) {
                var myArr = JSON.parse(this.responseText);
                var i;

                for (i = 0; i < myArr.length; i++) {
                    var param_name = myArr[i].fk_parameter.name;
                    var vote = myArr[i].vote;
                    // document.cookie = 'p' + i + '=' + param_name + '_' + vote;
                    document.getElementById(param_name).value = parseInt(vote);
                }

            }
        }
        xhttp_get.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', true);
        xhttp_get.setRequestHeader("Content-type", "application/json");
        xhttp_get.setRequestHeader("Authorization", "Token " + token);

        xhttp_get.send();


        // NOTE
        var xhttp_get_note = new XMLHttpRequest();
        xhttp_get_note.onreadystatechange = function () {
            if (this.readyState === 4) {
                var myArr = JSON.parse(this.responseText);
                try {
                    var notes = myArr[0].notes;
                } catch {
                    notes = "";

                }

                if (!notes) {
                    notes = "";
                }
                document.getElementById("notes").value = notes;
            }
        }
        xhttp_get_note.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/note/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', true);
        xhttp_get_note.setRequestHeader("Content-type", "application/json");
        xhttp_get_note.setRequestHeader("Authorization", "Token " + token);

        xhttp_get_note.send();
    }


}

function check_vote_range(id) {
    var n = document.getElementById(id).value;
    if (11 <= n <= 0) {
    } else {
        alert("Attenzione, il VOTO deve essere compreso nel range 0-10");
        document.getElementById(id).value = 0;
    }
}

function get_all_data(btn_id) {
    show_all_data()
    var e = document.getElementById("balli");
    var strUser = e.options[e.selectedIndex].text;

    var button = document.getElementById(btn_id);
    var couple_number = button.id;

    var elements = document.getElementById("params_form").elements;
    var params = [];
    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" && element.value === "")
            console.log("it's an empty textfield")
        else
            params.push(element.id + '-' + element.value);
    }
    var notes = document.getElementById("note").value;


    alert(strUser + ' ' + couple_number + ' ' + params + '  ' + notes);


}
