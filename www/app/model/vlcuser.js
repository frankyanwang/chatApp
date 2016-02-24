(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('User', ['SObject', 'lodash', function (SObject, lodash) {

            //Constructor, with class name
            function User(atts) {
                //declare properties.
                SObject.call(this, atts);
            };
            
        
            // subclass extends superclass using lodash .create.
            // also define its own public methods here.            
            User.prototype = lodash.create(SObject.prototype, {
                constructor: User,
                namesOfFieldsToRequest: ["name"]
            });

            return User;

            ////////////////

    }]);
})();