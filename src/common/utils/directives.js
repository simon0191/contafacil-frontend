angular.module('cf.utils.directives',[])
.directive('cfFilterItem',[
  '$rootScope',
  function($rootScope) {
    return {
      scope: {
        filterParent: '@',
        filterName: '@'
      },
      link: function(scope, element, attrs) {
        element.on('click', function(event) {
          element.toggleClass('active');
          $rootScope.$emit('filterItemChange:'+scope.filterParent,{filterName:scope.filterName});
        });
      }
    };
}])
.directive('cfFilter',[
  '$rootScope',
  function($rootScope) {
    return {
      scope: {
        listToFilter: '@',
        filterName: '@',
        filters: '='
      },
      link: function(scope, element, attrs) {
        var state = {};
        _.each(scope.filters, function(f) {
          state[f] = {name:f,active:false};
        });

        $rootScope.$on('filterItemChange:'+scope.filterName,function(event,data) {
          state[data.filterName].active = !state[data.filterName].active;
          $rootScope.$emit('filterChange:'+scope.listToFilter,{filterState:state});
        });
      }
    };
  }
]);