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
                constructor: Contact
            });
            
            var namesOfFieldsToRequest = ["id", "name", "title", "phone", "mobilephone", "email"];
            
            // public Static Properties.
            // Prevent modifications to private variable incase we are reusing it.
            Contact.namesOfFieldsToRequest = angular.copy(namesOfFieldsToRequest);

            return Contact;

            ////////////////

    }]);
})();