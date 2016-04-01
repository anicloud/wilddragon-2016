/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.contact', [
  'ui.router',
  'ui.bootstrap',
  'ui.select'
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


    $scope.itemArray = [
      {id: 1, name: '只读'},
      {id: 2, name: '只写'},
      {id: 3, name: '读写'}
    ];

    $scope.selected = {value: $scope.itemArray[0]};


    $scope.submitPermission = function () {
      //$scope.selectedPermission = $scope.newPermission;
      // If you have a back-end persistance layer, you can update it here
      // updateBackEnd($scope.newInstructor);
      $scope.editMode = false;
      console.log($scope.selected.value.name);
    };

    $scope.enterEditMode = function () {
      //$scope.newPermission = $scope.selectedPermission;
      //$scope.newInputName = $scope.
      $scope.editMode = true;
    };

    $scope.setInputName = function () {
      $scope.editMode = false;
    };


    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;

    $scope.open = function (size) {
      //alert(33);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/share/share-modal-member.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }
    $scope.openMember = function () {
      //alert(1111);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/contact/myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        scope: $scope,
        resolve: {}
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date())
      });
    }
  })
  .controller('ShareModalPermissionCtrl', function ($scope, $uibModalInstance) {
    $scope.permissions = [];
    var result = {success: true, data: undefined};
    $scope.backward = function () {
      result.success = false;
      $uibModalInstance.close(result);
    };
    $scope.forward = function () {
      result.data = $scope.permissions;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });