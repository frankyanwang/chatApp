(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('VLCObjectQueryManager', VLCObjectQueryManager);

    VLCObjectQueryManager.$inject = ['force', 'lodash', '$q', 'SObject', 'Contact', 'Account','User'];

    /* @ngInject */
    function VLCObjectQueryManager(force, lodash, $q, SObject, Contact, Account, User) {

        var exports = {
            findAll: findAll,
            find: find
        };

        return exports;

        ////////////////

        // queryParams: {fields: "id, name", where: "", orderBy: "", limit: 50}
        // note: fields can be either string or array. queryParams is optional.
        function findAll(modelType, queryParams) {
            var fields = queryParams['fields'],
                where = queryParams['where'],
                orderBy = queryParams['orderBy'],
                limit = queryParams['limit'];

            if (!lodash.isString(modelType) || modelType.length === 0) {
                //throw exception
                return undefined;
            }

            var query = "select ";

            //check fields
            if (lodash.isArray(fields) && fields.length > 0) {
                query = query + lodash.join(fields, ", ");
            } else if (lodash.isString(fields) && fields.length > 0) {
                query = query + fields;
            } else {
                //query for entire many all fields for the object.
            }

            query = query + " from " + modelType;

            // where has value.
            if (lodash.isString(where) && where.length > 0) {
                query = query + " where " + where;
            } else {

            }

            //check order by
            if (lodash.isString(orderBy) && orderBy.length > 0) {
                query = query + " order by " + orderBy + " NULLS LAST";
            }

            if (lodash.isNumber(limit) && limit > 0) {
                query = query + " limit " + limit;
            }

            var deferred = $q.defer();

            force.query(query).then(
                function (data) {
                    var sObjects = [];
                    lodash.forEach(data.records, function (value) {
                        var sObject = createModel(modelType, value);
                        sObjects.push(sObject);
                    });

                    deferred.resolve(sObjects);
                },
                function (error) {
                    deferred.reject(error);

                    console.log("Find All error: " + query);
                    console.log(error);
                });

            return deferred.promise;
        };

        // queryParams: {fields: "id, name"}
        // note: fields can be either string or array. queryParams is optional.        
        function find(modelType, objId, queryParams) {
            var fields = queryParams['fields'];

            if (!lodash.isString(modelType) || modelType.length === 0) {
                //throw exception
                return undefined;
            }

            if (!lodash.isString(objId) || objId.length === 0) {
                //throw exception
                return undefined;
            }

            var fieldQuery;
            //check fields
            if (lodash.isArray(fields) && fields.length > 0) {
                fieldQuery = lodash.join(fields, ", ");
            } else if (lodash.isString(fields) && fields.length > 0) {
                fieldQuery = fields;
            }

            var deferred = $q.defer();

            force.retrieve(modelType, objId, fieldQuery).then(
                function (data) {
                    var sObject = createModel(modelType, data);

                    deferred.resolve(sObject);
                },
                function (error) {
                    deferred.reject(error);

                    console.log("Find error: " + modelType);
                    console.log(error);
                });

            return deferred.promise;


        };

        function createModel(modelType, attrs) {
            var sObject;

            var type = lodash.upperCase(modelType);

            if (type === "CONTACT") {
                sObject = new Contact(attrs);

            } else if (type === "ACCOUNT") {
                sObject = new Account(attrs);

            } else if (type === "USER") {
                sObject = new User(attrs);
            } else {
                sObject = new SObject(attrs);
            }

            // define convenient instance methods here.

            return sObject;
        }
    }
})();