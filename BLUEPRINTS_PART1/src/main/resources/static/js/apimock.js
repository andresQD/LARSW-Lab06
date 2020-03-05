/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var api = ( function(){
    var nuevosPlanes = [];
    
    nuevosPlanes['Al Pacino'] =[
        {
            author: "Al Pacino",
            name: "hunters",
            points:[
                {
                    x: 15,
                    y: 23
                },
                {
                    x: 20,
                    y: 17
                }
            ]
        },
        {
            author: "Al Pacino",
            name: "runners",
            points:[
                {
                    x: 17,
                    y: 20
                },
                {
                    x: 18,
                    y: 21
                }
            ]
        }
        
    ];
    
    nuevosPlanes['Victoria'] =[
        {
            author: "Victoria",
            name: "Feelings",
            points:[
                {
                    x: 22,
                    y: 21
                },
                {
                    x: 20,
                    y: 15
                }
            ]
        },
        {
            author: "Victoria",
            name: "Eci",
            points:[
                {
                    x: 16,
                    y: 23
                },
                {
                    x: 19,
                    y: 19
                }
            ]
        }
        
    ];
    
    
    return{
        
        getBlueprintsByAuthor: function(author, callback){
            callback(null,nuevosPlanes[author]);
        },
        
        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(null, blueprint)
        }
    };
})();
