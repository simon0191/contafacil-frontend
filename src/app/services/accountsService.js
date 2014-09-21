angular.module( 'cf')
.factory('accountsService', ['$rootScope','$q', 'usersService',
  function($rootScope,$q,usersService) {

    var accounts = [
      {id:1,pucId:11,name:'Disponible',accountType:'ASSETS', companyId:1, initialBalance: "0"},
      {id:4,pucId:15,name:'Propiedad planta y equipo',accountType:'ASSETS', companyId:1, initialBalance: "0"},

      {id:5,pucId:21,name:'Obligaciones financieras',accountType:'LIABILITIES', companyId:1, initialBalance: "0"},
      {id:6,pucId:22,name:'Proveedores',accountType:'LIABILITIES', companyId:1, initialBalance: "0"},
      {id:7,pucId:23,name:'Cuentas por pagar',accountType:'LIABILITIES', companyId:1, initialBalance: "0"},

      {id:8,pucId:31,name:'Capital social',accountType:'EQUITY', companyId:1, initialBalance: "0"},
      {id:9,pucId:3605,name:'Utilidad del ejercicio',accountType:'EQUITY', companyId:1, initialBalance: "0"}


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
