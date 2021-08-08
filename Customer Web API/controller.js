app.controller('homeController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.vm = {}

    var checkSessionStorage = function () {
        if (sessionStorage.user == null) {
            $scope.vm.user = ""
            $scope.vm.logout = true
            $scope.vm.login = false
            $scope.vm.registration = false
        }

        if (sessionStorage.user != null) {
            $scope.vm.user = sessionStorage.user
            $scope.vm.logout = false
            $scope.vm.login = true
            $scope.vm.registration = true
        }
    }

    checkSessionStorage()

    $scope.logout = function () {
        sessionStorage.removeItem("user");
        checkSessionStorage()
        $window.location.href = "MainPage.html#/login"
    }

}]).controller('registerController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.submit = function () {
        console.log($scope.vm.accountDetails)

        var request = {
            method: 'POST',
            url: 'http://localhost:58382/api/v1/UserAuth/Register',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: $scope.vm.accountDetails
        }

        $http(request)
            .then(function (result) {
                console.log(result.data)
                $window.location.href = "MainPage.html#/login"
            })
            .catch(function (reject) {
                $scope.vm.requestMessage = reject.data.Message
                $scope.vm.class = "bg-success"
                $scope.vm.style = "'background-color' : 'forestgreen'"
            })
    }
}]).controller('loginController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.login = function () {
        console.log($scope.vm.loginDetails)

        var request = {
            method: 'POST',
            url: 'http://localhost:58382/api/v1/UserAuth/Login',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: $scope.vm.loginDetails
        }

        $http(request)
            .then(function (result) {
                console.log(result.data)
                sessionStorage.user = JSON.stringify($scope.vm.loginDetails.UserName);
                $window.location.href = "MainPage.html"
            })
            .catch(function (reject) {
                $scope.vm.requestMessage = reject.data.Message
                $scope.vm.class = "bg-danger"
                $scope.vm.style = "'background-color' : 'coral'"
            })
    }
}]).controller('passbookController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.vm = {}

    if (sessionStorage.user == null) {
        $window.location.href = "MainPage.html"
    }
    $scope.vm.user = sessionStorage.user

    if (sessionStorage.user != null) {
        var request = {
            method: 'GET',
            url: 'http://localhost:58382/api/v1/Transaction/' + JSON.parse(sessionStorage.user) + '/GetTransaction',
        }

        $http(request)
            .then(function (result) {
                $scope.vm.passbookDetails = result.data
            })
            .catch(function (reject) {
                $scope.vm.output = reject.data
                console.log(reject)
            })
    }

}]).controller('transactionController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.vm = {}
    if (sessionStorage.user == null) {
        $window.location.href = "MainPage.html"
    }


    $scope.vm.requestMessage = ""
    $scope.vm.class = ""
    $scope.vm.style = ""

    $scope.doTransaction = function () {
        console.log($scope.vm.transactionDetails)

        var request = {
            method: 'POST',
            url: 'http://localhost:58382/api/v1/Transaction/' + JSON.parse(sessionStorage.user) + '/DoTransaction',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: $scope.vm.transactionDetails
        }

        $http(request)
            .then(function (result) {
                $scope.vm.requestMessage = result.data
                $scope.vm.class = "bg-success"
                $scope.vm.style = "'background-color' : 'forestgreen'"
            })
            .catch(function (reject) {
                $scope.vm.requestMessage = reject.data.Message
                $scope.vm.class = "bg-danger"
                $scope.vm.style = "'background-color' : 'coral'"
            })

    }
}]).filter("type", function () {
    return function (type) {
        switch (type) {
            case "D":
                return "Deposit";
            case "W":
                return "Withdraw";
        }
    }
})
