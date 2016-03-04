// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('vlocityApp', ['ionic', 'forceng', 'config', 'firebase', 'ngLodash', 'angular-cache'])

.run(function ($rootScope, $ionicPlatform, $state, force, forcengOptions, chatFactory, CommonService) {

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
                function (creds) {
                    console.log("creds from forceng:", creds);

                    var credential;
                    //creds exists when login from real device.
                    if (creds) {
                        userId = creds.userId;
                        credential = creds;
                    } else {
                        credential = {
                            userId: force.getUserId()
                        };
                    }

                    // initialize bunch of service and metadata here.
                    CommonService.setLoginCreds(credential);

                    CommonService.getOrgNamespace()
                        .then(function (namespace) {
                            console.log("OrgNamespace:", namespace);

                            return CommonService.getCurrentUser(true);
                        }).then(
                            function (user) {
                                console.log("current user:", user);
                                $rootScope.currentUser = user;

                                chatFactory.setOnline($rootScope.currentUser.Id);
                                
                                return CommonService.getAvatarUrlById($rootScope.currentUser.Id).then(function (imgUrl) {
                                    $rootScope.myAvatar = imgUrl;
                                });

                            }).finally(function () {
                            $state.go('app.contactlist');
                        }).catch(function (error) {
                            console.log("failed execute CommonService:", error);

                        });
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
                controller: "ContactListController",
                controllerAs: "vm",                
                templateUrl: baseURL + "app/contact/contact-list.html",
            }
        }
    })

    .state('app.contact', {
        url: "/contacts/:contactId",
        views: {
            'menuContent': {
                controller: "ContactController",
                controllerAs: "vm",                  
                templateUrl: baseURL + "app/contact/contact.html"
            }
        }
    })

    .state('app.edit-contact', {
        url: "/edit-contact/:contactId",
        views: {
            'menuContent': {
                controller: "EditContactController",
                controllerAs: "vm",                 
                templateUrl: baseURL + "app/contact/edit-contact.html"
            }
        }
    })

    .state('app.add-contact', {
        url: "/create-contact",
        views: {
            'menuContent': {
                controller: "CreateContactController",
                controllerAs: "vm",                
                templateUrl: baseURL + "app/contact/create-contact.html"
            }
        }
    })

    .state('app.accountlist', {
        url: "/accountlist",
        views: {
            'menuContent': {
                controller: "AccountListController",
                controllerAs: "vm",                 
                templateUrl: baseURL + "app/account/account-list.html"
            }
        }
    })

    .state('app.account', {
        url: "/accounts/:accountId",
        views: {
            'menuContent': {
                controller: "AccountController",
                controllerAs: "vm",                  
                templateUrl: baseURL + "app/account/account.html"
            }
        }
    })

    .state('app.orderlist', {
        url: "/orderlist",
        views: {
            'menuContent': {
                controller: "OrderListController",
                controllerAs: "vm",                 
                templateUrl: baseURL + "app/order/order-list.html"
            }
        }
    })

    .state('app.userlist', {
        url: "/userlist",
        views: {
            'menuContent': {
                controller: "UserListController",
                controllerAs: "vm",
                templateUrl: baseURL + "app/user/user-list.html"
            }
        }
    })

    .state('app.chat', {
        url: "/{userId}/chat",
        params: {
            userName: null
        },
        views: {
            'menuContent': {
                controller: "ChatController",
                controllerAs: "vm",
                templateUrl: baseURL + "app/user/chat.html"
            }
        }
    });

    $urlRouterProvider.otherwise('/');

});