(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('CommonService', CommonService);

    CommonService.$inject = ['$http', '$q', 'CacheFactory', 'force', 'VLCObjectQueryManager', 'lodash'];

    /* @ngInject */
    function CommonService($http, $q, CacheFactory, force, VLCObjectQueryManager, lodash) {
        var exports = {
            setLoginCreds: setLoginCreds,
            getAvatarUrlById: getAvatarUrlById,
            getCurrentUser: getCurrentUser,
            getOrgNamespace: getOrgNamespace,
            getAllSObjects: getAllSObjects,
            getSObjectDescription: getSObjectDescription
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

        var currentUser,
            namespacePrefix,
            allSObjects,
            sObjsDesc = {},
            creds;

        var avatarCache = CacheFactory.get("avatarCache");

        return exports;

        ////////////////

        // public methods.

        function setLoginCreds(credential) {
            creds = credential;
        }

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
                    console.log("Failed to get avatar image:", uid);
                    console.log(error);
                });
            }
            return deferred.promise;
        }

        function getCurrentUser(refresh) {

            var deferred = $q.defer();

            if (!refresh && currentUser) {
                deferred.resolve(currentUser);
            }

            var userId = creds.userId;

            VLCObjectQueryManager.find('user', userId, {
                fields: 'id, name, email'
            }).then(
                function (user) {
                    currentUser = user;
                    //console.log("Current User:", user);
                    deferred.resolve(user);
                },
                function (error) {
                    deferred.reject(error);
                    console.log("Failed to get current user:", userId);
                    console.log(error);
                });

            return deferred.promise;
        }

        function getOrgNamespace(refresh) {
            var deferred = $q.defer();
            //            //TODO: don't cache it until find a way to invalidate cache.
            if (!refresh && namespacePrefix) {
                deferred.resolve(namespacePrefix);
            }

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

        // usage: CommonService.getAllSObjects().then(function(allSObjects) {
        //            console.log(result);
        //        });        
        function getAllSObjects(refresh) {
            var deferred = $q.defer();

            if (!refresh && allSObjects) {
                deferred.resolve(allSObjects);
            }

            force.request({
                path: '/services/data/v36.0/sobjects'
            }).then(function (result) {
                allSObjects = {};
                lodash.each(result.sobjects, function (value) {
                    allSObjects[value.name] = value;
                });
                //console.log(allSObjects);
                deferred.resolve(allSObjects);
            }, function (error) {
                deferred.reject(error);
                console.log("Failed to getAllSObjects");
                console.log(error);
            });

            return deferred.promise;
        }

        // usage: CommonService.getSObjectDescription('account')
        //        .then(function (objDescription) {
        //            console.log(result);
        //        });

        function getSObjectDescription(objectType, refresh) {
            var deferred = $q.defer();

            getAllSObjects().then(function () {
                var sObj = allSObjects[lodash.capitalize(objectType)];
                if (lodash.isNil(sObj)) {
                    console.log("objectType is invalid.");
                    deferred.reject(new Error("objectType is invalid."));
                }

                force.request({
                    path: sObj.urls.describe
                }).then(function (objDescription) {
                    //console.log(objDescription);
                    deferred.resolve(objDescription);
                }, function (error) {
                    deferred.reject(error);
                    console.log("Failed to getAllSObjects");
                    console.log(error);
                });

            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }

})();