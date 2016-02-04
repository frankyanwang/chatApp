(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('AccountListController', AccountListController);

    AccountListController.$inject = ['force'];

    /* @ngInject */
    function AccountListController(force) {
        var vm = this;
        vm.property = 'AccountListController';
        
        console.log("==AccountListController==");

        activate();

        ////////////////

        function activate() {
            force.query('select id, name from account limit 50').then(
                function (data) {
                    vm.accounts = data.records;
                });
        }
    }
})();