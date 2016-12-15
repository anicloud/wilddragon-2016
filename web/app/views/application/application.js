/**
 * Created by huangbin on 12/28/15.
 */
'use strict';

angular.module('app.view.application', ['ui.router'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.application', {
        abstract: true,
        url: '/application',
        template: '<ui-view/>',
         controller: 'ApplicationCtrl'
        // resolve: {
        //   apps: function (AppService) {
        //     return AppService.getApps();
        //   }
        //}
      })
      .state('main.application.list', {
        url: '/list',
        templateUrl: 'views/application/application-list.html',
        controller: 'ApplicationListCtrl'
      })
      .state('main.application.container', {
        url: '/{id:[0-9]+}',
        templateUrl: 'views/application/application-container.html',
        controller: 'ApplicationContainerCtrl'
      })
    ;
  }])

  .controller('ApplicationCtrl', function ($scope, apps) {
    $scope.selectSideNavTab('app');
    if (apps.success) {
      console.log('Got apps data');
      console.log(apps.data);
      $scope.apps = apps.data;
    } else {
      console.error('Error in getting apps');
    }
  })

  .controller('ApplicationListCtrl', function ($scope,NotificationServiceDist) {
      $scope.login=function(){
          $.ajax({
              url: 'http://localhost:8082/cas/login?mode=rlogin&service=http://localhost:9000/login',
              dataType: "jsonp",
              jsonpCallback: "jsonpcallback",
              success: function (data) {
                  console.log(data);
                  $('#lt').val(data.lt);
                  $('#execution').val(data.execution);
                  $('#login-form').submit();
                  },
                  error:function(){ NotificationServiceDist.popNotification('网络访问错误!',null,'error');}
          });
      }
      $scope.openIframe=function (url) {
          console.log('url',url);
          state.go('main.iframe',{url:url})
      }
      $scope.showDiff=function () {
          console.log('showDiff');
      }
  })

  .controller('ApplicationContainerCtrl', function ($scope, $stateParams) {
    $scope.app = {};
    console.log()

  })
;