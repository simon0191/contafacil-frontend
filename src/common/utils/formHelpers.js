angular.module( 'formHelpers', [] )

//TODO:
.directive( 'cfRequired', function() {
  return {
    link: function( scope, element, attrs ) {
      //This doesn't work, but illustrates the idea...
      //element.attr('ng-class',"{'has-error':(form.$dirty && form.userName.$error.required)}");
    }
  };
})

;

