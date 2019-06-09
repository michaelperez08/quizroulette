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
    
    options = {dismissible: false};
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    
    confirmationModal = {
        cm: M.Modal.getInstance(document.getElementById("confirmation_modal")),
        text: document.getElementById("cm-text"),
        id: null,
        deleteButton: document.getElementById("cm-delete"),
        show : function(text, id){
            this.text.innerHTML = text;
            this.cm.open();
            this.id = id;
        },
        delete: function(){
            deleteQuestionRequest(this.id);
        },
        close: function(){
            this.cm.close();
        }
    }
    
    loadCollection();
    axios.defaults.headers.get['Content-Type'] = 'application/json';
});

var elem = document.querySelector(".tabs");
var instance = M.Tabs.init(elem, {swipeable: false});

var elems = document.querySelectorAll('select');
var instances = M.FormSelect.init(elems, null);
var imgSrc = "";
var optionList = [];
var isSomeOptionSelected = false;
const baseURL = "http://localhost:8080/";
const saveQuestionURL = "quizroulette/questions/save";
const deleteQuestionURL = "quizroulette/questions/delete/";

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

function saveQuestionRequest() {
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
                    if (response.status == 200) {
                        customQuestionList.questions = response.data.questions;
                        loadCollection();
                        showMessage("Pregunta guardada!");
                        cleanNewQuestionForm();
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

function deleteQuestionRequest(id) {
    loadingDialogFullScreen.show();
    axios.get(deleteQuestionURL + id)
            .then((response) => {
                loadingDialogFullScreen.dismis();
                console.log(response);
                //
                if (response.status == 200) {
                    console.log('question deleted successfully');
                    customQuestionList.questions = response.data.questions;
                    loadCollection();
                    showMessage("Pregunta eliminada!");
                    confirmationModal.close();
                }
                loadingDialogFullScreen.dismis();
            })
            .catch((response) => {
                console.log('catch response', response);
                loadingDialogFullScreen.dismis();
            });
}

function generateID() {
    var now = new Date();

    var timestamp = now.getFullYear().toString();
    timestamp += now.getMonth().toString();
    timestamp += now.getDate().toString();
    timestamp += now.getHours().toString();
    timestamp += now.getMinutes().toString();
    timestamp += now.getSeconds().toString();
    timestamp += now.getMilliseconds().toString();

    console.log("unique ID ", timestamp);
    return parseInt(timestamp);
}

function cleanNewQuestionForm() {
    var selectSchoolGrade = document.getElementById("select-schoolGrade");
    var selectAreas = document.getElementById("select-areas");
    var textAreaQuestion = document.getElementById("textarea-question");
    var optionText = document.getElementById("optionText");

    textAreaQuestion.value = "";
    optionText.value = "";

    var form = document.getElementById("form-questionOptions");
    removeAllChilds(form);
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
        "id": generateID(),
        "grado": schoolGrade,
        "imagen": imgsrcm,
        "pregunta": text,
        "area": areas,
        "opciones": options
    };
    return json;
}

function removeAllChilds(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }

}

function loadCollection() {
    const newElement = EC.createElement_V2;
    const ul = document.querySelector("#cq-collection");

    removeAllChilds(ul);

    customQuestionList.questions.forEach((element) => {
        var li = newElement("li", {className: "collection-item"},
                newElement("div", null, element.pregunta,
                        newElement("a", {className: "secondary-content floatRight", href: "#!", onclick: confirmationModal.show.bind(confirmationModal, element.pregunta, element.id)},
                                newElement("i", {className: "material-icons red-text"}, "close")
                                ),
                        newElement("a", {className: "secondary-content floatRight", href: "#!", onclick: editQuestion.bind(this, element.id)},
                                newElement("i", {className: "material-icons blue-text"}, "edit")
                                )
                        )
                );
        ul.appendChild(li);
    });
}

function editQuestion(id){
    console.log("ID ",id)
}

function findQuestionByID(array, id){
    return array.questions.find(elem=>{
        return elem.id == id;
    });
}