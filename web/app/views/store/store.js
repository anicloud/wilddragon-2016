/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.store', ['ui.router'])

  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider
      .state('main.store', {
        url: '/store',
        templateUrl: 'views/store/store.html',
        controller: 'StoreCtrl'
      })
  }]).controller('StoreCtrl',function ($scope,AccountServiceDist) {
    function ContentController($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
      $scope.selectSideNavTab('store');
      // AccountServiceDist.getAccount();
      // AccountServiceDist.getContacts();
      // AccountServiceDist.getGroups();
      // AccountServiceDist.joinGroup(JSON.stringify([""]));
      // AccountServiceDist.createGroup({name:"公司"});
      // AccountServiceDist.getContacts();
      // console.log(contacts);
      // AccountServiceDist.getContacts();
  });
    // .controller('ContentController',function ($scope,$ionicSideMenuDelegate) {
    //     $scope.toggleLeft = function() {
    //         $ionicSideMenuDelegate.toggleLeft();
    // }
// });


