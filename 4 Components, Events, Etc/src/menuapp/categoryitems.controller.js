(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoryItemsController', CategoryItemsController);

  CategoryItemsController.$inject = ['MenuDataService', '$stateParams'];
  function CategoryItemsController(MenuDataService, $stateParams) {
    var itemList = this;
    var response = MenuDataService.getItemsForCategory($stateParams.categoryShortName);

    response.then(
      function(_data) {
        itemList.items = _data;
      }
    );
  }
})();
