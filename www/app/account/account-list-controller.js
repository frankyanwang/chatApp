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

                alert("Account Test");
        
        console.log("Account Frank is here");

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