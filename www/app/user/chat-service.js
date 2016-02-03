(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('chatFactory', chatFactory);

    chatFactory.$inject = ['$q', 'FirebaseUrl', '$firebaseArray'];

    /* @ngInject */
    function chatFactory($q, FirebaseUrl, $firebaseArray){
        var userChatRef = new Firebase(FirebaseUrl+'userChat');
        
        
        var exports = {
            chatFromUsers: getChatFromUsers
        };

        return exports;

        ////////////////

        function getChatFromUsers(userId1, userId2) {
            var path = userId1 < userId2 ? userId1 + '/' + userId2 : userId2 + '/' + userId1;
            
            return $firebaseArray(userChatRef.child(path));
        }
    }
})();