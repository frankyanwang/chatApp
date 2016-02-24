(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('Contact', ['SObject', 'lodash', function (SObject, lodash) {

            //Constructor, with class name
            function Contact(atts) {
                //declare properties.
                SObject.call(this, atts);
            };
            
        
            // subclass extends superclass using lodash .create.
            // also define its own public methods here.            
            Contact.prototype = lodash.create(SObject.prototype, {
                constructor: Contact,
                namesOfFieldsToRequest: ["id", "name", "title", "phone", "mobilephone", "email"]
            });

            return Contact;

            ////////////////

    }]);
})();