(function() {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['configOptions', 'force', 'chatFactory', '$http', 'CacheFactory'];

    /* @ngInject */
    function UserListController(configOptions, force, chatFactory, $http, CacheFactory){
        var vm = this;
        vm.property = 'UserListController';
        
        vm.avatarCache = CacheFactory.get("avatarCache");        

        console.log("== UserListController ==");
        
        vm.isUserOnline = chatFactory.isUserOnline;
        
        activate();

        ////////////////

        function activate() {
//            force.query("SELECT Id, Name, Email, Title, UserType, UserRole.Name FROM User where Name = 'Frank Wang' or Name = 'Sissi Chen'").then(
            force.query("SELECT Id, Name, Email, Title, UserType, UserRole.Name FROM User").then(            
                function (data) {
                    vm.users = data.records;
                    
                    vm.displayAvatar = configOptions.displayAvatar;
                    if (configOptions.displayAvatar) {
                        angular.forEach(vm.users, function (value, key) {
                            var userId = value.Id;
                            if (vm.avatarCache.get(userId)) {
                                value.imgUrl = vm.avatarCache.get(userId);
                            } else {
                                $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                                    console.log(response);
                                    // epic, bigger, normal, mini
                                    value.imgUrl = response.data.image_urls.epic;
                                    vm.avatarCache.put(userId, value.imgUrl);
                                });
                            }
                        });                           
                    }
                    
                },
                function (error) {
                    alert("Error Retrieving Contacts");
                    console.log(error);
                });            
        }
    }
})();