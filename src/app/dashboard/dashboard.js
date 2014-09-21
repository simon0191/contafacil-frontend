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
.directive('cfTransaction', [
  '$rootScope','$modal',
  function($rootScope,$modal) {
    return {
      scope: {
        transaction:'=cfTransaction'
      },
      link: function(scope, element, attrs) {
        element.on('click', function() {
          $modal.open({
            templateUrl: 'dashboard/accountRecordsCreationForm.tpl.html',
            size: 'lg',
            resolve: {
              'transaction': function() {
                return scope.transaction;
              }
            },
            controller: [
              '$scope','transaction','$filter','accountsService',
              function($scope,transaction,$filter,accountsService) {
                $scope.transaction = transaction;
                $scope.accounts = [];
                $scope.accountsRecords = _(2).times(function(i) {
                  return {
                    date: $filter('date')(transaction.date, "yyyy-MM-dd"),
                    amount: transaction.amount,
                    description: transaction.description,
                    transactionType: ['DEBIT','CREDIT'][i],
                    companyId: transaction.companyId,
                    account: ''
                  };
                });
                $scope.removeAccountRecord = function(index) {
                  $scope.accountsRecords.splice(index,1);
                };
                $scope.addAccountRecord = function() {
                  $scope.accountsRecords.push({
                    date: $filter('date')(transaction.date, "yyyy-MM-dd"),
                    amount: transaction.amount,
                    description: transaction.description,
                    companyId: transaction.companyId,
                    account: ''
                  });
                };

                $scope.saveAccountsRecords = function() {
                  //TODO: actually save the accounts records
                  $scope.transaction.pending = false;
                  $scope.$close();
                };

                //Start
                accountsService.list().then(function(accounts) {
                  $scope.accounts = accounts;
                });

              }
            ]
          });
        });
      }
    };
  }
])
;