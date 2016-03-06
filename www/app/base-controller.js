(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('baseController', baseController);

    baseController.$inject = ['force','$scope','$rootScope'];

    /* @ngInject */
    function baseController(force, $scope, $rootScope) {
        var vm = this;
        vm.property = 'baseController';

        $scope.logout = function () {
            console.log("base controller logout!");
            alert("logout");
            force.discardToken();
        }

        activate();

        ////////////////

        function activate() {
        }
    }
})();