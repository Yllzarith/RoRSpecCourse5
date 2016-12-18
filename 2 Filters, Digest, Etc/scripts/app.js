(function () {
  'use strict';

  // Setup the Angular app.
  angular.module('ShoppingListCheckOff', [])
    // Controllers.
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    // Service.
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // AlreadyBoughtController.
  // Inject our data service.
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    // Controller handle.
    var ctrl = this;

    // Get bought items.
    ctrl.list = ShoppingListCheckOffService.GetBoughtItems();
  }

  // ToBuyController.
  // Inject service.
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    // Controller handle.
    var ctrl = this;

    // Get items to buy.
    ctrl.list = ShoppingListCheckOffService.GetItemsToBuy();

    // Wire up buying method.
    ctrl.BuyItem = function (_item_index) {
      try {
        ShoppingListCheckOffService.BuyItem(_item_index);
      } catch (error) {
        console.log(error.message);
      }
    };
  }

  // Declare the service that will be shared between the controllers.
  function ShoppingListCheckOffService() {
    // Give myself a handle.
    var srvc = this;

    // Pre-defined lists, per tech spec.
    var list_bought = [];
    var list_to_buy = [
      {
        name: "Milk",
        quantity: "4L"
      },
      {
        name: "Eggs",
        quantity: "12"
      },
      {
        name: "Flour",
        quantity: "1KG"
      },
      {
        name: "Salt",
        quantity: "500g"
      },
      {
        name: "Sugar",
        quantity: "2KG"
      },
      {
        name: "Pie filling",
        quantity: "1 can"
      },
      {
        name: "Pre-baked pie",
        quantity: "1"
      }
    ];

    // Buy an item method.
    srvc.BuyItem = function (_item_index) {
      if (!list_to_buy[_item_index]) {
        // Throw error that item isn't found in the list of items to buy.
        throw new Error("Couldn't find item with index '" + _item_index + "'!");
      } else {
        // Move the 'bought' item to the bought items list.
        list_bought.push(list_to_buy[_item_index]);
        list_to_buy.splice(_item_index, 1);
      }
    };

    // Provide accessors for lists.
    srvc.GetItemsToBuy = function () {
      return list_to_buy;
    };

    srvc.GetBoughtItems = function () {
      return list_bought;
    };
  }
})();
