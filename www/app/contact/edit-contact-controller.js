(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('editContactController', editContactController);

    editContactController.$inject = ['$stateParams', 'force', '$ionicHistory'];

    /* @ngInject */
    function editContactController($stateParams, force, $ionicHistory) {
        var vm = this;
        vm.property = 'editContactController';

        vm.save = function () {
            force.update('contact', vm.contact).then(
                function (response) {
                    $ionicHistory.goBack();
                },
                function () {
                    alert("An error has occurred.");
                });
        };


        activate();

        ////////////////

        function activate() {
            force.retrieve('contact', $stateParams.contactId, 'id,firstname,lastname,title,phone,mobilephone,email').then(
                function (contact) {
                    vm.contact = contact;
                });
        }
    }
})();