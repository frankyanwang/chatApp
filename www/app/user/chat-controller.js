(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['dependencies'];

    /* @ngInject */
    function ChatController(dependencies) {
        var vm = this;
        vm.property = 'ChatController';


        activate();

        ////////////////

        function activate() {}
    }
})();