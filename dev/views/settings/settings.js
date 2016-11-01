/**
 * Created by libiya on 16/1/18.
 */
'use strict';

angular.module('app.view.settings', ['ui.router','ngCookies','pascalprecht.translate'])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('main.settings', {
        url: '/settings',
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  }])

  .controller('SettingsCtrl', function ($scope,$translate,$rootScope) {
    $scope.selectSideNavTab('settings');
      $scope.langAry=[
          "English",
          "简体中文",
          "正體中文"
      ];
      $scope.langMap={
          English:'en',
          简体中文:'zh',
          正體中文:'tw'
      };
      var curLangKey=localStorage['NG_TRANSLATE_LANG_KEY'];
      angular.forEach($scope.langMap,function (item,key) {
           if(item===curLangKey) $scope.curLang=key;
      });
      $scope.switchLanguage=function (lang) {
          console.log($scope.langMap[lang]);
          $scope.curLang=lang;
          $scope.curLangKey=$scope.langMap[lang];
          $translate.use($scope.langMap[lang]);
      }
  });