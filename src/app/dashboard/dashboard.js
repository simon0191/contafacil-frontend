angular.module( 'cf.dashboard', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      'main': {
        templateUrl: 'dashboard/dashboard.tpl.html'
      }
    },
    data:{ pageTitle: 'Dashboard' }
  });
})

.controller( 'DashboardCtrl', [
  '$scope','usersService','$location', 'transactionsService','$rootScope',
  function( $scope, usersService, $location, transactionsService,$rootScope ) {
    //Scope vars
    $scope.transactions = [];

    //Utils
    var updateList = function(query) {
      transactionsService.list(query).then(function(transactions) {
        $scope.transactions = transactions;
      });
    };
    //Events
    $rootScope.$on('filterChange:transactions', function(event,data) {
      updateList(data.filterState);
    });
    //Start
    updateList();

}])
;