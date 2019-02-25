/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//init components

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

function checkAnswer(){
    var result = document.getElementById("question-result-container");
    result.classList.add("scale-in");
}
