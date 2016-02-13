(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactListController', ContactListController);

    ContactListController.$inject = ['configOptions', 'force', '$http', 'CacheFactory'];

    /* @ngInject */
    function ContactListController(configOptions, force, $http, CacheFactory) {
        var vm = this;
        vm.property = 'ContactListController';

        vm.avatarCache = CacheFactory.get("avatarCache");
        
        activate();


        ////////////////

        function activate() {
            force.query('select id, name, title from contact limit 50').then(
                function (data) {
                    vm.contacts = data.records;

                    vm.displayAvatar = configOptions.displayAvatar;
                    if (configOptions.displayAvatar) {

                        angular.forEach(vm.contacts, function (value, key) {
                            var contactId = value.Id;
                            if (vm.avatarCache.get(contactId)) {
                                value.imgUrl = vm.avatarCache.get(contactId);
                            } else {
                                $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                                    console.log(response);
                                    // epic, bigger, normal, mini
                                    value.imgUrl = response.data.image_urls.epic;
                                    vm.avatarCache.put(contactId, value.imgUrl);
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