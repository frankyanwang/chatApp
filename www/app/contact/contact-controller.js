(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['force', '$stateParams', '$http', 'CacheFactory'];

    /* @ngInject */
    function ContactController(force, $stateParams, $http, CacheFactory) {
        var vm = this;
        vm.property = 'ContactController';

        vm.avatarCache = CacheFactory.get("avatarCache");

        activate();

        ////////////////

        function activate() {

            force.retrieve('contact', $stateParams.contactId, 'id,name,title,phone,mobilephone,email').then(
                function (contact) {
                    vm.contact = contact;

                    if (vm.avatarCache.get(vm.contact.Id)) {
                        vm.contact.imgUrl = vm.avatarCache.get(vm.contact.Id);
                    } else {
                        $http.get("http://uifaces.com/api/v1/random").then(function (response) {
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