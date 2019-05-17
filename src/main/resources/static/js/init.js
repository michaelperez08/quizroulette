/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modalQuestionResult;

document.addEventListener('DOMContentLoaded', function () {
    var options = null;

    options = {throttle: 100, scrollOffset: 0, activeClass: "active"};

    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems, options);

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, null);

    options = {dismissible: false};
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);


    modalQuestionResult = M.Modal.getInstance(document.getElementById("modal-questionResult"));
    modalQuestionResult.showResult = function (flag) {
        let resultsDataSet = {
            true: {text: 'Respuesta Correcta!', textClass: 'header center green-text', icon: 'check'},
            false: {text: 'Respuesta Incorrecta!', textClass: 'header center red-text', icon: 'close'}
        };
        var h1 = this.el.querySelector("#h1-MQR-Text");
        var icon = this.el.querySelector("#i-MQR-Icon");
        h1.innerText = resultsDataSet[flag].text;
        h1.className = resultsDataSet[flag].textClass;
        icon.innerText = resultsDataSet[flag].icon;
        this.open();
    };
    modalQuestionResult.continue = function () {
        this.close();
        nextQuestion();
    };
    loadRouletteQuestions();

});
