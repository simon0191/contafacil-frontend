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

.controller( 'DashboardCtrl', ['$scope','usersService','$location', 'transactionsService',
  function( $scope, usersService, $location, transactionsService ) {
    //Scope vars
    $scope.transactions = [];

    //Utils

    //Events

    //Start
    transactionsService.list().then(function(transactions) {
      $scope.transactions = transactions;
    });

}])
.controller('TransactionsRegisteredFilter', ['$scope','usersService','$location', 'transactionsService',
  function( $scope, usersService, $location, transactionsService ) {
    //Scope vars

    //Utils

    //Events

    //Start
    console.log('Yaju');
}])
;
