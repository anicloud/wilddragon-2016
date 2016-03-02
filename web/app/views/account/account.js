/**
 * Created by libiya on 16/1/18.
 */

'use strict';

angular.module('app.view.account', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.account', {
        url: '/account',
        templateUrl: 'views/account/account.html',
        controller: 'AccountCtrl'
      });
  }])

  .controller('AccountCtrl', function () {

  });