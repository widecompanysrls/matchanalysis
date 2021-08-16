function enter_session() {

    var form = document.getElementById('enter_session_form');
    var session_id = document.getElementById('id_session_id').value;
    var session_psw = document.getElementById('id_session_psw').value;

    if (form.style.display === 'block') {
        if (session_id !== '') {
            if (session_psw !== '') {
                form.submit();
            } else {
                document.getElementById('error_label').innerHTML = 'Inserire una password';
            }
        } else {
            document.getElementById('error_label').innerHTML = 'Inserire un ID Sessione';
        }
    } else {
        form.style.display = 'block';
    }
}
