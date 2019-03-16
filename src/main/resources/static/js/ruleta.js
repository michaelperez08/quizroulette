var segmentoSeleccionado;
var KeyValue = {
    Números:'numeros',
    Geometría:'geometria',
    Álgebra:'algebra',
    Medidas:'medidas',
    Estadística:'estadistica'
};
var ValueKey = {
    numeros:'Números',
    geometria:'Geometría',
    algebra:'Álgebra',
    medidas:'Medidas',
    estadistica:'Estadística'
};
var miRuleta = new Winwheel({
    'numSegments': 5,
    'outerRadius': 170,
    'segments': [
        {'fillStyle': '#f1c40f', 'text': 'Números'},
        {'fillStyle': '#2ecc71', 'text': 'Geometría'},
        {'fillStyle': '#e67e22', 'text': 'Álgebra'},
        {'fillStyle': '#e74c3c', 'text': 'Medidas'},
        {'fillStyle': '#8e44ad', 'text': 'Estadística'},
    ],
    'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'callbackFinished': 'Mensaje()',
        'callbackAfter': 'dibujarIndicador()'
    }
});
function Mensaje() {
    segmentoSeleccionado = miRuleta.getIndicatedSegment();
    //cargarPregunta(SegmentoSeleccionado.text);
    console.log("Elemento seleccionado: " + segmentoSeleccionado.text + "!");
    //Reinicio de la ruleta (valor inicial) 
    
    loadQuestionByArea(KeyValue[segmentoSeleccionado.text]);
}

function resetearRuleta() {
    miRuleta.stopAnimation(false);
    miRuleta.rotationAngle = 0;
    miRuleta.draw();
    dibujarIndicador();
}

dibujarIndicador();

function dibujarIndicador() {
    var ctx = miRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(170, 0);
    ctx.lineTo(230, 0);
    ctx.lineTo(200, 40);
    ctx.lineTo(171, 0);
    ctx.stroke();
    ctx.fill();
}

// function cargarPregunta(id){
//     var route = "../pregunta/" + id+"";
//         $.get(route, function(res) {
//         if (res.length!=0) {
//           $(res).each(function(key, value) {
//                 $('#espacioPregunta').empty().html(value);
//           });
//         }
//       });

// }

/*function cargarPregunta(id) {
 $.ajax({
 type: 'get',
 url: "../pregunta/" + id + "",
 success: function (data) {
 $('#espacioPregunta').empty().html(data);
 }
 });
 }*/