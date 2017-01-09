(function () {
  'use strict';

  angular.module('common')
    .service('UserInfoService', UserInfoService);

  // This service will service to store the user's inputted info.
  UserInfoService.$inject = ['MenuService', '$resource', 'ApiPath'];
  function UserInfoService(MenuService, $resource, ApiPath) {
    var srvc = this;

    // Save the user info.
    srvc.AddUser = function (_user) {
      // Configure the $resource request.
      var req = $resource(ApiPath + '/menu_items/:short_name.json');

      // GET data and return the result the controller needs to know about.
      return req.get({short_name: _user.fav}).$promise.then(
        function (response) {
          srvc.user = _user;
          srvc.user.MenuItem = response;
          return srvc.user;
        }
      );
    };

    // Retrieve saved user info.
    srvc.GetUser = function () {
      return srvc.user;
    };
  }
})();
