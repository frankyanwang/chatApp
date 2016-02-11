(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['force', '$stateParams', '$http'];

    /* @ngInject */
    function ContactController(force, $stateParams, $http) {
        var vm = this;
        vm.property = 'ContactController';


        activate();

        ////////////////

        function activate() {
            force.retrieve('contact', $stateParams.contactId, 'id,name,title,phone,mobilephone,email').then(
                function (contact) {
                    vm.contact = contact;
                    $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                        console.log(response);
                        // epic, bigger, normal, mini
                        vm.contact.imgUrl = response.data.image_urls.epic;
                    });
                });
        }
    }
})();