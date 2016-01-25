(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('createContactController', createContactController);

    createContactController.$inject = ['force', '$ionicHistory'];

    /* @ngInject */
    function createContactController(force, $ionicHistory) {
        var vm = this;
        vm.property = 'createContactController';
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