angular.module('cf.landing',[])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'landing', {
    url: '/landing',
    views: {
      'main': {
        templateUrl: 'landing/landing.tpl.html'
      }
    },
    data:{ pageTitle: 'Inicio' }
  });
})
.controller('LandingCtrl',['$location','$scope',
  function($location,$scope) {
    $scope.signup = function() {
      $location.path('/signup');
    };
  }
])
;
