/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.contact', [
  'ui.router',
  'ui.bootstrap'
])

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

  .controller('ContactCtrl', function ($scope, $uibModal) {
    $scope.selectSideNavTab('contact');

    $scope.shareForm = {
      name: '',
      members: [],
      permissions: []
    };
    $scope.openShareModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/share/share-modal-name.html',
        controller: 'ShareModalNameCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.name = result.data;
            $scope.openMemberModal();
          }
        },
        function () {
          $scope.shareForm.name = '';
        });
    };

    $scope.openMemberModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/share/share-modal-member.html',
        controller: 'ShareModalMemberCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.members = result.data;
            $scope.openPermissionModal();
          } else {
            $scope.openShareModal();
            $scope.shareForm.members = [];
          }
        },
        function () {
          $scope.shareForm.members = [];
        }
      );
    };

    $scope.openPermissionModal = function () {
      console.log($scope.shareForm);
      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'views/share/share-modal-permission.html',
        controller: 'ShareModalPermissionCtrl'
      });
      modal.result.then(
        function (result) {
          if (result.success) {
            $scope.shareForm.permissions = result.data;
          } else {
            $scope.openMemberModal();
            $scope.shareForm.permissions = [];
          }
        },
        function () {
          $scope.shareForm.permissions = [];
        }
      );
    };
  });