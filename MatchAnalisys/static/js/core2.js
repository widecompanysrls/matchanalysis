function init_page(user, session_id) {
    $('.grid-slider').slick({
        slide: '.grid-slide',
        slidesToShow: 1
    });
    document.cookie = "couple= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";


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

function disable_highlighting_couples_and_votes(session_id, couples) {
    var i = 1;
    for (i = 1; i <= 10; ++i) {
        document.getElementById('vote_' + i).style.backgroundColor = '#5a7cb0';
    }
    document.getElementById('vote25').style.backgroundColor = '#5a7cb0';
    document.getElementById('vote5').style.backgroundColor = '#5a7cb0';
    document.getElementById('vote75').style.backgroundColor = '#5a7cb0';
    for (i = 0; i < couples.length; ++i) {
        let number = couples[i]
        document.getElementById('button_couple_' + couples[i]).style.border = 'none';


    }
    // document.getElementById('notes').value = '';

}

function add_event_listener_couples(couples, session_id, user, judge, params) {
    console.log('add_eventi_listener')

    for (i = 0; i < couples.length; ++i) {
        let number = couples[i]
        var btn = document.getElementById('button_couple_' + couples[i]);
        btn.addEventListener('click', function () {
            show_vote_data(session_id, number, judge, user, couples, params)
        });
    }
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
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);


    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;

    var params = [];
    var xhttp_params = new XMLHttpRequest();
    xhttp_params.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var p = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < p.length; ++i) {
                params.push(p[i].fk_paramether.name);
            }
        }
    });
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judge + '/' + dance + '/', false);
    // xhttp_params.setRequestHeader("Authorization", "Token " + token);
    xhttp_params.send();
    document.getElementById('param_name').innerHTML = params[0];
}

function check_votation_complete(session_id, couple_number, judge, user, params) {
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
    var judge_name = judge.split('  ')[0];
    var judge_surname = judge.split('  ')[1];
    var judge = judge_name + '_' + judge_surname;
    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var votes = [];
    console.log(dance);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        let vote;
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            if (myArr.length !== 0) {
                var i = 0;
                for (i = 0; i < myArr.length; ++i) {
                    votes.push(myArr[i].vote);
                }
            }
        }
    }

    xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', false);
    xhttp.setRequestHeader("Authorization", "Token " + token);
    xhttp.send(data);
    if (votes.length === params.length) {
        document.getElementById('button_couple_' + couple_number).style.backgroundColor = 'red'
    } else {
        document.getElementById('button_couple_' + couple_number).style.backgroundColor = 'white'

    }

}

function show_vote_data(session_id, couple_number, judge, user, couples, all_params) {
    var time_start = performance.now()
    console.log('show_vote_data');
    document.getElementById('note_saved').style.display = 'none';

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
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);


    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var param = document.getElementById("param_name").innerHTML;
    document.cookie = "couple=" + couple_number;

    //////
    var params = [];
    var xhttp_params = new XMLHttpRequest();
    xhttp_params.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var p = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < p.length; ++i) {
                params.push(p[i].fk_paramether.name);
            }
        }
    });
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judge + '/' + dance + '/', false);
    // xhttp_params.setRequestHeader("Authorization", "Token " + token);
    xhttp_params.send();

    ////

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        let vote;
        if (this.readyState === 4 && this.status === 200) {
            var myArr = JSON.parse(this.responseText);
            disable_highlighting_couples_and_votes(session_id, couples)

            document.getElementById('button_couple_' + couple_number).style.border = '1vw solid red'
            if (myArr.length !== 0) {
                vote = (myArr[0].vote).toString();

                if (vote.indexOf('.') > -1) {
                    let integer_vote = vote.split('.')[0]
                    let float_vote = vote.split('.')[1]
                    document.getElementById('vote_' + integer_vote).style.backgroundColor = 'green';
                    document.getElementById('vote' + float_vote).style.backgroundColor = 'green';
                } else {
                    document.getElementById('vote_' + vote).style.backgroundColor = 'green';
                }
            }
        }
    }

    xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/' + param + '/', true);
    // xhttp.setRequestHeader("Authorization", "Token " + token);
    xhttp.send();

    // show note
    var xhttp_get_note = new XMLHttpRequest();
    xhttp_get_note.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
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
            console.log(performance.now() - time_start)
        }
    }
    xhttp_get_note.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/note/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', true);
    xhttp_get_note.setRequestHeader("Content-type", "application/json");
    // xhttp_get_note.setRequestHeader("Authorization", "Token " + token);
    xhttp_get_note.send();
    console.log('fine ')
    console.log(performance.now() - time_start)

}

function change_dance(session_id, couples, params, user, judge) {
    console.log('cahneg_dance')
    // disable_highlighting_couples_and_votes(session_id, couples);
    document.getElementById('note_saved').style.display = 'none';
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
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);

    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var params = [];
    var xhttp_params = new XMLHttpRequest();
    xhttp_params.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var p = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < p.length; ++i) {
                params.push(p[i].fk_paramether.name);
            }
        }
    });
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judge + '/' + dance + '/', false);
    // xhttp_params.setRequestHeader("Authorization", "Token " + token);
    xhttp_params.send();
    document.getElementById('param_name').innerText = params[0];

    couple_number = getCookie('couple');
    show_vote_data(session_id, couple_number, judge, user, couples, params);
}

function change_param(session_id, couples, all_params, operation, user, judge) {
    console.log('cahnge_param')
    document.getElementById('note_saved').style.display = 'none';
    // disable_highlighting_couples_and_votes(session_id, couples);
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
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    //
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);

    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var params = [];
    var xhttp_params = new XMLHttpRequest();
    xhttp_params.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var p = JSON.parse(this.responseText);
            var i = 0;
            for (i = 0; i < p.length; ++i) {
                params.push(p[i].fk_paramether.name);
            }
        }
    });
    xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/random_method/" + session_id + '/' + judge + '/' + dance + '/', false);
    // xhttp_params.setRequestHeader("Authorization", "Token " + token);
    xhttp_params.send();
    var i = 0
    var actual_param = document.getElementById('param_name').innerText;
    var index = params.indexOf(actual_param);
    if (operation === 'fwd') {
        index = index + 1;
        if (index > params.length - 1) {
            index = 0
        }
    } else {
        index = index - 1;
        if (index < 0) {
            index = params.length - 1;
        }
    }
    couple_number = getCookie('couple');
    document.getElementById('param_name').innerText = params[index];
    show_vote_data(session_id, couple_number, judge, user, couples, params);

}

function post_vote(session_id, judge, user, couples, vote, params) {
    console.log('postvote')
    document.getElementById('note_saved').style.display = 'none';
    // var user_decoded = atob(user);
    // username = user_decoded.split('-')[0]
    // password = user_decoded.split('-')[1]
    // var token;
    // var data = new FormData();
    // data.append("password", password);
    // data.append("username", username);

    // var xhr = new XMLHttpRequest();
    //
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);
    var judge_name = judge.split('  ')[0];
    var judge_surname = judge.split('  ')[1];
    var judge = judge_name + '_' + judge_surname;
    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var param = document.getElementById("param_name").innerHTML;
    var couple_number = getCookie("couple");
    var float_vote_selected = vote.toString()
    var float_vote_enable = true;
    var final_vote = vote
    console.log(vote);
    if (vote.indexOf('.') > -1) {
        // controllo che ci sia almeno un voto intero
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            let vote;
            if (this.readyState === 4 && this.status === 200) {
                var myArr = JSON.parse(this.responseText);
                disable_highlighting_couples_and_votes(session_id, couples)
                document.getElementById('button_couple_' + couple_number).style.border = '1vw solid green'
                if (myArr.length !== 0) {
                    vote = (myArr[0].vote).toString();
                    if (vote === float_vote_selected) {
                        final_vote = 0;
                    } else {
                        if (vote !== '10') {
                            if (vote.indexOf('.') > -1) {
                                let integer_vote = vote.split('.')[0]
                                let float_vote = vote.split('.')[1]
                                float_vote_enable = true;
                                final_vote = integer_vote + float_vote_selected;
                            } else {
                                final_vote = vote + float_vote_selected;
                            }
                        } else {
                            float_vote_enable = false
                            alert('Il limite di voto è pari a 10');
                        }
                    }

                } else {
                    float_vote_enable = false;
                    alert('Prima selezionare un valore intero')
                }
            }
        }

        xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/' + param + '/', false);
        // xhttp.setRequestHeader("Authorization", "Token " + token);
        xhttp.send(data);


    }
    if (couple_number !== '' && float_vote_enable) {
        var xhttp_vote = new XMLHttpRequest();
        xhttp_vote.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
            }
        }

        var data = new FormData();
        data.append("param", param);
        data.append("vote", final_vote);
        xhttp_vote.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/vote/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', true);
        // xhttp_vote.setRequestHeader("Authorization", "Token " + token);
        xhttp_vote.send(data);
    }
    show_vote_data(session_id, couple_number, judge, user, couples);


}

function save_note(session_id, judge, user, vote) {
    console.log('save_note')
    // var user_decoded = atob(user);
    // username = user_decoded.split('-')[0]
    // password = user_decoded.split('-')[1]
    // var token;
    // var data = new FormData();
    // data.append("password", password);
    // data.append("username", username);
    // var xhr = new XMLHttpRequest();
    //
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         token = (this.responseText.split('":"')[1].split('"')[0]);
    //     }
    // });
    // xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
    // xhr.send(data);
    var judge_name = judge.split('  ')[0];
    var judge_surname = judge.split('  ')[1];
    var judge = judge_name + '_' + judge_surname;
    var dances = document.getElementById("balli")
    var dance = dances.options[dances.selectedIndex].text;
    var param = document.getElementById("param_name").innerHTML;
    var couple_number = getCookie("couple");
    var xhttp_note = new XMLHttpRequest();
    xhttp_note.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
        }
    }
    var data = new FormData();
    var notes = document.getElementById("notes").value;

    if (!notes) {
        notes = "";
    }
    data.append("notes", notes);
    xhttp_note.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/note/" + session_id + '/' + couple_number + '/' + judge + '/' + dance + '/', true);
    // xhttp_note.setRequestHeader("Authorization", "Token " + token);
    xhttp_note.send(data);
    document.getElementById('note_saved').style.display = 'block';

}

function confirm_finish() {
    var x;
    if (confirm("Premendo sul tasto OK verraà terminata la tua sessione di voto e tutti i voti mancanti non potranno più essere aggiunti") === true) {
        window.location.href = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + '/finishjudging/';
    } else {
        x = "You pressed Cancel!";
    }
    return x;
}