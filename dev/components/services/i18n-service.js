/**
 * Created by zhangdongming on 16-10-27.
 */
'use strict';

angular.module('app.service.i18n', ['ngCookies','pascalprecht.translate'])
    .factory('I18nServiceDist', function ($http) {
        return {
            initConfig: function ($translateProvider) {
                var lang=navigator.languages[1];
                console.log(lang.indexOf('zh'));
                if(lang.indexOf('tw')>-1){lang='tw'}
                else if(lang.indexOf('zh')>-1){lang='zh'}
                else{lang='en'}
                $translateProvider.useStaticFilesLoader({
                    prefix: 'lang/',
                    suffix: '.json'
                });
                $translateProvider.preferredLanguage(lang);
                console.log(navigator.languages);
                $translateProvider.useLocalStorage();
                return null;
            },
            switchLangage: function () {
                return
            },
        };
    });