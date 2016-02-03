// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vlocityApp', ['ionic', 'forceng', 'config'])

.run(function ($ionicPlatform, $state, force, forcengOptions) {

    $ionicPlatform.ready(function () {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Initialize forceng
        force.init(forcengOptions);

        if (forcengOptions.accessToken) {
            // If the accessToken was provided (typically when running the app from within a Visualforce page,
            // go straight to the contact list
            $state.go('app.contactlist');
        } else {
            // Otherwise (the app is probably running as a standalone web app or as a hybrid local app with the
            // Mobile SDK, login first.)
            force.login().then(
                function () {
                    $state.go('app.contactlist');
                },
                function (error) {
                    alert("Login was not successful");
                });
        }

    });
})

.config(function ($stateProvider, $urlRouterProvider, baseURL) {

    // baseURL (defined in the config.js module) is only there to support running the same app as a Mobile SDK
    // hybrid local and hybrid remote app (where the app is run from withing a Visualforce page). When running the
    // app inside a Visualforce page, you have to account for the path of the app's static resource. To accomplish
    // that, you create the config module from within the VF page (as opposed to importing config.js), and set
    // baseURL to the app's static resource path.

    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: baseURL + "app/layout/menu-layout.html",
    })

    .state('app.contactlist', {
        url: "/contactlist",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/contact/contact-list.html",
            }
        }
    })

    .state('app.contact', {
        url: "/contacts/:contactId",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/contact/contact.html",
            }
        }
    })

    .state('app.edit-contact', {
        url: "/edit-contact/:contactId",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/contact/edit-contact.html",
            }
        }
    })

    .state('app.add-contact', {
        url: "/create-contact",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/contact/edit-contact.html",
            }
        }
    })

    .state('app.accountlist', {
        url: "/accountlist",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/account/account-list.html",
            }
        }
    })

    .state('app.account', {
        url: "/accounts/:accountId",
        views: {
            'menuContent': {
                templateUrl: baseURL + "app/account/account.html",
            }
        }
    })

    .state('app.userlist', {
        url: "/userlist",
        views: {
            'menuContent': {
                controller: "UserListController as userListController",
                templateUrl: baseURL + "app/user/user-list.html",
            }
        }
    });

    $urlRouterProvider.otherwise('/');

})
.constant('FirebaseUrl', 'https://sweltering-fire-1111.firebaseio.com/');