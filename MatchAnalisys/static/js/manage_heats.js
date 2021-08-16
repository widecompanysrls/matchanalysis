function CopyToClipboard() {
    var r = document.createRange();
    r.selectNode(document.getElementById('clipboard'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById('clipboard_copied').style.display = 'block';
}

function init_page() {
    $('.grid-slider').slick({
        slide: '.grid-slide',
        slidesToShow: 1
    });
}

function set_unset_solo_heats(id) {
    var type = id.split('_')[0];
    var new_type = '';
    if (type === "solo") {
        new_type = 'heats';
    } else {
        new_type = 'solo';
    }

    var id_dance = id.split('_')[1]

    // console.log(id + document.getElementById(id).checked);
    // // console.log(new_type + '_' + id_dance + document.getElementById(new_type + '_' + id_dance).checked);
    // console.log(new_type + '_' + id_dance + !document.getElementById(new_type + '_' + id_dance).checked);
    var checkbox_clicked = document.getElementById(id);
    if (checkbox_clicked.checked) {
        document.getElementById(checkbox_clicked.id).checked = true
        document.getElementById(new_type + '_' + id_dance).checked = false;

    } else {
        document.getElementById(checkbox_clicked.id).checked = false
        document.getElementById(new_type + '_' + id_dance).checked = true;
    }
}

function update_table_solo_heats_params(dances) {
    var solo = '';
    var heats = '';
    for (var d = 0; d < dances.length; ++d) {
        var check_box = document.getElementById('solo_' + dances[d]);
        if (check_box.checked) {
            if (d !== dances.length - 1) {
                solo += dances[d] + '__';
            } else {
                solo += dances[d];
            }
        } else {
            if (d !== dances.length - 1) {
                heats += dances[d] + '__';
            } else {
                heats += dances[d];
            }
        }
    }
    if (heats[heats.length - 1] === '_') {
        heats = heats.slice(0, -2);
    }
    if (solo[solo.length - 1] === '_') {
        solo = solo.slice(0, -2);
    }
    var heats_params_number = document.getElementById('select_heats').value;
    var solo_params_number = document.getElementById('select_solo_dances').value;

    // alert(solo);
    // alert(heats);
    // alert(heats_params_number)
    // alert(solo_params_number)
    document.getElementById("solo_dances_hidden").value = solo.toString();
    document.getElementById("heats_dances_hidden").value = heats.toString();
    document.getElementById("solo_dances_params_number_hidden").value = solo_params_number.toString();
    document.getElementById("heats_dances_params_number_hidden").value = heats_params_number.toString();
    document.getElementById('form_match_modify').submit();


}
