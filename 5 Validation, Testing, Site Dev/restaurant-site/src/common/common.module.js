(function() {
"use strict";

angular.module('common', ['ngResource'])
.constant('ApiPath', 'https://yllzarith-restaurant-server.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
