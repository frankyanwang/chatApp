(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('chatFactory', chatFactory);

    chatFactory.$inject = ['$q', 'FirebaseUrl', '$firebaseArray', '$firebaseObject'];

    /* @ngInject */
    function chatFactory($q, FirebaseUrl, $firebaseArray, $firebaseObject) {
        var userChatRef = new Firebase(FirebaseUrl + 'userChat');

        var usersRef = new Firebase(FirebaseUrl + 'users');
        var connectedRef = new Firebase(FirebaseUrl + '.info/connected');
        var users = $firebaseArray(usersRef);

        var exports = {
            chatFromUsers: getChatFromUsers,
            setOnline: setOnline,
            isUserOnline: isUserOnline
        };

        return exports;

        ////////////////

        function getChatFromUsers(userId1, userId2) {
            var path = userId1 < userId2 ? userId1 + '/' + userId2 : userId2 + '/' + userId1;

            return $firebaseArray(userChatRef.child(path));
        }

        function setOnline(userId) {
            var connected = $firebaseObject(connectedRef);
            var online = $firebaseArray(usersRef.child(userId + '/online'));

            connected.$watch(function () {
                if (connected.$value === true) {
                    online.$add(true).then(function (connectedRef) {
                        connectedRef.onDisconnect().remove();

                    });
                }
            });
        }

        function isUserOnline(userId) {
//            var user = $firebaseObject(usersRef.child(userId));
            var user = users.$getRecord(userId);
            if(user && user.online) {
                return true;
            }
            return false;
        }
    }
})();