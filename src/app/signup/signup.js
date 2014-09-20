
angular.module( 'cf.signup', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'signup', {
    url: '/signup',
    views: {
      'main': {
        templateUrl: 'signup/signup.tpl.html'
      }
    },
    data:{ pageTitle: 'Creación de cuenta' }
  });
  $stateProvider.state( 'initialBalance', {
    url: '/signup/initial-balance',
    views: {
      'main': {
        templateUrl: 'signup/initialBalance.tpl.html'
      }
    },
    data:{ pageTitle: 'Balance inicial' }
  });
})

.controller( 'SignupCtrl', ['$scope','usersService','$location',
  function( $scope, usersService, $location ) {
    $scope.user = {};
    $scope.company = {};
    $scope.submitSignupForm = function() {
      usersService.signup($scope.user, $scope.company)
        .then(function(currentUser) {
          $location.path('/signup/initial-balance');
        });
    };

}])
.controller( 'InitialBalanceCtrl',
  ['$scope','accountsService','$location','$modal','$rootScope',
  function( $scope, accountsService, $location, $modal , $rootScope) {
    $scope.accounts = [];
    $scope.totalAssets = 0;
    $scope.totalLiabilities = 0;
    $scope.totalEquity = 0;
    $scope.openAccountForm = function() {
      $modal.open({
        templateUrl: 'signup/accountCreationForm.tpl.html',
        size: 'sm'
      });
    };
    $scope.updateTotals = function() {
      $scope.totalAssets = 0;
      $scope.totalLiabilities = 0;
      $scope.totalEquity = 0;

      _($scope.accounts).each(function(account) {
        switch(account.accountType) {
          case 'ASSETS':
            $scope.totalAssets+=account.initialBalance;
          break;
          case 'LIABILITIES':
            $scope.totalLiabilities+=account.initialBalance;
          break;
          case 'EQUITY':
            $scope.totalEquity+=account.initialBalance;
          break;
        }
      });
    };
    $rootScope.$on('initialBalance:addAccount', function(event, account) {
      $scope.accounts.push(account);
      $scope.updateTotals();
    });

    accountsService.list().then(function(accounts) {
      $scope.accounts = accounts;
    });

}])
.controller('AccountCreationCtrl',
  ['$scope','accountsService','usersService','$rootScope',
  function($scope,accountsService,usersService,$rootScope) {
    var currentUser = usersService.getCurrentUser();
    $scope.account = {
      pucId:'',
      name:'',
      accountType: '',
      companyId:currentUser.companyId,
      initialBalance: 0
    };
    $scope.addAccount = function() {
      $rootScope.$emit('initialBalance:addAccount',$scope.account);
      $scope.$close();
    };
}]);

