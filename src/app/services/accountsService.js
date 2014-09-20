angular.module( 'cf')
.factory('accountsService', ['$rootScope','$q', 'usersService',
  function($rootScope,$q,usersService) {

    var accounts = [
      {id:1,pucId:456,name:'vehículos',accountType:'ASSETS', companyId:1, initialBalance: 0},
      {id:2,pucId:556,name:'patrimonio',accountType:'EQUITY', companyId:1, initialBalance: 0}
    ];
    return {
      list: function() {
        var deferred = $q.defer();

        var currentUser = usersService.getCurrentUser();
        var result = _(accounts).filter(function(a) {
          return a.companyId == currentUser.companyId;
        });
        deferred.resolve(result);

        return deferred.promise;
      },
      create: function(account) {
        var deferred = $q.defer();
        //Mock web user registration web service
        //TODO: verify not repeated puc
        account.id = accounts.length;
        accounts.push(account);

        deferred.resolve(account);

        return deferred.promise;
      }
    };
}]);
