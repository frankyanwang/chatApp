(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['force', '$stateParams'];

    /* @ngInject */
    function ContactController(force, $stateParams) {
        var vm = this;
        vm.property = 'ContactController';


        activate();

        ////////////////

        function activate() {
            force.retrieve('contact', $stateParams.contactId, 'id,name,title,phone,mobilephone,email').then(
                function (contact) {
                    vm.contact = contact;
                });
        }
    }
})();