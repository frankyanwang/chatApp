(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['VLCObjectQueryManager'];

    /* @ngInject */
    function AccountListController(VLCObjectQueryManager) {
        var vm = this;
        vm.property = 'AccountListController';

        console.log("==AccountListController==");

        activate();

        ////////////////

        function activate() {
            
            VLCObjectQueryManager.findAll('account', {
                fields: "id, name",
                limit: 50
            }).then(
                function (accountArray) {
                    vm.accounts = accountArray;
                },
                function (error) {
                    alert("Error Retrieving Accounts");
                    console.log(error);
                });

        }
    }
})();