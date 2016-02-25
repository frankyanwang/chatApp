(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['configOptions', 'VLCObjectQueryManager', 'chatFactory', '$http', 'CacheFactory', 'User'];

    /* @ngInject */
    function UserListController(configOptions, VLCObjectQueryManager, chatFactory, $http, CacheFactory, User) {
        var vm = this;
        vm.property = 'UserListController';

        vm.avatarCache = CacheFactory.get("avatarCache");

        console.log("== UserListController ==");

        vm.isUserOnline = chatFactory.isUserOnline;

        activate();

        ////////////////

        function activate() {

            VLCObjectQueryManager.findAll('user', {
                fields: User.namesOfFieldsToRequest
//                where: "Name = 'Frank Wang' or Name = 'Sissi Chen'"
            }).then(
                function (userArray) {
                    vm.users = userArray;

                    vm.displayAvatar = configOptions.displayAvatar;
                    if (configOptions.displayAvatar) {
                        angular.forEach(vm.users, function (value, key) {
                            var userId = value.Id;
                            if (vm.avatarCache.get(userId)) {
                                value.imgUrl = vm.avatarCache.get(userId);
                            } else {
                                $http.get("http://uifaces.com/api/v1/random?timestamp="+userId).then(function (response) {
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