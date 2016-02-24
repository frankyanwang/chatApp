(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$stateParams','VLCObjectQueryManager'];

    /* @ngInject */
    function AccountController($stateParams, VLCObjectQueryManager) {
        var vm = this;
        vm.property = 'AccountController';

        activate();

        ////////////////

        function activate() {
            VLCObjectQueryManager.find('account', $stateParams.accountId, {fields:'id,name,phone,billingaddress'}).then(
                function (account) {
                    vm.account = account;
                }, function(e){
                    alert("Error Retrieving AccountId " + $stateParams.accountId);
                    console.log(error);                    
                });
        }
    }
})();