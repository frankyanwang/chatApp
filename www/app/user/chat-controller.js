(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$stateParams', 'chatFactory', '$rootScope', 'force', '$http'];

    /* @ngInject */
    function ChatController($stateParams, chatFactory, $rootScope, force, $http) {
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

            var index = vm.currentChat.indexOf('#contact');
            if (index >= 0) {
                var results = vm.currentChat.match(/@([A-Za-z0-9_ ]+)@/);
                if (results && results.length > 0) {
                    var contactName = results[1];

                    force.query("select id,name,title,phone,mobilephone,email FROM contact where name like '%" + contactName + "%'").then(
                        function (data) {
                            if (data.records.length == 0) {
                                alert("cannot find contact - " + contactName);
                            }
                            if (data.records.length == 1) {
                                var contact = data.records[0];

                                vm.chats.$add({
                                    userId: $rootScope.currentUser.Id,
                                    name: $rootScope.currentUser.Name,
                                    email: $rootScope.currentUser.Email,
                                    type: "CONTACT",
                                    contact: contact,
                                    timestamp: Firebase.ServerValue.TIMESTAMP
                                }).then(function (ref) {
                                    vm.currentChat = '';

                                    var id = ref.key();
                                    var addedChat = vm.chats.$getRecord(id);

                                    $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                                        console.log(response);
                                        // epic, bigger, normal, mini
                                        addedChat.contact.imgUrl = response.data.image_urls.epic;
                                    });

                                });
                            } else {
                                alert("Find more than one contact - " + contactName);
                            }
                        },
                        function (error) {
                            alert("cannot find contact - " + contactName);
                            console.log(error);
                        });


                }
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