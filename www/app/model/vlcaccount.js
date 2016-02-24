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
                constructor: Account,
                namesOfFieldsToRequest: ["id", "name", "title", "phone", "mobilephone", "email"]
            });

            return Account;

            ////////////////

    }]);
})();