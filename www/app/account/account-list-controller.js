(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['VLCObjectQueryManager', 'Account'];

    /* @ngInject */
    function AccountListController(VLCObjectQueryManager, Account) {
        var vm = this;
        vm.property = 'AccountListController';

        console.log("==AccountListController==");

        activate();

        ////////////////

        function activate() {
            
            VLCObjectQueryManager.findAll(Account, {
                fields: Account.namesOfFieldsToRequest,
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