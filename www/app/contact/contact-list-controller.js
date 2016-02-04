(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactListController', ContactListController);

    ContactListController.$inject = ['force'];

    /* @ngInject */
    function ContactListController(force) {
        var vm = this;
        vm.property = 'ContactListController';

        console.log("==ContactListController==");


        activate();

        ////////////////

        function activate() {
            force.query('select id, name, title from contact limit 50').then(
                function (data) {
                    vm.contacts = data.records;
                },
                function (error) {
                    alert("Error Retrieving Contacts");
                    console.log(error);
                });
        }
    }
})();