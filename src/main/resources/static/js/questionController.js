/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.addEventListener('DOMContentLoaded', () => {
    loadingDialogFullScreen = {
        ld: document.querySelector("#fullScreen-loadingDialog"),
        show: function () {
            this.ld.style.display = "block";
        },
        dismis: function () {
            this.ld.style.display = "none";
        }
    };
});

var elem = document.querySelector(".tabs");
var instance = M.Tabs.init(elem, {swipeable: false});

var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems, null);
var imgSrc = "";
var optionList = [];
var isSomeOptionSelected = false;
const saveQuestionURL = "http://localhost:8080/quizroullete/questions/save";

function previewImage() {
    var preview = document.querySelector('#img-preview'); //selects the query named img
    var file = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        imgSrc = preview.src;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = '';
        imgSrc = '';
    }
}

function addQuestionOption() {
    var option = document.querySelector("#optionText");
    var optionText = option.value;
    if (verifyOption(optionText)) {
        var newOption = createQuestionOption(optionText, 0);
        var form = document.querySelector("#form-questionOptions");
        form.appendChild(newOption);
        optionList.push({texto: optionText, respuestaCorrecta: false});
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
    selectOptionList(optionInput.nextElementSibling.textContent)
}

function selectOptionList(text) {
    isSomeOptionSelected = false;
    optionList.forEach(option => {
        if (option.texto == text) {
            option.respuestaCorrecta = !option.respuestaCorrecta;
            isSomeOptionSelected = option.respuestaCorrecta;
        } else {
            option.respuestaCorrecta = false;
        }
    });
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
        showMessage("El campo esta vacio");
    }
    return isNew;
}

function saveQuestion() {
    var selectSchoolGrade = document.getElementById("select-schoolGrade");
    var selectAreas = document.getElementById("select-areas");
    var textAreaQuestion = document.getElementById("textarea-question");

    if (validateQuestion(textAreaQuestion.value)) {
        var jsonRequest = buildJsonQuestion(selectSchoolGrade.value, selectAreas.value, textAreaQuestion.value, imgSrc, optionList);
        console.log(jsonRequest);

        loadingDialogFullScreen.show();
        axios.post(saveQuestionURL, jsonRequest)
                .then((response) => {
                    loadingDialogFullScreen.dismis();
                    console.log('question saved successfully');
                    console.log(response);
                    //
                    if (response.data == 200) {

                    }
                    loadingDialogFullScreen.dismis();
                })
                .catch((response) => {
                    console.log('catch response', response);
                    loadingDialogFullScreen.dismis();
                    //error(response.status, response.data.description);
                });
    }

}

function validateQuestion(taq) {
    let validate = false;
    if (taq) {
        if (optionList.length > 1) {
            if (isSomeOptionSelected) {
                validate = true;
            } else {
                showMessage("Debe selecionar una opción como correcta!")
            }
        } else {
            showMessage("Debe ingresar al menos dos opciones");
        }
    } else {
        showMessage("Debe ingresar el texto de la pregunta");
    }
    return validate;
}

function buildJsonQuestion(schoolGrade, areas, text, imgsrcm, options) {

    var json = {
        "grado": schoolGrade,
        "imagen": imgsrcm,
        "pregunta": text,
        "area": areas,
        "opciones": options
    };
    return json;
}