/**
 * Created by zhangdongming on 16-12-15.
 */
angular.module('app.view.iframe', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main.iframe', {
                url:'/iframe',
                params:{urlIndex:'index'},
                templateUrl: 'views/iframe/iframe-content.html',
                controller: 'IframeCtrl'
            })
    }])

    .controller('IframeCtrl', function ($scope, $stateParams,$state) {
        console.log($stateParams);
        $scope.currentState = $state;
        $scope.serviceServerUrl=$stateParams.urlIndex.serviceServerUrl;
        switch ($scope.serviceServerUrl){
            case 'http://sandbox.bj.anicel.cn:8000/sunny':
                $scope.app='sunny';
        }
        $scope.back=function () {
            console.log('back');
        }
    })
;