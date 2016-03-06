(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$stateParams','VLCObjectQueryManager','Account'];

    /* @ngInject */
    function AccountController($stateParams, VLCObjectQueryManager, Account) {
        var vm = this;
        vm.property = 'AccountController';

        activate();

        ////////////////

        function activate() {
            VLCObjectQueryManager.find(Account, $stateParams.accountId, {}).then(
                function (account) {
                    vm.account = account;
                }, function(e){
                    alert("Error Retrieving AccountId " + $stateParams.accountId);
                    console.log(error);                    
                });
        }
    }
})();