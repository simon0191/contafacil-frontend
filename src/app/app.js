angular.module( 'cf', [
  'templates-app',
  'templates-common',
  'cf.signup',
  'cf.dashboard',
  'cf.landing',
  'ui.router',
  'ui.bootstrap',
  'ui.event',
  'formHelpers',
  'cf.utils.directives',
  'fiestah.money'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/landing' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $rootScope ,$scope, $location ) {
  $rootScope.toEs = function(str) {
    var es = {
      'ASSETS':'Activos',
      'LIABILITIES': 'Pasivos',
      'EQUITY': 'Patrimonio'
    };
    return es[str];
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Contafácil ' ;
    }
  });


})

;

