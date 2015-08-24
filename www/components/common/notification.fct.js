angular.module('marketmonitor')
  .factory('Notification', ['$cordovaLocalNotification',
    function($cordovaLocalNotification) {
      var factory = {};

      factory.add = function () {
        
      };

      return factory;
    }
  ]);