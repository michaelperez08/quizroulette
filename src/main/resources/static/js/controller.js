/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//init components

var gameParameters;
var gameData;
var roundData;

var indexQuestion;

function loadRouletteQuestions(questions) {
    gameData = new Object();
    questions.forEach(question => {
        var grado = gameData[question.grado];
        if (grado == undefined) {
            gameData[question.grado] = new Object();
        }
        var questionArea = gameData[question.grado][question.area];
        if (questionArea == undefined) {
            gameData[question.grado][question.area] = new Array();
        }
        gameData[question.grado][question.area].push(question);
    });
}

function spineRoulete() {
    var roulette = document.getElementById("roulette");
    roulette.classList.add("spine-image");

    setTimeout(function () {

        changeGameSection("roullete", "question");

    }, 3100);
}

function changeGameSection(toHide, toShow) {
    let ids = {roullete: "roullete-section", question: "question-section"};

    var n = document.getElementById(ids[toHide]);
    n.classList.remove("scale-in");
    n.classList.add("scale-out");

    setTimeout(function () {
        n.style.display = "none";

        n = document.getElementById(ids[toShow]);
        n.style.display = "block";
        n.classList.remove("scale-out");
        n.classList.add("scale-in");
    }, 600);
}

function checkAnswer() {
    let currentSelectedOption = roundData.currentQuestion.selectedOption;
    if (currentSelectedOption != undefined) {
        var isTheCorrectAnswer = currentSelectedOption.respuestaCorrecta;
        if (isTheCorrectAnswer) {
            roundData.correctAnswers = roundData.correctAnswers + 1;
        } else {
            //TODO
        }
        modalQuestionResult.showResult(isTheCorrectAnswer);
    } else {
        showToast('Debes seleccionar una opcion antes!');
    }
}

function startRouletteAnimation(element) {
    if (/*validation here*/true) {
        miRuleta.startAnimation();
    }
}

function nextQuestion() {
    if (indexQuestion < roundData.parameters.numberOfQuestions) {
        changeGameSection("question", "roullete");
    } else {
        let num = (roundData.correctAnswers) / (roundData.parameters.numberOfQuestions) * 100;
        let score = Math.round(num * 100) / 100;
        document.querySelector("#game-score").innerHTML = "Nota: " + score;
        doScrollSpy("#results");
    }
}

function captureParameters(element) {
    var selectedGrade = document.querySelector('#select-schoolGrade').value;
    var selectedArea = document.querySelector('#select-areas').parentNode.querySelector('.select-dropdown').value;
    var numberOfQuestions = parseInt(document.querySelector('#input-numberOfQuestions').value);
    var justCustomList = document.querySelector('#checkbox-just-custom-list').checked;

    var maxQuestions = document.querySelector('#input-numberOfQuestions').max;

    if (justCustomList) {
        loadRouletteQuestions(customQuestionList.questions);
    } else {
        loadRouletteQuestions(questionList.questions.concat(customQuestionList.questions));
    }

    if (gameData[selectedGrade]) {

        if (selectedGrade != '' && selectedArea != '' && !isNaN(numberOfQuestions)) {

            if (selectedArea.split(", ").length > 1) {

                if (numberOfQuestions <= maxQuestions) {

                    gameParameters = {};
                    gameParameters['grade'] = selectedGrade;
                    gameParameters['area'] = selectedArea;
                    gameParameters['numberOfQuestions'] = numberOfQuestions;

                    roundData = new Object();
                    roundData.parameters = gameParameters;

                    roundData.questions = {};
                    gameParameters.area.split(", ").forEach(function (a) {
                        let areaQuestions = gameData[gameParameters.grade][KeyValue[a]];
                        if (areaQuestions) {
                            roundData.questions[KeyValue[a]] = areaQuestions;
                        }
                    });
                    roundData.correctAnswers = 0;

                    iniciarRuleta();
                    if (Object.keys(roundData.questions).length == gameParameters.area.split(", ").length) {
                        if (roundData.questions != undefined) {
                            console.log(roundData);
                            indexQuestion = 0;
                            doScrollSpy('#questions');
                        } else {
                            showToast('No se econtraron preguntas para esos parametros!');
                        }
                    } else {
                        showToast('El grado ' + gameParameters.grade + ' solo posee preguntas para las area(s) \n' + Object.keys(roundData.questions).toString());
                    }

                } else {
                    showToast('No puede superar el número maximo de preguntas!');
                }
            } else {
                showToast('No puede seleccionar menos de dos areas!');
            }
        } else {
            showToast('Faltan parametros!');
        }
    }else {
        showToast('No existen preguntas para '+selectedGrade+' grado');
    }
}

function loadQuestionByArea(area) {
    indexQuestion++;
    var areaQuestions = roundData.questions[area];
    var question = areaQuestions[Math.floor(Math.random() * areaQuestions.length)];
    roundData.currentQuestion = question;
    console.log(question);

    /*var n = document.getElementById("roullete-section");
     n.classList.add("scale-out");*/

    document.querySelector("#title-questionNumber").textContent = "Pregunta #" + indexQuestion;
    document.querySelector("#title-questionArea").textContent = ValueKey[question.area];
    document.querySelector("#span-questionText").textContent = question.pregunta;

    let questionImgContainer = document.querySelector("#question-image-container");
    if (question.imagen != "") {
        questionImgContainer.style.display = "block";
        document.querySelector("#question-image").src = '../img/' + question.imagen;
    } else {
        questionImgContainer.style.display = "none";
    }

    var formQuestionOptions = document.querySelector("#form-questionOptions");
    clearOptions(formQuestionOptions);
    question.opciones.forEach((option, index) => {
        var newOption = createQuestionOption(option, index);
        formQuestionOptions.appendChild(newOption);
    });

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, null);


    //hides the roulette
    setTimeout(function () {
        changeGameSection("roullete", "question");
        resetearRuleta();
    }, 500);
}

function clearOptions(form) {
    var formQuestionOptions = form.children;
    let numberOfChilds = formQuestionOptions.length;
    if (formQuestionOptions != undefined) {
        for (var i = numberOfChilds - 1; i >= 0; i--) {
            let child = formQuestionOptions[i];
            child.remove();
        }
    }
}

function optionSelected(optionInput) {
    var formQuestionOptions = document.querySelector("#form-questionOptions");
    var cbOptions = formQuestionOptions.getElementsByTagName("input");
    var optionInputIndex = optionInput.dataset.index;
    roundData.currentQuestion.selectedOption = roundData.currentQuestion.opciones[optionInputIndex];
    console.log(roundData.currentQuestion.selectedOption);
    for (var i = 0; i < cbOptions.length; i++) {
        var inputOption = cbOptions[i];
        if (inputOption.dataset.index != optionInputIndex) {
            inputOption.checked = false;
        }
    }
}

function createQuestionOption(option, index) {
    var p = EC.createElement('p', null, null, null);
    var label = EC.createElement('label', null, null, p);
    var input = EC.createElement('input', {type: 'checkbox', onclick: function () {
            optionSelected(this);
        }, dataset: {index: index}}, null, label);
    var span = EC.createElement('span', null, option.texto, label);
    return p;
}

function showToast(message) {
    M.toast({html: message})
}

function doScrollSpy(id) {
    var a = document.querySelector('#scrollspy-helper');
    a.href = id;
    a.click();
}

function reaload() {
    window.location.replace("/");
}