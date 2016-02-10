(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactListController', ContactListController);

    ContactListController.$inject = ['configOptions', 'force', '$http', 'lodash'];

    /* @ngInject */
    function ContactListController(configOptions, force, $http, lodash) {
        var vm = this;
        vm.property = 'ContactListController';

        console.log("==ContactListController==");
        
        var lo = lodash.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 });
        console.log("Lodash " + lo.b);

        activate();

        ////////////////

        function activate() {
            force.query('select id, name, title from contact limit 50').then(
                function (data) {
                    vm.contacts = data.records;

                    vm.displayAvatar = configOptions.displayAvatar;
                    if (configOptions.displayAvatar) {
                        angular.forEach(vm.contacts, function (value, key) {
                            $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                                console.log(response);
                                // epic, bigger, normal, mini
                                value.imgUrl = response.data.image_urls.bigger;
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