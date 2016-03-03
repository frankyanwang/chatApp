(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactListController', ContactListController);

    ContactListController.$inject = ['configOptions', '$http', 'CommonService', 'VLCObjectQueryManager', 'Contact'];

    /* @ngInject */
    function ContactListController(configOptions, $http, CommonService, VLCObjectQueryManager, Contact) {
        var vm = this;
        vm.property = 'ContactListController';

        activate();

        //sample code to get all objects and object description.
//        CommonService.getAllSObjects().then(function (result) {
//            console.log(result);
//            return CommonService.getSObjectDescription('account');
//        }).then(function (result) {
//            console.log(result);
//        });
        
//        CommonService.getSObjectDescription('account').then(function (result) {
//            console.log(result);
//        });


        ////////////////

        function activate() {

            VLCObjectQueryManager.findAll('contact', {
                fields: Contact.namesOfFieldsToRequest,
                limit: 50
            }).then(
                function (contactArray) {
                    vm.contacts = contactArray;

                    vm.displayAvatar = configOptions.displayAvatar;
                    if (configOptions.displayAvatar) {

                        angular.forEach(vm.contacts, function (value, key) {

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