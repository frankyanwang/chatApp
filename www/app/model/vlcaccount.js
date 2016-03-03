(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('Account', ['SObject', 'lodash', function (SObject, lodash) {

            //Constructor, with class name
            function Account(atts) {
                //declare properties.
                SObject.call(this, atts);
            };
            
        
            // subclass extends superclass using lodash .create.
            // also define its own public methods here.            
            Account.prototype = lodash.create(SObject.prototype, {
                constructor: Account
            });
            
            var namesOfFieldsToRequest = ["id", "name"];
            
            // public Static Properties.
            // Prevent modifications to private variable incase we are reusing it.
            Account.namesOfFieldsToRequest = angular.copy(namesOfFieldsToRequest);
            
            //this is optional unless objectType is different from object name.
//            Account.objectType = "Account";

            return Account;

            ////////////////

    }]);
})();