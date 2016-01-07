/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.contact', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.contact', {
        url: '/contact',
        templateUrl: 'views/contact/contact.html'
      });
  }])

  .controller('ContactCtrl', function () {

  });