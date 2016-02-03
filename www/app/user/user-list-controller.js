(function() {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['force'];

    /* @ngInject */
    function UserListController(force){
        var vm = this;
        vm.property = 'UserListController';
        

        alert("Test");
        
        console.log("Frank is here");
        
        activate();

        ////////////////

        function activate() {
            force.query('SELECT Id, Name, Email, Title, UserType, UserRole.Name FROM User').then(
                function (data) {
                    vm.users = data.records;
                },
                function (error) {
                    alert("Error Retrieving Contacts");
                    console.log(error);
                });            
        }
    }
})();