/**
 * Created by huangbin on 1/11/16.
 */
'use strict';

angular.module('app.directive.qrcode', [])
  .directive('qrcode', function ($timeout) {
    return {
      restrict: 'AEC',
      scope: {
        qrcodeStart: '@',
        width: '@',
        height: '@',
        qrcodeSuccess: '&',
        qrcodeError: '&'
      },
      replace: false,
      template: '<video width="{{width}}" height="{{height}}"></video>' +
      '<canvas id="qr-canvas" width="{{width}}" height="{{height}}" data-ng-show="false">',

      link: function (scope, element, attrs) {
        var start = false;
        var video = element.children('video')[0];
        var canvas = element.children('canvas')[0];
        var canvasContext = canvas.getContext('2d');
        var localMediaStream;
        var timer;
        var scan = function () {
          if (localMediaStream) {
            //console.log(video.width, video.height);
            canvasContext.drawImage(video, 0, 0, video.width, video.height);
            //canvasContext.drawImage(video, 0, 0, 480, 360);
            try {
              qrcode.decode();
            } catch (e) {
              //console.log(e);
            }
            timer = $timeout(scan, 500);
          } else {
            console.log('Media stream is not prepared');
          }
        };

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;

        var qrcodeStart = function () {
          if (!start) {
            if (navigator.getUserMedia) {
              start = true;
              navigator.getUserMedia(
                {video: true, audio: false},
                function (stream) {
                  video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                  localMediaStream = stream;
                  video.play();
                  timer = $timeout(scan, 1000);
                },
                function (error) {
                  console.log(error);
                  scope.qrcodeError({error: error});
                });
            } else {
              console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
              scope.qrcodeError({error: 'Native web camera streaming (getUserMedia) not supported in this browser.'});
            }
          }
        };

        var qrcodeStop = function () {
          if (start) {
            if (window.URL) {
              window.URL.revokeObjectURL(video.src);
              video.src = "";
            }
            //stop the stream and cancel timeouts
            localMediaStream.getVideoTracks().forEach(function (videoTrack) {
              videoTrack.stop();
            });

            $timeout.cancel(timer);
            start = false;
          }
        };

        qrcode.callback = function (result) {
          $timeout(function () {
            scope.qrcodeSuccess({result: result});
          }, 0);
        };

        scope.$watch('qrcodeStart', function (value) {
          if (value === 'true') {
            qrcodeStart();
          } else if (value === 'false') {
            qrcodeStop();
          }
        });

        scope.$on('$destroy', function () {
          qrcodeStop();
        });
      },
      llink: function (scope, element, attrs) {
        scope.start = false;
        scope.$on("$destroy", function (event) {
          if (scope.start) {
            element.html5_qrcode_stop();
            scope.start = false;
          }
        });
        scope.$watch('qrcodeStart', function (value) {
          console.log(scope.qrcodeStart);
          if (value == 'true' && !scope.start) {
            scope.start = true;
            element.html5_qrcode(
              function (result) {
                console.log(result);
                //element.html5_qrcode_stop();
                //scope.start = false;
                scope.qrcodeSuccess({result: result});
              }, function (readError) {
                console.log(readError);
              }, function (videoError) {
                console.log(videoError);
              });
            scope.start = true;
          } else if (value == 'false' && scope.start) {
            element.html5_qrcode_stop();
            scope.start = false;
          }
        });
      }
    }
  });
