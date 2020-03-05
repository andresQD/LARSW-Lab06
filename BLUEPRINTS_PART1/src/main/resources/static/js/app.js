/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


ap = apic;
var logica = (function () {
    var Nauthor;

    var cambiar = function (author) {
        Nauthor=author;
        $("#authorname").text(author);
        ap.getBlueprintsByAuthor(author,maper);
    };

    var maper = function (bp) {
        var lista = bp.map(function (nbp) {
            return{name: nbp.name, points: nbp.points.length};
        });

        var suma = lista.reduce(function (total, current) {
            return total + current.points;
        }, 0);

        $("#sumatotal").text(suma);
        
        $("#tabla").empty();
        lista.map(function (blueprint) {
            $("#tabla").append(
                    "<tr> <td>" +
                    blueprint.name +
                    "</td> <td>" +
                    blueprint.points +
                    //"</td> <td><form><button type='button' onclick='logica.printCanvas( \'' +nameAuthor +'' , '' +blueprint.name +'\')' >Open</button></form></td>"
                    "</td> <td><form><button type='button' onclick='logica.printCanvas( \"" +Nauthor +'" , "' +blueprint.name +"\")' >Open</button></form></td>"

                    );
        });

    };
    
    var printCanvas = function(author, name) {
      ap.getBlueprintsByNameAndAuthor(author, name, generateCanvas);  
    };
    var generateCanvas = function(bp) {
      $("#ActualBp").text(bp.name);
      var canvas = document.getElementById("myCanvas");
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      var anterior;
      bp.points.map(function(point) {
        if (!anterior) {
          anterior = point;
          context.moveTo(anterior.x, anterior.y);
        } else {
          context.lineTo(point.x, point.y);
          context.stroke();
        }
      });
    };	

    return {
        cambiar: cambiar,
        printCanvas: printCanvas
    };

})();
    