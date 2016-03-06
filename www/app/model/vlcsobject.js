(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('SObject', [function () {

            //Constructor, with class name
            function SObject(atts) {
                //declare properties.

                var self = this;
                var initialProperties = atts || {};

                for (var prop in initialProperties) {
                    if (initialProperties.hasOwnProperty(prop)) {
                        self[prop] = initialProperties[prop];
                    }
                }
            };

            SObject.prototype = {
                isCustomObject: false,
                namespacePrefix: '',
                printClassName: printClassName,
                resolvedObjectType: resolvedObjectType
            }

            return SObject;

            ////////////////
            function printClassName() {
                console.log("Class Name:", this.constructor.name);
                return this.constructor.name;
            };

            function resolvedObjectType() {
                var isCustom = this.constructor.isCustomObject || this.isCustomObject;

                var resolvedName = this.constructor.objectType || this.constructor.name;

                if (isCustom) {
                    //remove __c because we will add later.
                    if (resolvedName.slice(-3) === '__c') {
                        resolvedName = resolvedName.slice(0, -3);
                    }

                    if (_.isEmpty(this.namespacePrefix)) {
                        resolvedName = resolvedName + "__c";
                    } else {
                        resolvedName = this.namespacePrefix + "__" + resolvedName + "__c";
                    }
                } else {
                    // if not custom object, should remove __c in the end.
                    if (resolvedName.slice(-3) === '__c') {
                        resolvedName = resolvedName.slice(0, -3);
                    }

                    if (resolvedName.indexOf("__") > -1 && !_.isEmpty(this.namespacePrefix)) {
                        resolvedName = this.namespacePrefix + "__" + resolvedName;
                    }
                }

                return resolvedName;
            }


    }]);
})();