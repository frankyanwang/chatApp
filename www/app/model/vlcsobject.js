(function () {
    'use strict';
    angular
        .module('vlocityApp')
        .factory('SObject', [function () {

            //Constructor, with class name
            function SObject(atts) {
                //declare properties.
                
                var self = this;
                var initialSettings = atts || {};

                for (var setting in initialSettings) {
                    if (initialSettings.hasOwnProperty(setting)) {
                        self[setting] = initialSettings[setting];
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