/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Url = 'http://localhost:8080/blueprints/';
apic = (function () {
    return {
		
        getBlueprintsByAuthor: function (author, callback) {
			
           $.ajax({
                dataType: "json",
                url: Url+author,
                success: function (data) {
                    callback(data);
                }
            });
        },
	getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.ajax({
                dataType: "json",
                url: Url+author+'/'+name,
                success: function (data) {
                    callback(data);
                }
            });
        },
        PutBlueprint: function (author, name, nbp){
            $.ajax({
            url: Url+author+'/'+name,
            type: 'PUT',
            data: nbp,
            contentType: "application/json"
            });
        },
        
        PostBlueprint: function (nbp){
            $.ajax({
            url: Url,
            type: 'POST',
            data: nbp,
            contentType: "application/json"
            });
            
            putPromise.then(
            function () {
                console.info("OK");
            },
            function () {
                console.info("ERROR");
            }
        );

        putPromise.then(blueprintGet);
        },
        
        deleteBp : function(author, name){
            $.ajax({
            url: Url+author+'/'+name,
            type: 'DELETE',
            contentType: "application/json"
            });
            
            deletePromise.then(
            function () {
                console.info('Delete OK');
            },
            function () {
                console.info('Delete NOK');
            }
        );

        return deletePromise;
        }


    };
})();


