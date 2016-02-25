(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$stateParams', '$http', 'CacheFactory', 'VLCObjectQueryManager'];

    /* @ngInject */
    function ContactController($stateParams, $http, CacheFactory, VLCObjectQueryManager) {
        var vm = this;
        vm.property = 'ContactController';

        vm.avatarCache = CacheFactory.get("avatarCache");

        activate();

        ////////////////

        function activate() {

            VLCObjectQueryManager.find('contact', $stateParams.contactId, {
//                fields: "id,name,title,phone,mobilephone,email"
            }).then(
                function (contact) {
                    vm.contact = contact;

                    if (vm.avatarCache.get(vm.contact.Id)) {
                        vm.contact.imgUrl = vm.avatarCache.get(vm.contact.Id);
                    } else {
                        $http.get("http://uifaces.com/api/v1/random?timestamp="+vm.contact.Id).then(function (response) {
                            console.log(response);
                            // epic, bigger, normal, mini
                            vm.contact.imgUrl = response.data.image_urls.epic;
                            vm.avatarCache.put(vm.contact.Id, value.imgUrl);
                        });
                    }
                });
        }
    }
})();