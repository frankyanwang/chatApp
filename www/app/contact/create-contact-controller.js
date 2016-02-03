(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('CreateContactController', CreateContactController);

    CreateContactController.$inject = ['force', '$ionicHistory'];

    /* @ngInject */
    function CreateContactController(force, $ionicHistory) {
        var vm = this;
        vm.property = 'CreateContactController';
        vm.contact = {};

        vm.save = function () {
            force.create('contact', vm.contact).then(function () {
                $ionicHistory.goBack();
            }, function () {
                alert("An error has occurred.");
            });
        }

        activate();

        ////////////////

        function activate() {

        }
    }
})();