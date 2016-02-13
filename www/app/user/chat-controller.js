(function () {
    'use strict';

    angular
        .module('vlocityApp')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$stateParams', 'chatFactory', '$rootScope', 'force', '$http', 'lodash', 'CacheFactory'];

    /* @ngInject */
    function ChatController($stateParams, chatFactory, $rootScope, force, $http, lodash, CacheFactory) {
        var vm = this;
        vm.property = 'ChatController';

        vm.avatarCache = CacheFactory.get("avatarCache");


        // model bind to template
        vm.currentChat = '';
        vm.myId = $rootScope.currentUser.Id;
        vm.hideTime = true;

        vm.chatUserName = $stateParams.userName;
        vm.chatUserId = $stateParams.userId;

        vm.sendMessage = function () {
            if (!vm.currentChat || vm.currentChat.length === 0) {
                return;
            }

            var sObjTypeResults = vm.currentChat.match(/#([A-Za-z0-9_]+)/);
            var keywordStrResults = vm.currentChat.match(/@([A-Za-z0-9_ ]+)@/);

            if (!lodash.isNil(sObjTypeResults) && !lodash.isNil(keywordStrResults)) {

                var sObjectType = sObjTypeResults[1].toUpperCase();
                var keywardStr = keywordStrResults[1].toLowerCase();

                // replace first #contact to '' and replace @keyword@ to keyword.
                vm.currentChat = lodash.replace(vm.currentChat, /#([A-Za-z0-9_]+ )/, '');
                vm.currentChat = lodash.replace(vm.currentChat, /@([A-Za-z0-9_ ]+)@/, keywardStr);

                if (sObjectType === "CONTACT") {
                    force.query("select id,name,title,phone,mobilephone,email from " + sObjectType + " where name like '%" + keywardStr + "%'").then(
                        function (data) {
                            if (data.records.length === 0) {
                                alert("cannot find contact - " + keywardStr);
                            }
                            if (data.records.length === 1) {
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

                                    var chatKey = ref.key();
                                    var addedChat = vm.chats.$getRecord(chatKey);

                                    if (vm.avatarCache.get(contact.Id)) {
                                        addedChat.contact.imgUrl = vm.avatarCache.get(contact.Id);
                                        vm.chats.$save(addedChat);
                                    } else {
                                        $http.get("http://uifaces.com/api/v1/random").then(function (response) {
                                            console.log(response);
                                            // epic, bigger, normal, mini
                                            addedChat.contact.imgUrl = response.data.image_urls.epic;
                                            vm.chats.$save(addedChat);
                                            vm.avatarCache.put(contact.Id, value.imgUrl);
                                        });
                                    }
                                });
                            } else {
                                alert("Find more than one contact - " + keywardStr);
                            }
                        },
                        function (error) {
                            alert("cannot find contact - " + keywardStr);
                            console.log(error);
                        });


                } else if (sObjectType === "ACCOUNT") {

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