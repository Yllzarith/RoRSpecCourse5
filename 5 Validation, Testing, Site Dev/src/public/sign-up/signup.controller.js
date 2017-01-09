(function () {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  // This controller will handle the user's My Info input.
  // Inject the scope and the service that will store the user data.
  SignupController.$inject = ['UserInfoService'];
  function SignupController(UserInfoService) {
    // Controller handle.
    var ctrl = this;

    ctrl.Submit = function () {
      // Not bothering to validate form input on this side as
      // submit is disabled until form is valid.  If JS bypassed
      // to enable submit the rest of this app won't work, anyway.
      var rtrn = UserInfoService.AddUser(ctrl.user);
      rtrn.then(
        function (response) {
          ctrl.invalidfav = false;
          ctrl.completed = true;
        },
        function (response) {
          ctrl.invalidfav = true;
          ctrl.completed = false;
        }
      );
    }
  }
})();
