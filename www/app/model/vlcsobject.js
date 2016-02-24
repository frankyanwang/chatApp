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
                printClassName: printClassName
            }

            return SObject;

            ////////////////
            function printClassName() {
                console.log("Class Name: " + this.constructor.name);
                return this.constructor.name;
            };

    }]);
})();