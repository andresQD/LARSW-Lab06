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
        }


    };
})();


