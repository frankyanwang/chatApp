(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('baseController', baseController);

    baseController.$inject = ['force','$scope'];

    /* @ngInject */
    function baseController(force, $scope) {
        var vm = this;
        vm.property = 'baseController';

        $scope.logout = function () {
            console.log("base controller logout!");
            alert("logout");
//            force.logout();
        }

        activate();

        ////////////////

        function activate() {}
    }
})();