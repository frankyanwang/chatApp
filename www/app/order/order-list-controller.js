(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('OrderListController', OrderListController);

    OrderListController.$inject = ['VLCObjectQueryManager', 'Order'];

    /* @ngInject */
    function OrderListController(VLCObjectQueryManager, Order) {
        var vm = this;
        vm.property = 'OrderListController';

        console.log("===OrderListController===");

        activate();

        ////////////////

        function activate() {
            VLCObjectQueryManager.findAll(Order, {
                fields: Order.namesOfFieldsToRequest
            }).then(function (orderArray) {
                vm.orders = orderArray;
            }, function (error) {
                alert("Error Retrieving Orders");
                console.log(error);
            });

        }
    }
})();