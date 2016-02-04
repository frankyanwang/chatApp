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
        vm.myId = $rootScope.currentUser.Id;
        vm.hideTime = true;
        
        vm.chatUserName = $stateParams.userName;
        vm.chatUserId = $stateParams.userId;
        
        vm.sendMessage = function () {
            if (!vm.currentChat || vm.currentChat.length == 0) {
                return;
            }

            vm.chats.$add({
                userId: $rootScope.currentUser.Id,
                name: $rootScope.currentUser.Name,
                email: $rootScope.currentUser.Email,
                body: vm.currentChat,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }).then(function () {
                vm.currentChat = '';
            });

        }

        activate();

        ////////////////

        function activate() {
            vm.chats = chatFactory.chatFromUsers(vm.chatUserId, $rootScope.currentUser.Id)
        }
    }
})();