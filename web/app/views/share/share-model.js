/**
 * Created by huangbin on 1/28/16.
 */
'use strict';

angular.module('app.view.share', [
  'ui.router',
  'ui.bootstrap'
])
  .controller('ShareModalNameCtrl', function ($scope, $uibModalInstance) {
    $scope.name = '';
    var result = {success: true, data: undefined};
    $scope.forward = function () {
      result.data = $scope.name;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
  })

  .controller('ShareModalMemberCtrl', function ($scope, $uibModalInstance) {
    $scope.members = [];
    var result = {success: true, data: undefined};
    $scope.backward = function () {
      result.success = false;
      $uibModalInstance.close(result);
    };
    $scope.forward = function () {
      result.data = $scope.members;
      $uibModalInstance.close(result);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
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
;






