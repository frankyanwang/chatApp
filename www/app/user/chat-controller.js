(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$stateParams', 'chatFactory', '$rootScope'];

    /* @ngInject */
    function ChatController($stateParams, chatFactory, $rootScope) {
        var vm = this;
        vm.property = 'ChatController';
        // model bind to template
        vm.currentChat = '';

        vm.sendMessage = function(){
            if(vm.chat.length > 0){
                vm.chats.$add({
                    userId: $rootScope.currentUser.id,
                    email: $rootScope.currentUser.email,
                    body: vm.currentChat,
                    timestamp: Firebase.ServerValue.TIMESTAMP
                }).then(function(){
                    vm.currentChat = '';
                });
            }
        }
        
        activate();

        ////////////////

        function activate() {
            vm.chats = chatFactory.chatFromUsers($stateParams.userId, $rootScope.currentUser.id)
        }
    }
})();