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
//            force.logout();
        }

        activate();

        ////////////////

        function activate() {
            console.log('Current User ID: ' + force.getUserId());
//            $rootScope.currentUser = {
//                id: force.getUserId(),
//                email: 'sissi@cmtdemo.com'
//            };
        }
    }
})();