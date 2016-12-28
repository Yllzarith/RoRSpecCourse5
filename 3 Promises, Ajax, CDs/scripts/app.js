(function () {
  'use strict';

  // Setup the Angular app.
  angular.module('NarrowItDownApp', [])
    // Controllers.
    .controller('NarrowItDownController', NarrowItDownController)
    // Service factories.
    .factory('MenuSearchServiceFactory', MenuSearchServiceFactory)
    // Directives.
    .directive('foundItems', FoundItemsDirective)
    // Constants
    .constant('serviceUrl', "https://davids-restaurant.herokuapp.com/menu_items.json");

  // Narrow it down controller.
  NarrowItDownController.$inject = ['$scope', 'MenuSearchServiceFactory'];
  function NarrowItDownController($scope, MenuSearchServiceFactory) {
    // Controller init.
    var ctrl = this;

    // Obtain new menu search service via factory.
    var menuSearch = MenuSearchServiceFactory();

    // Store search result in instance variable.
    ctrl.NarrowItDownForMe = function() {
      if ($scope.searchTerm) {
        menuSearch.getMatchedMenuItems($scope.searchTerm)
          .then(function(_response) {
            ctrl.found = [];
            if (_response.length > 0) ctrl.found = _response;
          });
      } else {
        ctrl.found = [];
      }
    };

    // Implementation of "Don't want this."
    ctrl.removeItem = function(_index) {
      ctrl.found.splice(_index, 1);
    };
  }

  // Menu search service.
  function MenuSearchService($http, serviceUrl, $filter) {
    // Give myself a handle.
    var srvc = this;

    // HTTP menu GET.
    srvc.getMatchedMenuItems = function(_search_term) {
      return $http({
        method: 'GET',
        url: serviceUrl
      })
      .then (
        // .then first argument, resolution of promise, doesn't have to be named.
        function success(_response) {
          // Store successful result.
          var menu = _response.data.menu_items;

          // Process items if any were found.
          if (menu.length > 0) {
            var foundItems = $filter('filter')(menu, {description: _search_term});
          }

          // Return the result.
          return foundItems;
      },
      // .then second argument, rejection of promise, doesn't have to be named.
      function error(_response) {
        console.log(_response.status + " " + _response.statusText);
      })
      .catch(function(_error) {
        console.log(_error);
      });
    };
  }

  // Menu search service factory.
  MenuSearchServiceFactory.$inject = ['$http', 'serviceUrl', '$filter'];
  function MenuSearchServiceFactory($http, serviceUrl, $filter) {
    var factory = function() {
      return new MenuSearchService($http, serviceUrl, $filter);
    };

    return factory;
  }

  // Menu found items directive.
  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'loader/itemsloaderindicator.template.html'
    };

    return ddo;
  }
})();
