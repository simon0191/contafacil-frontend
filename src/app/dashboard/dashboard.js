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

.controller( 'DashboardCtrl', ['$scope','usersService','$location',
  function( $scope, usersService, $location ) {
    console.log('dashboard ctrl');

}])
;

