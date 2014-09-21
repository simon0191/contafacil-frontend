angular.module( 'cf')
.factory('transactionsService', ['$rootScope','$q', 'usersService',
  function($rootScope,$q,usersService) {

    var transactions = [
      {id:1, transactionType:'EXPENSE', amount:10000, description: 'Pago salario',companyId:1, pending: false, date: '2014-09-20T19:21:33.254Z'},
      {id:2, transactionType:'EXPENSE', amount:15000, description: 'Pago desarrollo página',companyId:1, pending: true, date: '2013-10-03T19:21:33.254Z'},
      {id:2, transactionType:'INCOME', amount:5000, description: 'Pago desarrollo página',companyId:1, pending: false, date: '2014-09-20T19:21:33.254Z'},
      {id:2, transactionType:'INCOME', amount:30500, description: 'Pago desarrollo página',companyId:1, pending: true, date: '2014-09-20T19:21:33.254Z'},
      {id:2, transactionType:'EXPENSE', amount:15000, description: 'Pago desarrollo página',companyId:1, pending: true, date: '2014-09-20T19:21:33.254Z'}
    ];
    return {
      list: function(query) {
        var deferred = $q.defer();

        var currentUser = usersService.getCurrentUser();
        var result = _(transactions).filter(function(t) {
          return t.companyId == currentUser.companyId;
        });
        result = _(result).map(function(tx) {
          tx.date = new Date(tx.date);
            return tx;
        });
        if(query && _(query).any(function(filter){return filter.active;}) ) {

          result = _(result).filter(function(tx) {
            if(query.done.active && !tx.pending) {
              return true;
            }
            if(query.pending.active && tx.pending) {
              return true;
            }
            return false;
          });
        }
        deferred.resolve(result);

        return deferred.promise;
      },
      create: function(transaction) {
        var deferred = $q.defer();

        transaction.id = transactions.length;
        transactions.push(transaction);

        deferred.resolve(transaction);

        return deferred.promise;
      }
    };
}]);
