(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('VLCObjectQueryManager', VLCObjectQueryManager);

    VLCObjectQueryManager.$inject = ['force', 'lodash', '$q', 'SObject', 'Contact', 'Account', 'User', 'Order'];

    /* @ngInject */
    function VLCObjectQueryManager(force, lodash, $q, SObject, Contact, Account, User, Order) {
        var _ = lodash;

        var exports = {
            findAll: findAll,
            find: find
        };

        return exports;

        ////////////////

        // queryParams: {fields: "id, name", where: "", orderBy: "", limit: 50}
        // note: fields can be either string or array. queryParams is optional.
        function findAll(modelClass, queryParams) {
            var fields = queryParams['fields'],
                where = queryParams['where'],
                orderBy = queryParams['orderBy'],
                limit = queryParams['limit'];

            var deferred = $q.defer();

            var objectType;
            if (_.isObject(modelClass)) {
                // or we can use modelClass.prototype.resolvedObjectType()
                objectType = new modelClass().resolvedObjectType();
                console.log("resolvedType", objectType);
            } else if (_.isString(modelClass)) {
                objectType = modelClass;
            } else {
                console.log("modelClass: ", modelClass);
                deferred.reject(new Error("findAll first param is invalid."));
            }

            var query = "select ";

            //check fields
            if (_.isArray(fields) && fields.length > 0) {
                query = query + _.join(fields, ", ");
            } else if (_.isString(fields) && fields.length > 0) {
                query = query + fields;
            } else {
                //query for entire many all fields for the object.
            }

            query = query + " from " + objectType;

            // where has value.
            if (_.isString(where) && where.length > 0) {
                query = query + " where " + where;
            } else {

            }

            //check order by
            if (_.isString(orderBy) && orderBy.length > 0) {
                query = query + " order by " + orderBy + " NULLS LAST";
            }

            if (_.isNumber(limit) && limit > 0) {
                query = query + " limit " + limit;
            }

            force.query(query).then(
                function (data) {
                    var sObjects = [];
                    _.forEach(data.records, function (value) {
                        var sObject = createModel(objectType, value);
                        sObjects.push(sObject);
                    });

                    deferred.resolve(sObjects);
                },
                function (error) {
                    deferred.reject(error);

                    console.log("Find All error:", query);
                    console.log(error);
                });

            return deferred.promise;
        };

        // queryParams: {fields: "id, name"}
        // note: fields can be either string or array. queryParams is optional.        
        function find(modelClass, objId, queryParams) {
            var fields = queryParams['fields'];

            var deferred = $q.defer();

            var objectType;
            if (_.isObject(modelClass)) {      
                // or we can use modelClass.prototype.resolvedObjectType()
                objectType = new modelClass().resolvedObjectType();
                console.log("resolvedType", objectType);                
            } else if (_.isString(modelClass)) {
                objectType = modelClass;
            } else {
                console.log("modelClass: ", modelClass);
                deferred.reject(new Error("findAll first param is invalid."));
            }

            if (!_.isString(objId) || objId.length === 0) {
                //throw exception
                return undefined;
            }

            var fieldQuery;
            //check fields
            if (_.isArray(fields) && fields.length > 0) {
                fieldQuery = _.join(fields, ", ");
            } else if (_.isString(fields) && fields.length > 0) {
                fieldQuery = fields;
            }

            force.retrieve(objectType, objId, fieldQuery).then(
                function (data) {
                    var sObject = createModel(objectType, data);

                    deferred.resolve(sObject);
                },
                function (error) {
                    deferred.reject(error);

                    console.log("Find error:", objectType);
                    console.log(error);
                });

            return deferred.promise;


        };

        //////////////// Private Functions.

        function createModel(objectType, attrs) {
            var sObject;

            var type = _.upperCase(objectType);

            if (type === "CONTACT") {
                sObject = new Contact(attrs);

            } else if (type === "ACCOUNT") {
                sObject = new Account(attrs);

            } else if (type === "USER") {
                sObject = new User(attrs);

            } else if (type === "ORDER") {
                sObject = new Order(attrs);

            } else {
                sObject = new SObject(attrs);

            }

            // define convenient instance methods here.

            return sObject;
        }
    }
})();