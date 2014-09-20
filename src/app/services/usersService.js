
angular.module( 'cf')
.factory('usersService', ['$rootScope','$q', function($rootScope,$q) {

    var genAuthToken = function() {
      return 'asd'+Math.floor(Math.random()*100)+'345sdfg45s'+Math.floor(Math.random()*100);
    };
    var users = [
      {
        username: 'simon@contafacil.co',
        authToken: genAuthToken(),
        companyId: 1
      }
    ];
    var currentUser = users[0];

    return {
      signup: function(user, company) {
        var deferred = $q.defer();
        //Mock web user registration web service
        currentUser = {
          username: user.email,
          authToken: genAuthToken(),
          companyId: 1
        };
        deferred.resolve(currentUser);

        return deferred.promise;
      },
      getCurrentUser: function() {
        return currentUser;
      }
    };
}]);
