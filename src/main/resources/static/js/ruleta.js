            var miRuleta = new Winwheel({
                'numSegments' : 5,
                'outerRadius' : 170,
                'segments' : [
                    {'fillStyle':'#f1c40f','text': 'Números'},
                    {'fillStyle':'#2ecc71','text': 'Geometría'},
                    {'fillStyle':'#e67e22','text': 'Rel. y Álgeb'},
                    {'fillStyle':'#e74c3c','text': 'Medidas'},
                    {'fillStyle':'#8e44ad','text': 'Estad y Prob'},
                    ],
                    'animation':{
                        'type' : 'spinToStop',
                        'duration' : 5,
                        'callbackFinished' : 'Mensaje()',
                        'callbackAfter': 'dibujarIndicador()'
                    }
            });
            function Mensaje() {
           var SegmentoSeleccionado = miRuleta.getIndicatedSegment();
           cargarPregunta(SegmentoSeleccionado.text);
           //alert("Elemento seleccionado:" + SegmentoSeleccionado.text + "!");
           //Reinicio de la ruleta (valor inicial) 
           setTimeout(function() {
           miRuleta.stopAnimation(false);
           miRuleta.rotationAngle = 0;
           miRuleta.draw();
           dibujarIndicador();
           }, 4500);

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
    
    function cargarPregunta(id){
            $.ajax({
            type:'get',
            url:"../pregunta/" + id+"",
            success: function(data){
                $('#espacioPregunta').empty().html(data);
            }
        });
    }