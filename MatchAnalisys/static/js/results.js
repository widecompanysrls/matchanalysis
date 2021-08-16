// function de_highlight_buttons() {
//     var ele = document.getElementsByClassName('button');
//     for (var i = 0; i < ele.length; i++) {
//         ele[i].style.border = '';
//     }
//
//
// }
//
// function showVotations(session_id, couple_number, user, number) {
//     if (couple_number === number) {
//         document.getElementById('couple_blocked').style.display = 'none';
//         var user_decoded = atob(user);
//         username = user_decoded.split('-')[0]
//         password = user_decoded.split('-')[1]
//         var token;
//         var data = new FormData();
//         data.append("password", password);
//         data.append("username", username);
//
//         var xhr = new XMLHttpRequest();
//         xhr.withCredentials = true;
//
//         xhr.addEventListener("readystatechange", function () {
//             if (this.readyState === 4) {
//                 // console.log(this.responseText);
//                 token = (this.responseText.split('":"')[1].split('"')[0]);
//             }
//         });
//         de_highlight_buttons()
//         var btn = document.getElementById(couple_number);
//         btn.style.border = '3px solid red';
//
//         xhr.open("POST", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api-token-auth/?format=json", false);
//         xhr.send(data);
//         // Params
//         var params = Array();
//         var xhttp_params = new XMLHttpRequest();
//         xhttp_params.onreadystatechange = function () {
//             if (this.readyState === 4 && this.status === 200) {
//                 var myArr = JSON.parse(this.responseText);
//                 var i;
//                 for (i = 0; i < myArr.length; i++) {
//                     params.push(myArr[i].name);
//                 }
//             }
//         }
//         xhttp_params.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/params/" + session_id + '/', false);
//         xhttp_params.setRequestHeader("Content-type", "application/json");
//         xhttp_params.setRequestHeader("Authorization", "Token " + token);
//
//         xhttp_params.send();
//
//         // Dances
//         var dances = Array();
//         var xhttp_dance = new XMLHttpRequest();
//         xhttp_dance.onreadystatechange = function () {
//             if (this.readyState === 4 && this.status === 200) {
//                 var myArr = JSON.parse(this.responseText);
//                 var i;
//                 document.getElementById("div").innerHTML = "";
//
//                 for (i = 0; i < myArr.length; i++) {
//                     dances.push(myArr[i].name);
//                 }
//
//             }
//         }
//
//
//         xhttp_dance.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/dances/" + session_id + '/', false);
//         xhttp_dance.setRequestHeader("Content-type", "application/json");
//         xhttp_dance.setRequestHeader("Authorization", "Token " + token);
//
//         xhttp_dance.send();
//
//         // Judges
//         var judges = Array();
//         var xhttp_judge = new XMLHttpRequest();
//         xhttp_judge.onreadystatechange = function () {
//             if (this.readyState === 4 && this.status === 200) {
//                 var myArr = JSON.parse(this.responseText);
//                 var i;
//                 for (i = 0; i < myArr.length; i++) {
//                     judges.push(myArr[i].name + '_' + myArr[i].surname);
//                 }
//             }
//         }
//         xhttp_judge.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/judges/" + session_id + '/', false);
//         xhttp_judge.setRequestHeader("Content-type", "application/json");
//         xhttp_judge.setRequestHeader("Authorization", "Token " + token);
//
//         xhttp_judge.send();
//
//
//         // Iteration
//         var d = 0;
//         for (d = 0; d < dances.length; d++) {
//             document.getElementById("div").innerHTML += "<label style='font-size: 3vw;color: #022031'>" + dances[d] + "</label><br><table id='" + dances[d] + '_' + session_id + "'style='background-color:#b44f4f'></table>";
//             var table = document.getElementById(dances[d] + '_' + session_id);
//             var row_title = table.insertRow(0);
//
//             var j = 0;
//             var cell_title = row_title.insertCell(0);
//             for (j = 0; j < judges.length; j++) {
//
//                 var cell_title = row_title.insertCell(j + 1);
//                 cell_title.innerHTML = judges[j].split('_')[0] + '  ' + judges[j].split('_')[1];
//             }
//             var p = 0;
//             for (p = 0; p < params.length; p++) {
//                 var row = table.insertRow(p + 1);
//                 var cell = row.insertCell(0);
//                 cell.innerHTML = params[p];
//
//                 var j = 0;
//                 for (j = 0; j < judges.length; j++) {
//
//
//                     var xhttp_final = new XMLHttpRequest();
//                     xhttp_final.onreadystatechange = function () {
//                         if (this.readyState === 4 && this.status === 200) {
//                             var myArr = JSON.parse(this.responseText);
//                             var k;
//                             var out;
//                             for (k = 0; k < myArr.length; k++) {
//                                 var param_name = myArr[k].fk_parameter.name;
//                                 alert(myArr[k].vote)
//                                 try {
//                                     var vote = myArr[k].vote;
//                                 } catch (e) {
//                                     var vote = 0
//
//                                 }
//
//                                 var cell = row.insertCell(k + 1);
//                                 cell.innerHTML = vote;
//                             }
//                         }
//                     }
//                     xhttp_final.open("GET", window.location.protocol + "//"
//                         + window.location.hostname + ":" + window.location.port +
//                         "/api/vote/" + session_id + '/' + couple_number + '/' + judges[j] + '/' + dances[d] + '/' + params[p] + '/', false);
//                     xhttp_final.setRequestHeader("Content-type", "application/json");
//                     xhttp_final.setRequestHeader("Authorization", "Token " + token);
//
//                     xhttp_final.send();
//                 }
//             }
//         }
//
//
//         //note
//         var d1 = 0;
//         for (d1 = 0; d1 < dances.length; d1++) {
//             var table1 = document.getElementById(dances[d1] + '_' + session_id);
//             row = document.createElement("tr");
//             table1.appendChild(row);
//             var cell1 = row.insertCell(0)
//             cell1.innerHTML = 'Note'
//
//             var j1 = 0;
//             for (j1 = 0; j1 < judges.length; j1++) {
//                 var xhttp_final_note = new XMLHttpRequest();
//                 xhttp_final_note.onreadystatechange = function () {
//                     if (this.readyState === 4 && this.status === 200) {
//                         var myArr = JSON.parse(this.responseText);
//                         var k;
//                         var out;
//                         for (k = 0; k < myArr.length; k++) {
//                             var note = myArr[k].notes;
//                             if (note === '') {
//                                 note = ''
//                             }
//                             var cell = row.insertCell(k + 1);
//                             cell.innerHTML = note;
//                         }
//                     }
//                 }
//                 xhttp_final_note.open("GET", window.location.protocol + "//"
//                     + window.location.hostname + ":" + window.location.port +
//                     "/api/note/" + session_id + '/' + couple_number + '/' + judges[j1] + '/' + dances[d1] + '/', false);
//                 xhttp_final_note.setRequestHeader("Content-type", "application/json");
//                 xhttp_final_note.setRequestHeader("Authorization", "Token " + token);
//                 xhttp_final_note.send();
//             }
//         }
//
//     } else {
//         document.getElementById('couple_blocked').style.display = 'block';
//         document.getElementById('div').innerHTML = '';
//
//     }
// }
