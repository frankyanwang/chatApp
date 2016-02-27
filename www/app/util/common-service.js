(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('CommonService', CommonService);

    CommonService.$inject = ['$http', '$q', 'CacheFactory'];

    /* @ngInject */
    function CommonService($http, $q, CacheFactory) {
        var exports = {
            getAvatarUrlById: getAvatarUrlById,
            currentUser: currentUser
        };
        
        // initialize angular cache. TODO: maybe move to service layer.
        //        CacheFactory.createCache('accessTokenCache', {
        //            storageMode: "localStorage"
        //        });        
        CacheFactory.createCache('avatarCache', {
            storageMode: "localStorage"
        });
        //        CacheFactory.createCache('contactListCache', {
        //            storageMode: "localStorage"
        //        });
        //        CacheFactory.createCache('accountListCache', {
        //            storageMode: "localStorage"
        //        });
        //        CacheFactory.createCache('userListCache', {
        //            storageMode: "localStorage"
        //        });        

        var currentUser;
        var avatarCache = CacheFactory.get("avatarCache");

        return exports;

        ////////////////

        function getAvatarUrlById(uid) {
            var deferred = $q.defer();
            if (avatarCache.get(uid)) {
                deferred.resolve(avatarCache.get(uid));
            } else {
                $http.get("http://uifaces.com/api/v1/random?uid=" + uid).then(function (response) {
                    console.log(response);
                    // epic, bigger, normal, mini
                    var imgURL = response.data.image_urls.epic;
                    deferred.resolve(imgURL);
                    avatarCache.put(uid, imgURL);
                }, function (error) {
                    deferred.reject(error);
                    console.log("Failed to get avatar image: " + uid);
                    console.log(error);
                });
            }
            return deferred.promise;
        }
    }

})();