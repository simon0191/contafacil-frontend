angular.module( 'cf', [
  'templates-app',
  'templates-common',
  'cf.signup',
  'ui.router',
  'ui.bootstrap',
  'ui.event'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/signup' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Contafácil ' ;
    }
  });
})

;

