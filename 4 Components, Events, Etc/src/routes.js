(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    // Could use this to redirect to a 404/not found page, instead.
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.html'
    })

    // Categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/home.html',
      controller: 'CategoriesController as catList',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Category items page
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/menuapp/templates/home.html',
      controller: 'CategoryItemsController as itemList',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    })

    // // Premade list page
    // .state('mainList', {
    //   url: '/main-list',
    //   templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    //   controller: 'MainShoppingListController as mainList',
    //   resolve: {
    //     items: ['ShoppingListService', function (ShoppingListService) {
    //       return ShoppingListService.getItems();
    //     }]
    //   }
    // })
    //
    // .state('mainList.itemDetail', {
    //   url: '/item-detail/{itemId}',
    //   templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    //   controller: "ItemDetailController as itemDetail"
    // });
  }
})();
