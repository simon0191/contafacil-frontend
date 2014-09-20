angular.module( 'formHelpers', [] )

.directive( 'cfRequired', function() {
  return {
    link: function( scope, element, attrs ) {
      element.attr('ng-class',"{'has-error':(form.$dirty && form.userName.$error.required)}");
    }
  };
})

;

