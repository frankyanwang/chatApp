(function() {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['force', 'chatFactory'];

    /* @ngInject */
    function UserListController(force, chatFactory){
        var vm = this;
        vm.property = 'UserListController';

        console.log("== UserListController ==");
        
        vm.isUserOnline = chatFactory.isUserOnline;
        
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