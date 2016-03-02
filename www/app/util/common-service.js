(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('CommonService', CommonService);

    CommonService.$inject = ['$http', '$q', 'CacheFactory','force'];

    /* @ngInject */
    function CommonService($http, $q, CacheFactory, force) {
        var exports = {
            getAvatarUrlById: getAvatarUrlById,
            currentUser: currentUser,
            getOrgNamespace: getOrgNamespace
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
        var namespacePrefix;
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

        function getOrgNamespace() {
            var deferred = $q.defer();
//            //TODO: don't cache it until find a way to invalidate cache.
//            if(namespacePrefix){
//                deferred.resolve(namespacePrefix);
//            }
            
            force.query("SELECT NamespacePrefix FROM ApexClass WHERE Name = 'VlocityOrganization'").then(function (result) {
                namespacePrefix = result.records[0].NamespacePrefix;
                deferred.resolve(namespacePrefix);
            }, function (error) {
                deferred.reject(error);
                console.log("Failed to get NamespacePrefix");
                console.log(error);
            });
            
            return deferred.promise;
        }
    }

})();