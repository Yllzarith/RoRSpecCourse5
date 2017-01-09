(function () {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['_userInfo'];
  function MyInfoController(_userInfo) {
    var ctrl = this;
    ctrl.userInfo = _userInfo;
  }
})();
