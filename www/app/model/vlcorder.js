(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('Order', ['SObject', 'lodash', function (SObject, lodash) {

            //Constructor, with class name
            function Order(atts) {
                //declare properties.
                SObject.call(this, atts);
            };


            // subclass extends superclass using lodash .create.
            // also define its own public methods here.            
            Order.prototype = lodash.create(SObject.prototype, {
                constructor: Order
            });

            var namesOfFieldsToRequest = ["Account.name", "EffectiveDate", "OrderNumber", "TotalAmount","Status"];

            // public Static Properties.
            // Prevent modifications to private variable incase we are reusing it.
            Order.namesOfFieldsToRequest = angular.copy(namesOfFieldsToRequest);

            return Order;

            ////////////////

    }]);
})();