(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['configOptions', 'VLCObjectQueryManager', 'chatFactory', '$http', 'CommonService', 'User'];

    /* @ngInject */
    function UserListController(configOptions, VLCObjectQueryManager, chatFactory, $http, CommonService, User) {
        var vm = this;
        vm.property = 'UserListController';
        
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

                            CommonService.getAvatarUrlById(value.Id).then(function (imgUrl) {
                                value.imgUrl = imgUrl;
                            }, function (error) {
                                value.imgUrl = undefined;
                            });

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