

(function() {
  'use strict';

  angular.module('main')
      .controller('AppCtrl', AppCtrl);

  function AppCtrl($scope) {
    $scope.currentNavItem = 'SCProfile';
  }
})();

