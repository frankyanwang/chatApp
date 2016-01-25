(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['force','$stateParams'];

    /* @ngInject */
    function AccountController(force, $stateParams) {
        var vm = this;
        vm.property = 'AccountController';

        activate();

        ////////////////

        function activate() {
            force.retrieve('account', $stateParams.accountId, 'id,name,phone,billingaddress').then(
                function (account) {
                    vm.account = account;
                });
        }
    }
})();