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

//initial configuration
loadRouletteQuestions();

function loadRouletteQuestions() {
    gameData = new Object();
    questionList.questions.forEach(question => {
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
        console.log("temrino de girar");

        var n = document.getElementById("roullete-section");
        n.classList.add("scale-out");

        setTimeout(function () {
            n.style.display = "none";

            n = document.getElementById("question-section");
            n.classList.add("scale-in");
        }, 500);

    }, 3100);
}

function checkAnswer() {
    var result = document.getElementById("question-result-container");
    result.classList.add("scale-in");
}

function startRouletteAnimation(element) {
    if (/*validation here*/true) {
        miRuleta.startAnimation();
    }
}

function captureParameters(element) {
    var selectedGrade = document.querySelector('#select-schoolGrade').value;
    var selectedArea = document.querySelector('#select-areas').parentNode.querySelector('.select-dropdown').value;
    var numberOfQuestions = parseInt(document.querySelector('#input-numberOfQuestions').value);

    var maxQuestions = document.querySelector('#input-numberOfQuestions').max;
    if (selectedGrade != '' && selectedArea != '' && !isNaN(numberOfQuestions)) {

        if (numberOfQuestions <= maxQuestions) {

            gameParameters = {};
            gameParameters['grade'] = selectedGrade;
            gameParameters['area'] = selectedArea;
            gameParameters['numberOfQuestions'] = numberOfQuestions;

            roundData = new Object();
            roundData.parameters = gameParameters;
            roundData.questions = gameData[gameParameters.grade];

            console.log(roundData);
            indexQuestion = 0;
            doScrollSpy('#questions');

        } else {
            showToast('No puede superar el número maximo de preguntas!');
        }
    } else {
        showToast('Faltan parametros!');
    }
}

function loadQuestionByArea(area) {
    indexQuestion++;
    var areaQuestions = roundData.questions[area];
    var question = areaQuestions[Math.floor(Math.random() * areaQuestions.length)];
    
    console.log(question);

    var n = document.getElementById("roullete-section");
    n.classList.add("scale-out");

    document.querySelector("#title-questionNumber").textContent = "Pregunta #"+indexQuestion;
    document.querySelector("#title-questionArea").textContent = question.area;
    document.querySelector("#span-questionText").textContent = question.pregunta;
    
    var formQuestionOptions = document.querySelector("#form-questionOptions");
    question.opciones.forEach((option, index)=>{
        var newOption = createQuestionOption(option, index);
        formQuestionOptions.appendChild(newOption);
    });
    
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, null);

    //hides the roulette
    setTimeout(function () {
        n.style.display = "none";
        n = document.getElementById("question-section");
        n.classList.add("scale-in");
        resetearRuleta();
    }, 500);
}

function optionSelected(optionInput){
    var formQuestionOptions = document.querySelector("#form-questionOptions");
    var cbOptions = formQuestionOptions.getElementsByTagName("input"); 
    for (var i = 0; i < cbOptions.length; i++) {
        var inputOption = cbOptions[i];
        if(inputOption.dataset.index!=optionInput.dataset.index){
            inputOption.checked = false;
        }
    }
}

function createQuestionOption(option, index){
    var p = EC.createElement('p',null,null,null);
    var label = EC.createElement('label',null,null,p);
    var input = EC.createElement('input',{type:'checkbox',onclick:function(){optionSelected(this);},dataset:{index:index}},null,label);
    var span = EC.createElement('span',null,option.texto,label);
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
