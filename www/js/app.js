var MassMobileMassageApp = angular.module('MassMobileMassageApp', ['ngRoute', 'MassMobileMassageAppControllers', 'ngSanitize', 'ngAnimate', 'ngCordova']);

MassMobileMassageApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/index', {
      templateUrl: 'partials/index.html',
      controller: 'indexController'
    }).
    when('/MassageType', {
      templateUrl: 'partials/MassageType.html',
      controller: 'MassageTypeController'
    }).
    when('/MassageTypeNext/:massageType/:id', {
      templateUrl: 'partials/MassageTypeNext.html',
      controller: 'MassageTypeNextController'
    }).
    when('/PaymentScreen', {
      templateUrl: 'partials/PaymentScreen.html',
      controller: 'PaymentScreenController'
    }).
    when('/MassageForm', {
      templateUrl: 'partials/MassageForm.html',
      controller: 'MassageFormController'

    }).
    when('/ChairMassageForm', {
      templateUrl: 'partials/ChairMassageForm.html',
      controller: 'ChairMassageFormController'
    }).
    when('/GiftCertificates', {
      templateUrl: 'partials/GiftCertificates.html',
      controller: 'GiftCertificatesController'
    }).

    when('/Login/:fromWhere', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    }).

    when('/forgotPassword', {
      templateUrl: 'partials/forgotpass.html',
      controller: 'ForgotpwdController'
    }).
    when('/SignUp', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupController'
    }).
    when('/About', {
      templateUrl: 'partials/About.html',
      controller: 'AboutController'
    }).
    when('/ContactUs', {
      templateUrl: 'partials/ContactUs.html',
      controller: 'ContactUsController'
    }).
    when('/Packages', {
      templateUrl: 'partials/packages.html',
      controller: 'PackagesController'
    }).
    when('/Membership', {
      templateUrl: 'partials/Memberships.html',
      controller: 'MembershipController'
    }).

    when('/Prices', {
      templateUrl: 'partials/prices2.html',
      controller: 'PriceController'
    }).

    when('/Profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileController'
    }).
    when('/ResetPwd', {
      templateUrl: 'partials/resetpassword.html',
      controller: 'ResetPasswordController'
    }).
    when('/TermsandConditions/:fromWhere', {
      templateUrl: 'partials/TermsConditions.html',
      controller: 'TermController'
    }).
    when('/Preview', {
      templateUrl: 'partials/preview.html',
      controller: 'PreviewController'
    }).
    when('/PreviewNext/:name1/:name2', {
      templateUrl: 'partials/previewnext.html',
      controller: 'PreviewNextController'
    }).
    when('/Checkout', {
      templateUrl: 'partials/Checkout.html',
      controller: 'CheckoutController'
    }).
    when('/CheckoutMassage/:price1', {
      templateUrl: 'partials/CheckoutNext.html',
      controller: 'CheckoutMassageController'
    }).
    when('/CheckoutMembership/:total_price/:product_id/:name/:type/:title', {
      templateUrl: 'partials/CheckoutMembership.html',
      controller: 'CheckoutMembershipController'
    }).
    when('/PaypalPayment/:price/:tipprice', {
      templateUrl: 'partials/PaypalPayment.html',
      controller: 'PaymentController'
    }).

    when('/PaypalPaymentMassage/:completeresponse/:price/:tipprice', {
      templateUrl: 'partials/PaypalPayment.html',
      controller: 'PaypalPaymentMassageController'
    }).
    when('/PaypalPackage/:package/:tipprice', {
      templateUrl: 'partials/PaypalPayment.html',
      controller: 'PaymentPackagesController'
    }).
    when('/PaypalPackageOther/:price', {
      templateUrl: 'partials/PaypalPayment.html',
      controller: 'PaymentPackagesOtherController'
    }).
    when('/PaypalMembership/:productid/:type/:tipprice', {
      templateUrl: 'partials/PaypalPaymentMembership.html',
      controller: 'PaypalMembershipController'
    }).
    otherwise({
      redirectTo: '/index',
    });


}
]);


MassMobileMassageApp.directive('menu', function () {
  return {
    restrict: "E",
    template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
    transclude: true,
    scope: {
      visible: "=",
      alignment: "@"
    }
  };
});

MassMobileMassageApp.directive('menuItem', function () {
  return {
    restrict: "E",
    template: "<div ng-click='click()' ng-transclude></div>",
    transclude: true,
    scope: {
      hash: "@"
    },
    link: function ($scope) {
      $scope.navigate = function () {
        window.location.hash = $scope.hash;
      }
    }
  }
});

MassMobileMassageApp.directive('starRating', function () {
  return {
    restrict: 'A',
    template: '<ul class="rating">' +
      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
      '\u2605' +
      '</li>' +
      '</ul>',
    scope: {
      ratingValue: '=',
      max: '=',
      onRatingSelected: '&'
    },
    link: function (scope, elem, attrs) {

      var updateStars = function () {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };

      scope.toggle = function (index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating: index + 1
        });
      };

      scope.$watch('ratingValue', function (oldVal, newVal) {
        if (newVal) {
          updateStars();
        }
      });
    }
  }
});

MassMobileMassageApp.filter('unsafe', function ($sce) { return $sce.trustAsHtml; });
MassMobileMassageApp.filter('roundoff', function ($sce) { return $sce.trustAsHtml; });

MassMobileMassageApp.filter('custom', function () {
  return function (value) {
    var value1 = value.substr(0, value.indexOf('-'));
    /*var value2 = value.slice(value.indexOf('-')+1   , value.lastIndexOf(' '));*/

    return value1;
  }

});

MassMobileMassageApp.filter('custom2', function () {
  return function (value) {
    var value2 = value.slice(value.indexOf('-') + 1, value.lastIndexOf(' '));
    var value3 = angular.lowercase(value.substr(value.lastIndexOf(' ')));

    return value2 + " " + value3;
  }

});


MassMobileMassageApp.run(function ($rootScope, $window, $location, $cordovaDialogs, $http, $route, $cordovaNetwork) {

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 27)
      $rootScope.$broadcast("escapePressed", e.target);
  });
  document.addEventListener("click", function (e) {
    $rootScope.$broadcast("documentClicked", e.target);
  });

  $rootScope.slide = '';
  $rootScope.test = [];

  $rootScope.$on('$routeChangeStart', function () {

    document.addEventListener("deviceready", function () {
      var push = PushNotification.init({
        android: {
          senderID: "530347547946"
        }
      });

      push.on('registration', function (data) {


        localStorage.setItem("DeviceToken", data.registrationId);

      });

      push.on('notification', function (data) {

      });

      push.on('error', function (e) {
      });
    }, false);
    $rootScope.leftVisible = false;
    $rootScope.rightVisible = false;
    //                                 $rootScope.refreshEnd();
    $rootScope.close = function () {
      $rootScope.leftVisible = false;
      $rootScope.rightVisible = false;
    }

    $rootScope.showLeft = function (e) {
      var element = document.getElementById("menu-left");
      if (element != null) {

        element.style.display = "block";
      }

      $rootScope.leftVisible = true;
      e.stopPropagation();
    }

    $rootScope.showRight = function (e) {
      $rootScope.rightVisible = true;
      e.stopPropagation();
    }

    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapePressed", _close);

    function _close() {

      var element = document.getElementById("menu-left");


      if (element != null) {

        element.style.display = "none";
      }


      $rootScope.$apply(function () {
        $rootScope.close();
      });
    }
    //event button to move backward
    $rootScope.back = function () {
      $rootScope.slide = 'slide-right';
      $window.history.back();
      window.scrollTo(0, 0);
    }
    //event button item list to move forward
    $rootScope.next = function () {
      $rootScope.slide = 'slide-left';
      window.scrollTo(0, 0);
    }
    //for loder
    $rootScope.setLoading = function (loading) {
      $rootScope.isLoading = loading;
    }
    // alert message in angular material
    $rootScope.signinregister = function () {

      if (localStorage.getItem("user_id") != null && !angular.isUndefined(localStorage.getItem("user_id"))) {

        $rootScope.next();
        $location.path('/Profile');
      }
      else {

        $rootScope.next();
        $location.path('/Login/normal');
      }

    }


    $rootScope.gotocart = function () {


      $rootScope.next();
      $location.path('/Checkout');
    }

    $rootScope.bookmassage = function () {


      $rootScope.next();
      $location.path('/MassageType');
    }

    $rootScope.packages = function () {
      $rootScope.next();
      $location.path('/Packages');
    }

    $rootScope.membership = function () {
      $rootScope.next();
      $location.path('/Membership');
    }



    $rootScope.chairmassage = function () {
      $rootScope.next();
      $location.path('/ChairMassageForm');
    }

    $rootScope.giftcertificate = function () {
      $rootScope.next();
      $location.path('/GiftCertificates');
    }


    $rootScope.contactus = function () {

      $rootScope.next();
      $location.path('/ContactUs');
    }

    $rootScope.about = function () {
      $rootScope.next();
      $location.path('/About');
    }

    $rootScope.home = function () {
      $rootScope.next();
      $location.path('/index');
    }

    $rootScope.clickItem = function (item) {
      // alert(JSON.stringify(item))
      if (item.slug == 'home') {
        $rootScope.next();
        $location.path('/index');
      } else if (item.slug == 'account') {
        if (localStorage.getItem("user_id") != null && !angular.isUndefined(localStorage.getItem("user_id"))) {

          $rootScope.next();
          $location.path('/Profile');
        }
        else {

          $rootScope.next();
          $location.path('/Login/normal');
        }
      } else if (item.slug == 'book_massage') {
        $rootScope.next();
        $location.path('/MassageType');
      } else if (item.slug == 'packages') {
        $rootScope.next();
        $location.path('/Packages');
      } else if (item.slug == 'membership_99') {
        $rootScope.next();
        $location.path('/Membership');
      } else if (item.slug == 'chair_massage') {
        $rootScope.next();
        $location.path('/ChairMassageForm');
      } else if (item.slug == 'gift_certificate') {
        $rootScope.next();
        $location.path('/GiftCertificates');
      } else if (item.slug == 'conatct_us') {
        $rootScope.next();
        $location.path('/ContactUs');
      } else if (item.slug == 'delete_account') {
        $rootScope.next();
        $location.path('/DeleteAccount');
      } else if (item.slug == 'about') {
        $rootScope.next();
        $location.path('/About');
      } else if (item.slug == 'payment') {
        $rootScope.next();
        $location.path('/PaymentScreen');
      }

    }
    $rootScope.setLoading = function (loading) {

      $rootScope.isLoading = loading;
    }

    /*=========================================getting paypal transaction_id===================================*/
    $rootScope.payPalTransaction = function (value) {
      //  alert(value);
    }

    /*================================logout=================================*/
    $rootScope.logout = function () {
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', 'Attention', 'OK')
          .then(function () {

          });
      } else {


        $rootScope.setLoading(true);

        var dataObj = {
          device_id: toaster.getdeviceId()
        };
        console.log("logout : " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_users_logout.json', dataObj);

        res.success(function (data, status, headers, config) {
          console.log("responselogoutMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, 'Attention', 'OK')
              .then(function () {
                $window.localStorage.clear();
                $route.reload();
                $rootScope.next();
                $location.path('/index');

              });
          } else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, 'Attention', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert(data.response.message, 'Attention', 'OK')
              .then(function () {
                // callback success
              });



          }

        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', 'Attention', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', 'Attention', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({ data: data }));
        });


      }

    }
  });

});

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
  var page = localStorage.getItem("page_id");
  switch (parseInt(page)) {
    case 1:
      navigator.notification.confirm(
        'Do you want to exit from Mass Mobile App?',
        onConfirmLOGOUT,
        'Attention',
        ['Cancel', 'Confirm']
      );
      break;
    case 19:
      break;
    case 7:
      break;
    case 4:
      var $body = angular.element(document.body);
      var $rootScope = $body.scope().$root;
      $rootScope.$apply(function () {
        $rootScope.massageFormBack();
      });

    default:
      window.history.go(-1);
      break;
  }
}

function onConfirmLOGOUT(buttonIndex) {
  if (buttonIndex == 2) {
    setTimeout(function () {
      toaster.finishApp();
    }, 100);
  }
}

function captureImageCameraProfilePic(imageURI) {
  $("#ProfileImage").attr("src", imageURI);
  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.uploadProfilePic(imageURI);
  });
}

function captureImageGalleryProfilePic(imageURI) {
  $("#ProfileImage").attr("src", imageURI);
  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.uploadProfilePic(imageURI);
  });
}


function payPalTransactionSuccess(transaction_id) {
  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.payPalTransaction(transaction_id);
  });
}

function payPalSuccess() {
  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.payPalSuccess();
  });
}


function timeupdate(hour, min, timeset) {

  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.timeupdate(hour, min, timeset);
  });
}


function dateupdate(year, month, date) {

  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.dateupdate(year, month, date);
  });
}

function dateupdate11(year, month, date) {


  var $body = angular.element(document.body);
  var $rootScope = $body.scope().$root;
  $rootScope.$apply(function () {
    $rootScope.dateupdateForDob(year, month, date);
  }); ``
}