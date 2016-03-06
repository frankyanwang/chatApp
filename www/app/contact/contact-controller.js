(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$stateParams', '$http', 'VLCObjectQueryManager', 'CommonService', 'Contact'];

    /* @ngInject */
    function ContactController($stateParams, $http, VLCObjectQueryManager, CommonService, Contact) {
        var vm = this;
        vm.property = 'ContactController';

        activate();

        ////////////////

        function activate() {

            VLCObjectQueryManager.find(Contact, $stateParams.contactId, {
//                fields: "id,name,title,phone,mobilephone,email"
            }).then(
                function (contact) {
                    vm.contact = contact;

                    CommonService.getAvatarUrlById(vm.contact.Id).then(function (imgUrl) {
                        vm.contact.imgUrl = imgUrl;
                    }, function (error) {
                        vm.contact.imgUrl = undefined;
                    });
                });
        }
    }
})();