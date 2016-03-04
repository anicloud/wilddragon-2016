/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.contact', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.contact', {
        url: '/contact',
        templateUrl: 'views/contact/contact.html',
        controller: 'ContactCtrl'
      })

      .state('main.contact.list', {
        url: '/list',
        templateUrl: 'views/contact/contact-list.html',
        controller: 'ContactCtrl'
      })

      .state('main.contact.detail', {
        url: '/:id',
        templateUrl: 'views/contact/contact-detail.html',
        controller: 'ContactCtrl'
      });

  }])

  .controller('ContactCtrl', function ($scope) {
    $scope.selectSideNavTab('contact');
  });