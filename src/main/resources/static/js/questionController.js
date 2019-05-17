/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var elem = document.querySelector(".tabs");
var instance = M.Tabs.init(elem, {swipeable: false});

var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems, null);

function previewImage() {
    var preview = document.querySelector('#img-preview'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    }
}

function addQuestionOption() {
    var option = document.querySelector("#optionText");
    var optionText = option.value;
    if (verifyOption(optionText)) {
        var newOption = createQuestionOption(optionText, 0);
        var form = document.querySelector("#form-questionOptions");
        form.appendChild(newOption);
        option.value = "";
    }
}

function createQuestionOption(option, index) {
    var p = EC.createElement('p', null, null, null);
    var label = EC.createElement('label', null, null, p);
    var input = EC.createElement('input', {type: 'checkbox', onclick: function () {
            optionSelected(this);
        }, dataset: {text: option}}, null, label);
    var span = EC.createElement('span', null, option, label);
    return p;
}

function showMessage(message) {
    M.toast({html: message});
}

function optionSelected(optionInput) {
    var cbOptions = document.querySelectorAll('input[type=checkbox]');
    var optionInputText = optionInput.dataset.text;
    for (var i = 0; i < cbOptions.length; i++) {
        var inputOption = cbOptions[i];
        if (inputOption.dataset.text != optionInputText) {
            inputOption.checked = false;
        }
    }
}

function verifyOption(newOption) {
    if (newOption) {
        var isNew = true;
        var cbOptions = document.querySelectorAll('input[type=checkbox]');
        for (var i = 0; i < cbOptions.length; i++) {
            var inputOption = cbOptions[i];
            if (inputOption.dataset.text == newOption) {
                isNew = false;
                showMessage("La opción ya se ingreso");
            }
        }
    } else {
        isNew = false;
        showMessage("La opcion ya se ingreso");
    }
    return isNew;
}