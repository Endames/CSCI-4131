$(function() {
    //define the default values
    var numwords = 4;
    var digits = false;
    var caps = false;
    var spaces = true;
    var wordlength = 4;

    function onoff(b) {
        return b ? 'on' : 'off';
    }

    function update_password() {
      //use this function to add to a table
        $('#numwords').text(numwords);
        $('#wordlength').text(wordlength);
        $('#digits').text('digits: ' + onoff(digits));
        $('#caps').text('caps: ' + onoff(caps));
        $('#spaces').text('spaces: ' + onoff(spaces));
      //add on long is the String
      ;


        var password_div = $('#password');

        if (window.getSelection && window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }


        // if space is true add spaces inbetween the words//
        var spacer = '';

        if (spaces) {
            spacer = ' ';
        }

        pw_gen(function(words, entropy) {password_div.text(words.join(spacer));}, numwords, digits, caps, wordlength);

        saveHistory();
    }





    function selectText(node) {
        if (document.selection) {
            var div = document.body.createTextRange();

            div.moveToElementText(node);
            div.select();
        } else {
            var div = document.createRange();
            div.setStartBefore(node);
            div.setEndAfter(node);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(div);
        }
    }

    function copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    $('#generate_button').click(function(e) {
        update_password();
    });

    $('#more_words').click(function(e) {
        if (numwords < 10) numwords++;
        update_password();
    });

    $('#less_words').click(function(e) {
        if (numwords > 1) numwords--;
        update_password();
    });

    $('#digits').click(function(e) {
        digits = !digits;
        update_password();
    });

    $('#caps').click(function(e) {
        caps = !caps;
        update_password();
    });

    $('#spaces').click(function(e) {
        spaces = !spaces;
        update_password();
    });

    $('#select').click(function(e) {
        selectText($('#password').get(0));
    });

    $('#longer_words').click(function(e) {
        if(wordlength < 8) wordlength++;
        update_password();
    });

    $('#shorter_words').click(function(e) {
        if(wordlength > 2) wordlength--;
        update_password();
    });



    function saveHistory()  {
      tbl = document.querySelector("#historytable");
      for(i = 1; i < 11; i++)
      {
        row = document.createElement("tr");
        cell = document.createElement("td");
        cell.innerText = words;
        row.appendChild(cell);
        tbl.appendChild(row);
      }
    }

    update_password();




});
