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
            func: func
        };
        

        return exports;

        ////////////////

        function func() {
        }
    }
})();