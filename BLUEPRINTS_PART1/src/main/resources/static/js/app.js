/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


ap = apic;
var logica = (function () {
    var Nauthor;
    var Lpoint = [];
    var NameBP;
    var LBP;
    var verificacion= true;


    var cambiar = function (author) {
        Nauthor = author;
        $("#authorname").text(author);
        ap.getBlueprintsByAuthor(author, maper);
    };

    var maper = function (bp) {
        if (verificacion){
            LBP = bp;
            verificacion=false;
        }
        
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
                    "</td> <td><form><button type='button' onclick='logica.printCanvas( \"" + Nauthor + '" , "' + blueprint.name + "\")' >Open</button></form></td>"

                    );
        });

    };


    var actualizarBP = function () {

        var nbp = LBP.filter(obj => {
            return obj.name === NameBP;
        })[0];
        ap.PutBlueprint(Nauthor, NameBP, JSON.stringify(nbp));
        ap.getBlueprintsByAuthor(Nauthor, maper);
        ap.getBlueprintsByNameAndAuthor(Nauthor, NameBP, generateCanvas);

    };
    
    var deleteBp = function(){
        puntos = [];
        tmp(NameBP, puntos);
        ap.deleteBp(Nauthor, NameBP );
        ap.getBlueprintsByAuthor(Nauthor,maper);
    };

    var printCanvas = function (author, name) {
        ap.getBlueprintsByNameAndAuthor(author, name, generateCanvas);
    };
    var generateCanvas = function (bp) {
        $("#ActualBp").text(bp.name);
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        var anterior;
        bp.points.map(function (point) {
            if (!anterior) {
                anterior = point;
                context.moveTo(anterior.x, anterior.y);
            } else {
                context.lineTo(point.x, point.y);
                context.stroke();
            }
        });
        canvas.addEventListener("click", function (evt) {
            var ClientRect = canvas.getBoundingClientRect();

            var x = Math.round(evt.clientX - ClientRect.left);
            var y = Math.round(evt.clientY - ClientRect.top);
            bp.points.push({x: x, y: y});
            Lpoint = bp.points;
            NameBP = bp.name;
            for (i = 0; i < LBP.length; i++) {
                if (NameBP === LBP[i].name) {
                    LBP[i].points = Lpoint;
                }
            }
            tmp(NameBP, Lpoint);


            /**ap.addblueprint(Nauthor, bp.name, x, y); **/
            $("#mensaje").text(bp.points);
        });
    };

    var createNewBluePrint = function () {
        if (Nauthor !== undefined) {
            puntos = [];
            tmp(NameBP, puntos);
            var newName = prompt("Cual es el nombre del nuevo blueprint?");
            if (newName !== null) {
                LBP.push({author: Nauthor, name: newName, points: puntos});
                var nbp = LBP.filter(obj => {
                    return obj.name === newName;
                })[0];
                ap.PutBlueprint(nbp);
            }
        }
    };
    
    

    var tmp = function (name, pt) {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        var anterior;
        pt.map(function (point) {
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
        printCanvas: printCanvas,
        actualizarBP: actualizarBP,
        tmp: tmp,
        createNewBluePrint: createNewBluePrint,
        deleteBp: deleteBp
    };

})();
    