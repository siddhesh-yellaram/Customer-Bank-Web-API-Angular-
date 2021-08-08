var app = angular.module("bankApp", ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'welcome.html',
    }).when('/passbook', {
        templateUrl: 'Passbook.html',
        controller: 'passbookController'
    }).when("/register", {
        templateUrl: 'Register.html',
        controller: 'registerController'
    }).when("/login", {
        templateUrl: 'Login.html',
        controller: 'loginController'
    }).when("/transaction", {
        templateUrl: 'Transaction.html',
        controller: 'transactionController'
    });
}]);