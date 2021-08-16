function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById('clipboard'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById('clipboard_copied').style.display = 'block';

}

function show_hide_psw() {
    var x = document.getElementById("id_Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
