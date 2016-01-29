/**
 * Created by zyl.2016.1.18
 */
define(['angular', 'uiRouter'], function (angular, uiRouter,mainModule) {
    var routerApp = angular.module('routerApp', ['ui.router']);
    routerApp.run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

    routerApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index/home');
            // var urlMatcher = $urlMatcherFactory.compile("/index/:routerType/:childFunc/{id}");
        // $urlRouterProvider.otherwise(function($inject,$location){  
            // $stateProvider.state('index2', {
            //     url: "/index/:routerType/:childFunc/{id}",

            //     views: {
            //         'main': {
            //             templateUrl: 'template/index_main.html'
            //         }
            //     }
            // })
        //     console.log($inject);
        //     return $location.$$path;
        // });
        $stateProvider
            .state('index', {
                url: '/index/:routerType',
                views: {
                    'main': {
                        templateUrl: 'template/index_main.html'
                    }
                }
            })
            .state('index1', {
                url: '/index/:routerType/:childFunc',
                views: {
                    'main': {
                        templateUrl: 'template/index_main.html'
                    }
                }
            })
            // .state('index2', {
            //     url: '/index/:routerType/:childFunc/{id}',

            //     views: {
            //         'main': {
            //             templateUrl: 'template/index_main.html'
            //         }
            //     }
            // }) 
    });
    

    
    return routerApp;
});