(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('serviceUrl', "https://davids-restaurant.herokuapp.com/");

  // Menu data service.
  MenuDataService.$inject = ['$http', 'serviceUrl'];
  function MenuDataService($http, serviceUrl) {
    // Give myself a handle.
    var srvc = this;

    // Get category data from REST API.
    srvc.getAllCategories = function () {
      var urlMod = 'categories.json';

      return $http({
        method: 'GET',
        url: (serviceUrl + urlMod)
      })
      .then (
        // .then first argument, resolution of promise, doesn't have to be named.
        function success(_response) {
          // Return the result.
          return _response.data;
      });
    };

    // Get category items from REST API.
    srvc.getItemsForCategory = function (_categoryShortName) {
      var urlMod = 'menu_items.json'

      return $http({
        method: 'GET',
        url: (serviceUrl + urlMod),
        params: {
          category: _categoryShortName
        }
      })
      .then (
        // .then first argument, resolution of promise, doesn't have to be named.
        function success(_response) {
          // Return the result.
          return _response.data.menu_items;
      });
    };
  }
})();
