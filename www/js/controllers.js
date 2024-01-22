var MassMobileMassageAppControllers = angular.module("MassMobileMassageAppControllers", []);

var baseUrl = 'https://www.massmobilemassage.com/'

MassMobileMassageAppControllers.controller("indexController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {

  localStorage.setItem("page_id", "1");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  //  $scope.address = localStorage.getItem("city")+' '+localStorage.getItem("state")+' '+localStorage.getItem("country");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.cart_count = localStorage.getItem("cart_count");
  $rootScope.setLoading(true);
  
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  alert( "xhr response-"+xhttp.responseText);
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
     // alert(  "xhr json response-"JSON.stringify(xhttp.responseText));
    }
};
xhttp.open("GET", 'https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8', true);
xhttp.send();
alert(baseUrl + 'rest_pages.json');
  var res = $http.get( 'https://get.geojs.io/v1/ip/country.json?ip=8.8.8.8');
  
  res.success(function (data, status, headers, config) {
  
  alert("responseHomepage: " + JSON.stringify(data));
    console.log("responseHomepage: " + JSON.stringify(data));
    $rootScope.setLoading(false);
    $scope.value = data.response.data.home_links;
    var res = $http.get(baseUrl + 'rest_menu.json');
    
    res.success(function (data, status, headers, config) {
    
    alert(JSON.stringify(data));
      $scope.home_menues = data.response.data.home_menues;
    });
  });
  res.error(function (data, status, headers, config) {

alert("failed-status-"+status+"  config-"+config+" headers-"+headers);

    $rootScope.setLoading(false);
    //alert(data+"  "+status+" "+" "+headers+" "+JSON.stringify(config)+" "+baseUrl+ 'rest_pages.json');
    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {
          // callback success
        });
    } else {
      $cordovaDialogs.alert('There is some problem. Please check and try again later.', '', 'OK')
        .then(function () {
          // callback success
        });
    }
    console.log(" failure message 2: " + JSON.stringify({
      data: data
    }));
  });

  $scope.bookMassageClicked = function (value) {
    if (value.id == "1") {
      $rootScope.next();
      $location.path('/MassageType');
    } else if (value.id == "2") {
      $rootScope.next();
      $location.path('/ChairMassageForm');

    } else if (value.id == "3") {
      $rootScope.next();
      $location.path('/GiftCertificates');

    }
  }

});
MassMobileMassageAppControllers.controller("MassageTypeController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "2");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  } else {

    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_massage_sessions.json');
    res.success(function (data, status, headers, config) {
      console.log("responseMassageFormMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);
      $scope.value = data.response.data.massage_sessions;
      $scope.value1 = data.response.data.chair_massage;


    });
    res.error(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("chefs product details api failure message: " + JSON.stringify({
        data: data
      }));
    });

  }

  $scope.massageTypeClicked = function (value) {


    if (value.id == "1") {
      $rootScope.next();
      $location.path('/MassageTypeNext/' + value.name + "/" + value.id);
    } else if (value.id == "2") {
      $rootScope.next();
      $location.path('/MassageTypeNext/' + value.name + "/" + value.id);

    } else if (value.id == "3") {
      $rootScope.next();
      $location.path('/MassageTypeNext/' + value.name + "/" + value.id);

    }

  }



  $scope.chairTypeClicked = function (value) {
    if (value.id == "1") {
      $rootScope.next();
      $location.path('/ChairMassageForm');
    }
  }


});
MassMobileMassageAppControllers.controller("MassageTypeNextController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "3");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.type = $routeParams.massageType;
  $scope.id = $routeParams.id;
  $scope.pricePercentage = [];
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {
    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_products/prices.json');
    res.success(function (data, status, headers, config) {

      $rootScope.setLoading(false);

      $scope.prices = data.response.data.prices;
      $scope.discount_first_treatment1 = data.response.data.discount_first_treatment;
      $scope.price_label_1 = data.response.data.price_label_1
      $scope.price_label_2 = data.response.data.price_label_2

      var total = $scope.prices.length;
      for (var i = 0; i < total; i++) {
        $scope.discount_first_treatment = data.response.data.prices[i].price_for_first_time_treatment;

        $scope.duration_array = $scope.prices[i].duration;

        var dataObj = { 'duration': $scope.duration_array, 'percentage': $scope.discount_first_treatment };
        $scope.pricePercentage.push(dataObj);
      }

    });
    res.error(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("chefs product details api failure message: " + JSON.stringify({
        data: data
      }));
    });

  }


  $rootScope.setLoading(true);
  var res = $http.get(baseUrl + 'rest_massages.json');


  res.success(function (data, status, headers, config) {

    $rootScope.setLoading(false);
    $scope.massages = data.response.data.massages;
    $scope.durations = data.response.data.durations;
    $scope.therapist_genders = data.response.data.therapist_genders;
    $scope.massage_is_for = data.response.data.massage_is_for;
  });
  res.error(function (data, status, headers, config) {
    $rootScope.setLoading(false);
  });

  $scope.gotoPackages = function () {
    $rootScope.next();
    $location.path('/Packages');
  }


  $scope.wellMembership = function () {
    $rootScope.next();
    $location.path('/Membership');
  }

  $scope.showPopUp = function () {
    $scope.isVisible = true;
  }

  $scope.closePopUp = function () {
    $scope.isVisible = false;
  }

  $scope.toggleClick = function () {

    $scope.ifCheck = $scope.ifCheck === false ? true : false;
  }

  $scope.termsandconditionseeker = function () {
    $scope.showPopUp();
  }
  $scope.submsgnextClicked = function () {

    if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {


      if ($scope.id == "2") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender1)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender2)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender1 = $scope.gender1;
          params.gender2 = $scope.gender2;
          params.instruction = $scope.instruction;
          params.id = $scope.id;

          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');


        }


      }
      else if ($scope.id == "3") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration ", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;
          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');

        }


      }
      else {
        if (angular.isUndefined($scope.massage_id)) {
          $cordovaDialogs.alert("Please select massage type", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {

          var params = new Object();

          params.massage = $scope.massage_id;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;
          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');


        }

      }
    }


    else {


      if ($scope.id == "2") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender1)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender2)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender1 = $scope.gender1;
          params.gender2 = $scope.gender2;
          params.instruction = $scope.instruction;
          params.id = $scope.id;


          localStorage.setItem("savevalueformassage", JSON.stringify(params));

        }


      }
      else if ($scope.id == "3") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration ", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;


          localStorage.setItem("savevalueformassage", JSON.stringify(params));

        }


      }
      else {
        if (angular.isUndefined($scope.massage_id)) {
          $cordovaDialogs.alert("Please select massage type", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {

          var params = new Object();

          params.massage = $scope.massage_id;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;

          localStorage.setItem("savevalueformassage", JSON.stringify(params));


        }

      }


      $cordovaDialogs.alert("Please login first to book the massage session", "", "OK").
        then(function () {
          $rootScope.next();
          $location.path('/Login/MassageTypeNext');
        });

    }



  }



  $scope.checkPrice = function () {
    var paramsCheck = new Object();

    paramsCheck.massage = $scope.massage_id;
    paramsCheck.durations = $scope.duration_id;
    paramsCheck.massageFor = $scope.massagefor;
    paramsCheck.gender = $scope.gender;
    paramsCheck.instruction = $scope.instruction;
    paramsCheck.id = $scope.id;

    localStorage.setItem('formfilled', JSON.stringify(paramsCheck));
    $rootScope.next();
    $location.path('/Prices');
  }

  $scope.massageClicked = function (massageID) {

    $scope.massage_id = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType' + massageID).removeClass("active");
        $('#massageType' + massageID).addClass("active");
      }
      else {
        $('#massageType' + ID).removeClass("active");

      }
    }
  }

  $scope.massage1Clicked = function (massageID) {

    $scope.massage_id1 = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType1' + massageID).removeClass("active");
        $('#massageType1' + massageID).addClass("active");
      }
      else {
        $('#massageType1' + ID).removeClass("active");

      }
    }
  }

  $scope.massage2Clicked = function (massageID) {

    $scope.massage_id2 = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType2' + massageID).removeClass("active");
        $('#massageType2' + massageID).addClass("active");
      }
      else {
        $('#massageType2' + ID).removeClass("active");

      }
    }
  }

  $scope.durationsClicked = function (durationID) {

    $scope.duration_id = durationID;

    console.log("duration clicked : " + JSON.stringify($scope.durations));

    for (var i in $scope.durations) {
      var ID = $scope.durations[i].id;
      if (ID == durationID) {
        $('#DurationID' + durationID).removeClass("active");
        $('#DurationID' + durationID).addClass("active");
      }
      else {
        $('#DurationID' + ID).removeClass("active");

      }
    }
  }


});
MassMobileMassageAppControllers.controller("MassageFormController", function ($scope, $http, $rootScope, $routeParams, $location, $window, $cordovaNetwork, $cordovaDialogs, $cordovaDatePicker) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "4");
  $scope.session_token = localStorage.getItem("session_token");
  //        $scope.name = localStorage.getItem("first_name")+' '+localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.valuesFilled = JSON.parse(localStorage.getItem("savevalueformassage"));


  localStorage.removeItem("frommassage");

  if ($scope.valuesFilled.id == "1") {
    $scope.massages = $scope.valuesFilled.massage;
    $scope.product_ids = $scope.valuesFilled.durations;
    $scope.therapist_gender_ids = $scope.valuesFilled.gender;
    $scope.comment = $scope.valuesFilled.instruction;

  }
  else if ($scope.valuesFilled.id == "2") {
    $scope.massages = $scope.valuesFilled.massage_1 + "," + $scope.valuesFilled.massage_2;
    $scope.product_ids = $scope.valuesFilled.durations;
    $scope.therapist_gender_ids = $scope.valuesFilled.gender1 + "," + $scope.valuesFilled.gender2;
    $scope.comment = $scope.valuesFilled.instruction;

  }
  else {
    $scope.massages = $scope.valuesFilled.massage_1 + "," + $scope.valuesFilled.massage_2;
    $scope.product_ids = $scope.valuesFilled.durations;
    $scope.therapist_gender_ids = $scope.valuesFilled.gender;
    $scope.comment = $scope.valuesFilled.instruction;

  }

  $scope.ifNatal = $scope.massages.search("7");

  if ($scope.ifNatal == -1) {
    $scope.edit = "0";
  } else {
    $scope.edit = "1";
  }











  if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {


    $scope.address1 = localStorage.getItem("order_address_line_1");
    //         $scope.citystate=localStorage.getItem("order_city")+' '+localStorage.getItem("order_state");
    $scope.zipcode = localStorage.getItem("order_code");


    $scope.number = localStorage.getItem("phone")
    $scope.fname = localStorage.getItem("first_name");
    $scope.lname = localStorage.getItem("last_name");
    $scope.citystate = localStorage.getItem("city");
    $scope.state = localStorage.getItem("state");


    $scope.date = "";
    $scope.time = "";
    $scope.certificate = ""
    $scope.referredby = "";
    $scope.medication = "";
    $scope.flightwalk = "";
    $scope.parkingsuggestion = "";
    $scope.checkbox = false;

    var flightwalkcheck = localStorage.getItem("flightwalk");
    var parkingsuggestioncheck = localStorage.getItem("parkingsuggestion");
    var medicationcheck = localStorage.getItem("medication");


    if (flightwalkcheck == 'undefined') {

      // alert("flightwalk if"+flightwalkcheck);
      $scope.flightwalk = "";
    }
    else {
      $scope.flightwalk = flightwalkcheck;
      //alert("flightwalk else"+flightwalkcheck);
    }
    if (parkingsuggestioncheck == 'undefined') {
      $scope.parkingsuggestion = "";
    }
    else {
      $scope.parkingsuggestion = parkingsuggestioncheck;
    }
    if (medicationcheck == 'undefined') {
      $scope.medication = "";
    }
    else {

      $scope.medication = medicationcheck;
    }




  }
  else {
    $scope.fname = "";
    $scope.lname = "";
    $scope.number = "";
    $scope.address1 = "";
    $scope.citystate = "";
    $scope.state = "";
    $scope.zipcode = "";
    $scope.date = "";
    $scope.time = "";
    $scope.certificate = ""
    $scope.referredby = "";
    $scope.medication = "";
    $scope.flightwalk = "";
    $scope.parkingsuggestion = "";
    $scope.checkbox = false;
  }




  $scope.activities = "";
  $scope.pets = "";
  $scope.isPregnant = "0";
  $scope.pregnant_comment = "";

  $scope.Decrease_Stress = "0";
  $scope.General_Relaxation = "0";
  $scope.More_Range_of_Motion = "0";
  $scope.Relief_From_Pain = "0";

  $scope.isPregnantClicked = function (value) {
    console.log($scope.isPregnant);
  }

  $scope.checkbox1 = function (value) {
    console.log($scope.Decrease_Stress);
  }
  $scope.checkbox2 = function (value) {
    console.log($scope.General_Relaxation);
  }
  $scope.checkbox3 = function (value) {
    console.log($scope.More_Range_of_Motion);
  }
  $scope.checkbox4 = function (value) {
    console.log($scope.Relief_From_Pain);

  }


  //Date
  $scope.selectDob = function () {
    toaster.openDatePickerForDOB();
  }

  $rootScope.dateupdateForDob = function (year, month, date) {


    var date = date < 10 ? "0" + date.substring(1) : date.substring(1);
    var month = month < 10 ? "0" + month : month;

    $scope.dob = month + '/' + date + '/' + year;


  }








  $scope.massagesubmitClicked = function () {

    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {

        });
    }

    else {
      if ($scope.name == "") {

        $cordovaDialogs.alert('Please fill the name', '', 'OK')
          .then(function () {
          });


        return false;
      }
      else if ($scope.number == "" || angular.isUndefined($scope.number)) {

        $cordovaDialogs.alert('Please fill the phone number', '', 'OK')
          .then(function () {
          });

        return false;
      }
      //                                                else if($scope.dob=="" || angular.isUndefined($scope.dob)){
      //
      //                                                                                           $cordovaDialogs.alert('Please fill the date of birth', '', 'OK')
      //                                                                                           .then(function() {
      //                                                                                                 });
      //
      //                                                                                           return false;
      //                                                                                           }
      else if ($scope.address1 == "") {

        $cordovaDialogs.alert('Please fill the address', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.citystate == "") {

        $cordovaDialogs.alert('Please fill the city', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.state == "" || angular.isUndefined($scope.state)) {

        $cordovaDialogs.alert('Please fill the state', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.zipcode == "") {

        $cordovaDialogs.alert('Please fill the zipcode', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.date == "") {

        $cordovaDialogs.alert('Please fill the date of treatment', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.time == "") {

        $cordovaDialogs.alert('Please fill the time', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.flightwalk == "") {

        $cordovaDialogs.alert('Please fill the floor level', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else if ($scope.parkingsuggestion == "") {

        $cordovaDialogs.alert('Please fill parking suggestions', '', 'OK')
          .then(function () {
          });

        return false;
      }
      else {

        $rootScope.setLoading(true);

        localStorage.setItem("flightwalk", $scope.flightwalk);
        localStorage.setItem("parkingsuggestion", $scope.parkingsuggestion);
        localStorage.setItem("medication", $scope.medication);



        $scope.treat_result = "";
        if ($scope.Decrease_Stress != "0") {
          $scope.treat_result = $scope.treat_result + "" + $scope.Decrease_Stress + ",";
        }
        if ($scope.General_Relaxation != "0") {
          $scope.treat_result = $scope.treat_result + "" + $scope.General_Relaxation + ",";
        }
        if ($scope.More_Range_of_Motion != "0") {
          $scope.treat_result = $scope.treat_result + "" + $scope.More_Range_of_Motion + ",";
        }
        if ($scope.Relief_From_Pain != "0") {
          $scope.treat_result = $scope.treat_result + "" + $scope.Relief_From_Pain;
        }



  $scope.valuesFilled = JSON.parse(localStorage.getItem("savevalueformassage"));


 
var duration_id=$scope.valuesFilled.durations;
var durationval="0";
if(duration_id=="20"){
durationval="60";
}else if(duration_id=="21"){
durationval="90";
}else if(duration_id=="22"){
durationval="120";
}


        var dataObj = {
         product_duration: durationval,
          user_id: localStorage.getItem("user_id"),
          email: localStorage.getItem("user_email"),
          massages: $scope.massages,
          product_id: $scope.product_ids,
          therapist_gender_ids: $scope.therapist_gender_ids,
          comment: $scope.comment,
          first_name: $scope.fname,
          last_name: $scope.lname,
          street_address: $scope.address1,
          city: $scope.citystate,
          state: $scope.state,
          zip_code: $scope.zipcode,
          treatment_date: $scope.date1,
          treatment_time: $scope.time,
          voucher: $scope.certificate,
          referred_by: $scope.referredby,
          medication: $scope.medication,
          floor_and_apt_number: $scope.flightwalk,
          comment: $scope.parkingsuggestion,
          is_pregnant: $scope.checkboxvalue,
          massage_session: $scope.valuesFilled.id - 1,
        
          session_token: localStorage.getItem("session_token"),

phone: $scope.number,
          date_of_birth: $scope.dob,
          activity: $scope.activities,
          pets: $scope.pets,
          is_pregnant: $scope.isPregnant,
          pregnant_comment: $scope.pregnant_comment,
          treatment_results: $scope.treat_result,

        };

        console.log("MassageForm  : " + JSON.stringify(dataObj));
//alert("MassageForm  : " + JSON.stringify(dataObj));
 setTimeout(function () {
                          var res = $http.post(baseUrl + 'rest_orders/pre_order_data.json', dataObj);
        res.success(function (data, status, headers, config) {
      // alert("pre_order_data response: " + JSON.stringify(data));
          $rootScope.setLoading(false);
          if (data.response.status == true) {
            $scope.completeresponse = data.response.data;
            $scope.price = data.response.data.total_price ;
            $scope.product_name = data.response.data.OrderDetail[0].product_name;
            $scope.is_valid_voucher = data.response.data.is_valid_voucher;
            //                  $scope.tip_price = Math.round((data.response.data.total_price * 20) / 100);
            $rootScope.gratuity = Math.round((data.response.data.total_price * 20) / 100);
            $rootScope.travel_amount = parseInt(data.response.data.Order.travel_fee);
            $rootScope.early_or_late_fee = parseInt(data.response.data.Order.early_or_late_Fee);
            localStorage.setItem("order_address_line_1", data.response.data.Order.street_address);
            localStorage.setItem("order_city", data.response.data.Order.city);
            localStorage.setItem("order_state", data.response.data.Order.state);
            localStorage.setItem("order_code", data.response.data.Order.zip_code);
            localStorage.setItem("gratuity", Math.round((data.response.data.total_price * 20) / 100));
            localStorage.setItem("early_or_late_fee", parseInt(data.response.data.Order.early_or_late_Fee));
            localStorage.setItem("travel_amount", parseInt(data.response.data.Order.travel_fee));
            localStorage.setItem("product_name", data.response.data.OrderDetail[0].product_name);

            $scope.totalClicks = '11';

            if ($scope.is_valid_voucher == true) {

              $cordovaDialogs.alert(data.response.message, '', 'OK')

                .then(function () {
                  $rootScope.next();
                  $location.path('/MassageType');
                });
            }

            else {

              if (data.response.code == "PRE_ORDER_DATA_FOUND") {

                $rootScope.next();

                var details = {
                  prices: $scope.price,
                  product_name: $scope.product_name,
                  completeresponse: $scope.completeresponse
                }

                $location.path('/CheckoutMassage/' + JSON.stringify(details));




              }
              else {

                $cordovaDialogs.alert(data.response.message, '', 'OK')
                  .then(function () {


                    $rootScope.next();
                    $location.path('/MassageType');
                  });
              }


            }
          }

          else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });




          }
          else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success


              });
          }

        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }

         alert("failure message: " + JSON.stringify({
            data: data
          }));
        });                                      
                                                            }, 1000);
       
      }
    }
  }


  $scope.selectDate = function () {
    toaster.openDatePicker();

  }

  $scope.selectTime = function () {
    toaster.openTimePicker();
  }

  $rootScope.timeupdate = function (hour, min, timeset) {

    var hour = hour < 10 ? "0" + hour : hour;
    var min = min < 10 ? "0" + min : min;


    $scope.time = hour + ':' + min + " " + timeset;
    $scope.time1 = hour + ':' + min + " " + timeset;

  }
  $rootScope.dateupdate = function (year, month, date) {


    var date = date < 10 ? "0" + date.substring(1) : date.substring(1);
    var month = month < 10 ? "0" + month : month;


    $scope.date = month + '/' + date + '/' + year;
    $scope.date1 = year + '/' + month + '/' + date;


  }

  //handle your back

  $rootScope.massageFormBack = function () {

    $rootScope.next();
    $location.path('/MassageType');
  }

});
MassMobileMassageAppControllers.controller("ChairMassageFormController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs, $cordovaDatePicker) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "5");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {



    $scope.firstname = localStorage.getItem("first_name");
    $scope.lastname = localStorage.getItem("last_name");
    $scope.email = localStorage.getItem("user_email");
    $scope.phone = localStorage.getItem("phone");
    $scope.city = localStorage.getItem("city");
    $scope.state = localStorage.getItem("state");
    $scope.treatment_date = "";
    $scope.treatment_time = "";
    $scope.estimatedpeople = ""
    $scope.chair_massage_frequency_id = "";
    $scope.chair_massage_session_id = "";
    $scope.chair_massage_payment_option_id = "";
    $scope.idealbudget = "";
    $scope.comment = "";

  }
  else {
    $scope.firstname = "";
    $scope.lastname = "";
    $scope.email = "";
    $scope.phone = "";
    $scope.treatment_date = "";
    $scope.treatment_time = "";
    $scope.estimatedpeople = "";
    $scope.city = "";
    $scope.state = "";
    $scope.chair_massage_frequency_id = "";
    $scope.chair_massage_session_id = "";
    $scope.chair_massage_payment_option_id = "";
    $scope.idealbudget = "";
    $scope.comment = "";

  }



  $('#myInput').keyup(function () {
    var v = $(this).val();
    if (v.substr(0, 1) != "$") {
      $(this).val("$");
    }
  });


  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {

    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_options/chair_massage_options.json');
    res.success(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      $scope.frequencies = data.response.data.frequencies;
      $scope.sessions = data.response.data.sessions;
      $scope.payments = data.response.data.payments;

    });
    res.error(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("chefs product details api failure message: " + JSON.stringify({
        data: data
      }));
    });




    $scope.submitClick = function () {

      $scope.idealbudget = ($scope.idealbudget).substr(1);

      if ($scope.firstname == "") {
        $cordovaDialogs.alert("Please fill the firstname", "", "OK").
          then(function () {
          });
        return false;
      }

      else if ($scope.email == "") {
        $cordovaDialogs.alert("Please fill the email", "", "OK").
          then(function () {
          });
        return false;
      }
      else if (angular.isUndefined($scope.email)) {
        $cordovaDialogs.alert("Please fill the valid email id", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.phone == "") {
        $cordovaDialogs.alert("Please fill the Phone number", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.city == "") {
        $cordovaDialogs.alert("Please fill the city", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.state == "") {
        $cordovaDialogs.alert("Please fill the state", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.treatment_date == "") {
        $cordovaDialogs.alert("Please fill the treatment date", "", "OK").
          then(function () {
          });
        return false;
      }

      else if ($scope.estimatedpeople == "") {
        $cordovaDialogs.alert("Please fill the estimated people", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.chair_massage_frequency_id == "") {
        $cordovaDialogs.alert("Please fill the frequency", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.chair_massage_session_id == "") {
        $cordovaDialogs.alert("Please fill the session duration", "", "OK").
          then(function () {
          });
        return false;
      }
      else if ($scope.chair_massage_payment_option_id == "") {
        $cordovaDialogs.alert("Please fill the payment option", "", "OK").
          then(function () {
          });
        return false;
      }


      else if (isNaN($scope.idealbudget)) {
        $cordovaDialogs.alert("Please fill the valid ideal budget value", "", "OK").
          then(function () {
          });
        return false;
      }


      else {

        var dataObj = {
          first_name: $scope.firstname,
          last_name: $scope.lastname,
          email: $scope.email,
          phone: $scope.phone,
          treatment_date: $scope.treatment_date1,
          treatment_time: $scope.treatment_time1,
          number_of_people: $scope.estimatedpeople,
          city: $scope.city,
          state: $scope.state,
          chair_massage_frequency_id: $scope.chair_massage_frequency_id,
          chair_massage_session_id: $scope.chair_massage_session_id,
          chair_massage_payment_option_id: $scope.chair_massage_payment_option_id,
          budget: $scope.idealbudget,
          comment: $scope.comment
        };

        $rootScope.setLoading(true);
        console.log("chair Message request: " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_chair_massages.json', dataObj);


        res.success(function (data, status, headers, config) {

          console.log("chair Message response: " + JSON.stringify(data));
          $rootScope.setLoading(false);
          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                $rootScope.next();
                $location.path('/index');
              });

          }

          else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });

          }

          else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {

              });

          }
        });
        res.error(function (data, status, headers, config) {

          $rootScope.setLoading(false);
          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("chefs product details api failure message: " + JSON.stringify({
            data: data
          }));
        });


      }
    }





  }


  $scope.selectDate = function () {
  
 $('#datepicker').datepicker({
        "setDate": new Date(),
        "autoclose": true
});


  }
  

  $scope.selectTime = function () {
    toaster.openTimePicker();
  }






  $rootScope.timeupdate = function (hour, min, timeset) {

    var hour = hour < 10 ? "0" + hour : hour;
    var min = min < 10 ? "0" + min : min;


    $scope.treatment_time = hour + ':' + min + " " + timeset;
    $scope.treatment_time1 = hour + ':' + min + " " + timeset;

  }


  $rootScope.dateupdate = function (year, month, date) {



    var date = date < 10 ? "0" + date.substring(1) : date.substring(1);
    var month = month < 10 ? "0" + month : month;

    $scope.treatment_date = month + '/' + date + '/' + year;
    $scope.treatment_date1 = month + '/' + date + '/' + year;

  }



});
MassMobileMassageAppControllers.controller("GiftCertificatesController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "6");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state") + ' ' + localStorage.getItem("country");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.giftTypeValue = "";
  $rootScope.name1 = "";
  $rootScope.email1 = "";
  $rootScope.name2 = "";
  $rootScope.email2 = "";
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {

    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_products/27.json');
    res.success(function (data, status, headers, config) {
      console.log("successgiftMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      $scope.name1 = data.response.data.category.name;
      $scope.description = data.response.data.category.description;
      $rootScope.products = data.response.data.products;
      $rootScope.title = data.response.data.title;

    });
    res.error(function (data, status, headers, config) {
      console.log("errorLoginMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("failure message: " + JSON.stringify({
        data: data
      }));
    });


  }



  $scope.nextClick = function () {

    if ($scope.giftTypeValue == "") {
      $cordovaDialogs.alert("Please select gift certificate first", "", "OK").
        then(function () {

        });

      return false;
    }

    else {


      $rootScope.next();
      $rootScope.giftTypeValue = $scope.giftTypeValue
      $location.path('/Preview');

    }

  }
  $scope.backToHome = function () {
    $rootScope.next();
    $location.path('/index');
  }


});
MassMobileMassageAppControllers.controller("LoginController", function ($scope, $http, $rootScope, $routeParams, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "7");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.fromWhere = $routeParams.fromWhere;


  $scope.email = "";
  $scope.password = "";

  $scope.registerClick = function () {


    if ($scope.fromWhere == "MassageTypeNext") {

      localStorage.setItem("frommassage", "frommassage");


    }
    else {

      localStorage.removeItem("frommassage");

    }
    $rootScope.next();
    $location.path('/SignUp');
  }
  $scope.forgotPasswordClick = function () {

    $rootScope.next();
    $location.path('/forgotPassword');
  }

  $scope.loginClick = function () {


    if ($scope.email == "") {
      $cordovaDialogs.alert("Please fill the email id", "", "OK").
        then(function () {
        });
      return false;
    }

    else if (angular.isUndefined($scope.email)) {
      $cordovaDialogs.alert("Please fill the valid email id", "", "OK").
        then(function () {
        });
      return false;
    }



    else if ($scope.password == "") {
      $cordovaDialogs.alert("Please fill the password", "", "OK").
        then(function () {
        });
      return false;
    }
    else {
      $rootScope.setLoading(true);
  //    alert("Trial");
var deviceid = device.uuid;
//alert("deviceid-->"+deviceid);
      var dataObj = {
        username: $scope.email,
        password: $scope.password,
      //  device_id: device.uuid,
       device_id: deviceid,
        device_token: localStorage.getItem("DeviceToken"),
        device_type: "0"

      };
//alert(JSON.stringify(dataObj));
      console.log("LoginParameter  : " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_users/login.json', dataObj);

      res.success(function (data, status, headers, config) {
 // alert(JSON.stringify(data));
        console.log("responseLoginMessage: " + JSON.stringify(data));

        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
          //  alert("dialog");
              localStorage.setItem("session_token", data.response.data.user.session.session_token);
              localStorage.setItem("user_id", data.response.data.user.session.user_id);
              localStorage.setItem("user_name", data.response.data.user.username);
              localStorage.setItem("first_name", data.response.data.user.first_name);
              localStorage.setItem("last_name", data.response.data.user.last_name);
              localStorage.setItem("user_email", data.response.data.user.email);
              localStorage.setItem("phone", data.response.data.user.phone);
              localStorage.setItem("flightwalk", data.response.data.user.flightwalk);
              localStorage.setItem("parkingsuggestion", data.response.data.user.parkingsuggestion);
              localStorage.setItem("medication", data.response.data.user.medication);

              localStorage.setItem("address_line_1", data.response.data.user.address_line_1);
              localStorage.setItem("address_line_2", data.response.data.user.address_line_2);
              localStorage.setItem("city", data.response.data.user.city);
              localStorage.setItem("state", data.response.data.user.state);
              localStorage.setItem("cart_count", data.response.data.user.session.cart_count);
              localStorage.setItem("country", data.response.data.user.country_name);
              localStorage.setItem("country_id", data.response.data.user.country_id);
              localStorage.setItem("zip_code", data.response.data.user.zip_code);
              localStorage.setItem("order_address_line_1", data.response.data.user.address_line_1);
              localStorage.setItem("order_city", data.response.data.user.city);
              localStorage.setItem("order_state", data.response.data.user.state);
              localStorage.setItem("order_country", data.response.data.user.country_name);
              localStorage.setItem("order_code", data.response.data.user.zip_code);
              localStorage.setItem("user_image", data.response.data.user.image_path);
//alert("k");
              if ($scope.fromWhere == "normal") {
                $rootScope.next();
                $location.path('/index');
              } else if ($scope.fromWhere == "GiftCertificates") {
                $rootScope.next();
                $location.path('/GiftCertificates');
              }

              else if ($scope.fromWhere == "MassageTypeNext") {
                $rootScope.next();
                $location.path('/MassageForm');

              }
              else if ($scope.fromWhere == "Membership") {
                $rootScope.next();
                $location.path('/Membership');
              }

              else if ($scope.fromWhere == "Packages") {
                $rootScope.next();
                $location.path('/Packages');
              }else{
                $rootScope.next();
                $location.path('/index');
              }

            });



        }

        else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });





        }

        else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
//alert("b");

            });



        }

      });
      res.error(function (data, status, headers, config) {
       alert(JSON.stringify(data));
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });
    }




  }

  // back button handle
  $scope.homePageBack = function () {
    $rootScope.next();
    $location.path('/index');
  }
});
MassMobileMassageAppControllers.controller("ForgotpwdController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "8");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.email = "";

  $scope.sendPassword = function () {

    if ($scope.email == "") {
      $cordovaDialogs.alert("Please fill the email id", "", "OK").
        then(function () {
        });
      return false;
    } else if (angular.isUndefined($scope.email)) {
      $cordovaDialogs.alert("Please fill the valid email id", "", "OK").
        then(function () {
        });
      return false;
    } else {


      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {

          });
      } else {


        $rootScope.setLoading(true);

        var dataObj = {
          email: $scope.email
        };
        console.log("Forgot Password Parameter  : " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_users_reset_password.json', dataObj);

        res.success(function (data, status, headers, config) {
          console.log("responseForgotPasswordMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                $rootScope.next();
              });
          } else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });



          }

        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({ data: data }));
        });



      }
    }
  }



});
MassMobileMassageAppControllers.controller("SignupController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs, $cordovaDatePicker) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "9");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.password = "";
  $scope.confirmPassword = "";
  $scope.email = "";
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.addLineone = "";
  $scope.addLinetwo = "";
  $scope.city = "";
  $scope.state = "";
  $scope.zipcode = "";
  $scope.checkbox = true;
  $scope.checkboxvalue = "0";
  $scope.billing_address_line_1 = "";
  $scope.billing_city = "";
  $scope.billing_state = "";
  $scope.billing_zipcode = "";


  $scope.dob = "";
  $scope.referred = "";


  //Date
  $scope.selectDob = function () {
    toaster.openDatePickerForDOB();
  }

  $rootScope.dateupdateForDob = function (year, month, date) {


    var date = date < 10 ? "0" + date.substring(1) : date.substring(1);
    var month = month < 10 ? "0" + month : month;

    $scope.dob = month + '/' + date + '/' + year;


  }



  $scope.checkboxClick = function () {


    if ($scope.checkbox) {

      $scope.checkbox = true;
      $scope.checkboxvalue = "0";

    } else {

      $scope.checkbox = false;
      $scope.checkboxvalue = "1";

    }
  }

  $scope.registerClick = function () {

    if ($scope.firstName == "") {

      $cordovaDialogs.alert('Please fill the first name', '', 'OK')
        .then(function () {
        });


      return false;
    }
    else if ($scope.lastName == "") {
      $cordovaDialogs.alert('Please fill the last name', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.email == "") {

      $cordovaDialogs.alert('Please fill the email', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if (angular.isUndefined($scope.email)) {
      $cordovaDialogs.alert('Please fill the valid email id', '', 'OK')
        .then(function () {
        });


      return false;
    }
    else if ($scope.password == "") {

      $cordovaDialogs.alert('Please fill the password', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.confirmPassword == "") {

      $cordovaDialogs.alert('Please fill the confirm password', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.password != $scope.confirmPassword) {
      $cordovaDialogs.alert('Password do not matches', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.number == "") {
      $cordovaDialogs.alert('Please fill the phone number', '', 'OK')
        .then(function () {
        });

      return false;
    }
    //             else if($scope.dob == "" || angular.isUndefined($scope.dob)){
    //                                                        $cordovaDialogs.alert('Please fill the date of birth', '', 'OK')
    //                                                        .then(function() {
    //                                                              });
    //                                                        return false;
    //                                                        }
    else if ($scope.date == "") {

      $cordovaDialogs.alert('Please fill the date of birth', '', 'OK')
        .then(function () {
        });


      return false;
    }
    else if ($scope.addLineone == "") {

      $cordovaDialogs.alert('Please fill the massage location', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.city == "") {
      $cordovaDialogs.alert('Please fill the city', '', 'OK')
        .then(function () {
        });


      return false;
    }
    else if ($scope.state == "") {

      $cordovaDialogs.alert('Please fill the state', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.zipcode == "") {
      $cordovaDialogs.alert('Please fill the zipcode', '', 'OK')
        .then(function () {
        });
      return false;
    }

    else {
      if ($scope.checkboxvalue == "1") {
        if ($scope.billing_address_line_1 == "") {
          $cordovaDialogs.alert('Please fill the billable address', '', 'OK')
            .then(function () {
            });

          return false;
        }
        else if ($scope.billing_city == "") {
          $cordovaDialogs.alert('Please fill the billable city', '', 'OK')
            .then(function () {
            });


          return false;
        }
        else if ($scope.billing_state == "") {

          $cordovaDialogs.alert('Please fill the billing state', '', 'OK')
            .then(function () {
            });

          return false;
        }
        else if ($scope.billing_zipcode == "") {
          $cordovaDialogs.alert('Please fill the billing zipcode', '', 'OK')
            .then(function () {
            });
          return false;
        }
      }


      $rootScope.setLoading(true);

      var dataObj = {
        username: $scope.email,
        password: $scope.password,
        email: $scope.email,
        device_id: "123456",
        device_token: localStorage.getItem("DeviceToken"),
        device_type: "0",
        first_name: $scope.firstName,
        last_name: $scope.lastName,
        phone: $scope.number,
        date_of_birth: $scope.dob,
        address_line_1: $scope.addLineone,
        address_line_2: $scope.addLinetwo,
        city: $scope.city,
        state: $scope.state,
        country_id: $scope.country,
        zip_code: $scope.zipcode,
        is_address_same: $scope.checkboxvalue,
        billing_address_line_1: $scope.billing_address_line_1,
        billing_city: $scope.billing_city,
        billing_state: $scope.billing_state,
        billing_zip_code: $scope.billing_zipcode,

        date_of_birth: $scope.dob,
        referred_by: $scope.referred,
      };

      console.log("RegistrationParameter  : " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_users.json', dataObj);
      res.success(function (data, status, headers, config) {
        console.log("responseRegisterMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

              localStorage.setItem("session_token", data.response.data.user.session.session_token);
              localStorage.setItem("user_id", data.response.data.user.session.user_id);
              localStorage.setItem("user_name", data.response.data.user.username);
              localStorage.setItem("first_name", data.response.data.user.first_name);
              localStorage.setItem("last_name", data.response.data.user.last_name);
              localStorage.setItem("user_email", data.response.data.user.email);
              localStorage.setItem("phone", data.response.data.user.phone);

              localStorage.setItem("address_line_1", data.response.data.user.address_line_1);
              localStorage.setItem("address_line_2", data.response.data.user.address_line_2);
              localStorage.setItem("city", data.response.data.user.city);
              localStorage.setItem("state", data.response.data.user.state);
              localStorage.setItem("country", data.response.data.user.country_name);
              localStorage.setItem("country_id", data.response.data.user.country_id);
              localStorage.setItem("zip_code", data.response.data.user.zip_code);
              localStorage.setItem("user_image", data.response.data.user.image_path);



              localStorage.setItem("order_address_line_1", data.response.data.user.address_line_1);
              localStorage.setItem("order_city", data.response.data.user.city);
              localStorage.setItem("order_state", data.response.data.user.state);
              localStorage.setItem("order_country", data.response.data.user.country_name);
              localStorage.setItem("order_code", data.response.data.user.zip_code);


              if (localStorage.getItem("frommassage") == "frommassage") {

                $rootScope.next();
                $location.path('/MassageForm');
              }
              else {


                $rootScope.next();
                $location.path('/index');

              }



            });



        }

        else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }

        else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success


            });



        }

      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });


    }


  }


});
MassMobileMassageAppControllers.controller("ContactUsController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "10");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.name = "";
  $scope.email = "";
  $scope.phone = "";
  $scope.message = "";

  $scope.submitClick = function () {




    if ($scope.name == "") {

      $cordovaDialogs.alert('Please fill the name', '', 'OK')
        .then(function () {
        });


      return false;
    }

    else if ($scope.email == "") {

      $cordovaDialogs.alert('Please fill the email id', '', 'OK')
        .then(function () {
        });


      return false;
    }

    else if (angular.isUndefined($scope.email)) {
      $cordovaDialogs.alert('Please fill the valid email id', '', 'OK')
        .then(function () {
        });


      return false;
    }
    else if ($scope.number == "") {
      $cordovaDialogs.alert('Please fill the phone number', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else if ($scope.message == "") {
      $cordovaDialogs.alert('Please fill the message', '', 'OK')
        .then(function () {
        });

      return false;
    }
    else {

      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {

          });
      }
      else {


        $rootScope.setLoading(true);


        var dataObj = {
          name: $scope.name,
          email: $scope.email,
          phone: $scope.phone,
          message: $scope.message
        };
        console.log("Contactus Parameter  : " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_contact_us.json', dataObj);

        res.success(function (data, status, headers, config) {
          console.log("responseContactusMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                $rootScope.next();
                $location.path('/index');
              });
          } else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });



          }

        });
        res.error(function (data, status, headers, config) {
          console.log("errorContactusMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({ data: data }));
        });


      }

    }


  }
  $scope.callClick = function (phonenumber) {


    toaster.callClick(phonenumber + "");

  }




});
MassMobileMassageAppControllers.controller("AboutController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {

  $scope.aboutTextNew = "<p>Locally owned and operated since 2008, we are the premier Boston area mobile massage company for On-Location Table or Chair Massages for hotel, work, spa parties, trade shows and many other events.<\/p>\n<p>We have carefully vetted and personally trained our team of over 25 licensed and insured massage therapists.<\/p>\n<p>Our focus on quality, customer service and education makes us the best in Boston. We will travel within an hour of Boston which may require a small travel fee after 20 miles from Boston Common. Parking may also be an additional charge not included in the price.<\/p>\n<div class=\"about-vdo-sec\"><iframe class=\"youtube-player\" src=\"https:\/\/www.youtube.com\/embed\/7l0Oek-cICs\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"><\/iframe><\/div>\n<div class=\"about-vdo-sec\"><iframe src=\"https:\/\/www.youtube.com\/embed\/aGlrh3Mm4IU\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"><\/iframe><\/div>\n<h3>History<\/h3>\n<p>Owner of Mass Mobile Massage is Houston Bernard who has been providing medical massage for many years. He served in the US Army and one of his certifications was Master fitness trainer; also certified by National Academy of Sports Medicine and he has a BA in Communications from Worcester State University. Houston resides in Lexington, Ma.<\/p>\n<p>Every therapist on the Mass Mobile team is carefully vetted, screened and continuously trained.<\/p>\n<p>Mass Mobile is the exclusive vendor to Lenox Hotel, Hyatt Cambridge and Hyatt Boston. We have worked for years with Adidas and MS Society for the Boston Marathon. Some of our clients also include MIT, Harvard University, Revere Hotel, Taj Hotel, Ames Hotel, Boston Ballet, Northeastern, Bentley Univ., Boston College, Boston University, W Hotel, numerous professional athletes, celebrities and Greater Boston residents. A proud standing member of the Greater Boston Concierge Association. We are a local company and support local businesses.<\/p>\n<h3>Policies<\/h3>\n<ul class=\"policies\">\n<li>Cancellation policy &ndash; at least 24 hours notice or it will be forfeited<\/li>\n<li>Sexual harassment in words or innuendos is not tolerated and will result in the&nbsp;ending of the massage with no reimbursement to the client,&nbsp;and full prosecution under the law<\/li>\n<li>Intake forms are required for all massages<\/li>\n<li>Discounted quotes expire after 7 days<\/li>\n<li>$20 fee for itemized receipts<\/li>\n<li>Gratuity is not included, and is appreciated for a job well done<\/li>\n<li>PARKING is not included and may be additional. Our therapists do their best to find parking of course.<\/li>\n<li>Travel fee is $15 every 10 miles over 20 miles and per massage, measured by the fastest route on <a href=\"https:\/\/maps.google.com\/\">Google maps<\/a> from Boston Common.<\/li>\n<li>We reserve the right to refuse service to anyone.<\/li>\n<li>No Refunds and all sales and purchases are final<\/li>\n<li>Weather Policy &ndash; in case of a snow storm or state of emergency we usually cancel 3 hours before the appointment and reschedule based on how safe the massage therapist feels to be on the road.<\/li>\n<li>Couples Massage or a massage with another person (other than client and MT) present &ndash; The client should not be touched in any way by a person other than the massage therapist or the massage will end immediately with no refund.<\/li>\n<li>Sickness &ndash; we suggest not getting a massage when you are sick unless you have been antibiotic for a few days already. We still need a 24 hour advance notice for any rescheduling in this case.<\/li>\n<li>If you are a wellness membership and you cancel your automatic payments through paypal without filling out the official cancellation form you automatically cancel your membership privileges and lose access to all accumulated massages. To gain access you will need to re-sign up for your wellness membership and recurring charges and still owe any months not charged in between that time before gaining access to the accumulated massages. To cancel your membership you must request and fill out the official cancellation form properly. There is a one month cancellation fee for memberships cancelled less than a year. Membership auto-renew after 12 months.<\/li>\n<li>If clients would like to book with a MMM massage therapists they must contact the office and not the massage therapist directly. Our therapists are under agreement they cannot see any current or ex MMM clients for up to 2 years after they leave MMM officially.<\/li>\n<\/ul>\n<h3>Employment<\/h3>\n<p>Interested in joining our team?&nbsp; Send us your resume. &nbsp;<a href=\"http:\/\/massmobilemassage.com\/careers-app\/\">Click Here<\/a><\/p>"


  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "11");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {


    $rootScope.setLoading(true);


    // var res = $http.get(baseUrl+'rest_pages/about-us-app.json');
    //   var res = $http.get(baseUrl+'rest_pages/about-us.json');

    var res = $http.get(baseUrl + 'rest_pages/about-us-app.json');
    res.success(function (data, status, headers, config) {
      console.log("responseAboutusMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      $scope.name = data.response.data.page.name;
      $scope.description = data.response.data.page.description;

    });
    res.error(function (data, status, headers, config) {
      console.log("errorAboutusMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("failure message: " + JSON.stringify({ data: data }));
    });


  }

});

MassMobileMassageAppControllers.controller("PaymentScreenController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {

  localStorage.setItem("page_id", "3");


  console.log("DeviceToken: " + localStorage.getItem("DeviceToken") + "DeviceID: " + localStorage.getItem("DeviceID"));

  angular.element(document).ready(function () {

    cordova.exec(function (result) {

      var DeviceID = result[0];
      var DeviceToken = result[1];

      localStorage.setItem("DeviceID", DeviceID);
      localStorage.setItem("DeviceToken", DeviceToken);


    }, function (err) { }, "DatePicker", "getTokenAndDeviceID", ["yes"]);
  });


  // var res = $http.get(baseUrl + 'rest_menu.json');
  // res.success(function (data, status, headers, config) {
  //       $scope.home_menues = data.response.data.home_menues;
  // });


  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");//+' '+localStorage.getItem("country");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.type = $routeParams.massageType;
  $scope.id = $routeParams.id;
  $scope.pricePercentage = [];
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {
    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_products/prices.json');
    res.success(function (data, status, headers, config) {
      $scope.price_label_1 = data.response.data.price_label_1
      $scope.price_label_2 = data.response.data.price_label_2

      $rootScope.setLoading(false);
      $scope.prices = data.response.data.prices;
      $scope.discount_first_treatment1 = data.response.data.discount_first_treatment;
      var total = $scope.prices.length;
      for (var i = 0; i < total; i++) {
        $scope.discount_first_treatment = data.response.data.prices[i].price_for_first_time_treatment;

        $scope.duration_array = $scope.prices[i].duration;

        var dataObj = { 'duration': $scope.duration_array, 'percentage': $scope.discount_first_treatment };
        $scope.pricePercentage.push(dataObj);
      }

    });
    res.error(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("chefs product details api failure message: " + JSON.stringify({
        data: data
      }));
    });

  }


  // $rootScope.setLoading(true);
  // var res = $http.get(baseUrl + 'rest_massages.json');


  // res.success(function (data, status, headers, config) {

  //       $rootScope.setLoading(false);
  //       $scope.massages = data.response.data.massages;
  //       $scope.durations = data.response.data.durations;
  //       $scope.therapist_genders = data.response.data.therapist_genders;
  //       $scope.massage_is_for = data.response.data.massage_is_for;
  // });
  // res.error(function (data, status, headers, config) {
  //       $rootScope.setLoading(false);
  // });

  $scope.gotoPackages = function () {
    $rootScope.next();
    $location.path('/Packages');
  }

  $scope.wellMembership = function () {
    $rootScope.next();
    $location.path('/Membership');
  }

  $scope.showPopUp = function () {
    $scope.isVisible = true;
  }

  $scope.closePopUp = function () {
    $scope.isVisible = false;
  }

  $scope.toggleClick = function () {

    $scope.ifCheck = $scope.ifCheck === false ? true : false;
  }

  $scope.termsandconditionseeker = function () {
    $scope.showPopUp();
  }
  $scope.submsgnextClicked = function () {

    if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {


      if ($scope.id == "2") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender1)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender2)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender1 = $scope.gender1;
          params.gender2 = $scope.gender2;
          params.instruction = $scope.instruction;
          params.id = $scope.id;

          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');


        }


      }
      else if ($scope.id == "3") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration ", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;
          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');

        }


      }
      else {
        if (angular.isUndefined($scope.massage_id)) {
          $cordovaDialogs.alert("Please select massage type", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {

          var params = new Object();

          params.massage = $scope.massage_id;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;
          localStorage.setItem("savevalueformassage", JSON.stringify(params));
          $rootScope.next();
          $location.path('/MassageForm');


        }

      }
    }


    else {


      if ($scope.id == "2") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender1)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender2)) {

          $cordovaDialogs.alert("Please select therapist gender preference for massage 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender1 = $scope.gender1;
          params.gender2 = $scope.gender2;
          params.instruction = $scope.instruction;
          params.id = $scope.id;


          localStorage.setItem("savevalueformassage", JSON.stringify(params));

        }


      }
      else if ($scope.id == "3") {
        if (angular.isUndefined($scope.massage_id1)) {
          $cordovaDialogs.alert("Please select massage type 1", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massage_id2)) {
          $cordovaDialogs.alert("Please select massage type 2", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration ", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {
          var params = new Object();

          params.massage_1 = $scope.massage_id1;
          params.massage_2 = $scope.massage_id2;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;


          localStorage.setItem("savevalueformassage", JSON.stringify(params));

        }


      }
      else {
        if (angular.isUndefined($scope.massage_id)) {
          $cordovaDialogs.alert("Please select massage type", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.duration_id)) {
          $cordovaDialogs.alert("Please select duration", "", "OK").
            then(function () {
            });
          return false;

        }
        else if (angular.isUndefined($scope.gender)) {

          $cordovaDialogs.alert("Please select therapist gender preference", "", "OK").
            then(function () {
            });
          return false;
        }
        else if (angular.isUndefined($scope.massagefor)) {
          $cordovaDialogs.alert("Please select massage for", "", "OK").
            then(function () {
            });
          return false;

        }
        else {

          var params = new Object();

          params.massage = $scope.massage_id;
          params.durations = $scope.duration_id;
          params.massageFor = $scope.massagefor;
          params.gender = $scope.gender;
          params.instruction = $scope.instruction;
          params.id = $scope.id;

          localStorage.setItem("savevalueformassage", JSON.stringify(params));


        }

      }


      $cordovaDialogs.alert("Please login first to book the massage session", "", "OK").
        then(function () {
          $rootScope.next();
          $location.path('/Login/MassageTypeNext');
        });

    }



  }



  $scope.checkPrice = function () {
    var paramsCheck = new Object();

    paramsCheck.massage = $scope.massage_id;
    paramsCheck.durations = $scope.duration_id;
    paramsCheck.massageFor = $scope.massagefor;
    paramsCheck.gender = $scope.gender;
    paramsCheck.instruction = $scope.instruction;
    paramsCheck.id = $scope.id;

    localStorage.setItem('formfilled', JSON.stringify(paramsCheck));
    $rootScope.next();
    $location.path('/Prices');
  }

  $scope.massageClicked = function (massageID) {

    $scope.massage_id = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType' + massageID).removeClass("active");
        $('#massageType' + massageID).addClass("active");
      }
      else {
        $('#massageType' + ID).removeClass("active");

      }
    }
  }

  $scope.massage1Clicked = function (massageID) {

    $scope.massage_id1 = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType1' + massageID).removeClass("active");
        $('#massageType1' + massageID).addClass("active");
      }
      else {
        $('#massageType1' + ID).removeClass("active");

      }
    }
  }

  $scope.massage2Clicked = function (massageID) {

    $scope.massage_id2 = massageID;

    for (var i in $scope.massages) {
      var ID = $scope.massages[i].id;
      if (ID == massageID) {

        $('#massageType2' + massageID).removeClass("active");
        $('#massageType2' + massageID).addClass("active");
      }
      else {
        $('#massageType2' + ID).removeClass("active");

      }
    }
  }

  $scope.durationsClicked = function (durationID) {

    $scope.duration_id = durationID;

    console.log("duration clicked : " + JSON.stringify($scope.durations));

    for (var i in $scope.durations) {
      var ID = $scope.durations[i].id;
      if (ID == durationID) {
        $('#DurationID' + durationID).removeClass("active");
        $('#DurationID' + durationID).addClass("active");
      }
      else {
        $('#DurationID' + ID).removeClass("active");

      }
    }
  }


});
MassMobileMassageAppControllers.controller("PackagesController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "12");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.pricerandom = "";
  $scope.package = "";
  $scope.tip_price = "";

  // $scope.price = parseInt($scope.pricerandom);
  // $scope.tip_price = Math.round(($scope.price * 20) / 100)


  $scope.termConditionClick = function () {

    $rootScope.next();
    $location.path('/TermsandConditions/terms');


  }

  $rootScope.payPalSuccess = function () {

    $cordovaDialogs.alert('Payment successful', '', 'OK')
      .then(function () {
        $rootScope.next();
        $location.path('/index');
      });

  }

  $scope.payotherClick = function () {

    if ($scope.pricerandom == "") {
      $cordovaDialogs.alert("Please fill the random price", "", "OK").
        then(function () {
        });

    }
    else {



      //$scope.price = parseInt($scope.pricerandom);
      // $rootScope.next();
      // $location.path('/PaypalPackageOther/'+$scope.price);
      $scope.termsConitionBeforePayement();

    }
  }



  $scope.isChecked = false;
  $scope.checkBoxClicked = function () {
    $scope.isChecked = true;
    $scope.beforePaymentTermsConditionPopUp = false;

    $scope.price = parseInt($scope.pricerandom);
    $rootScope.next();
    $location.path('/PaypalPackageOther/' + $scope.price);

  }

  $scope.beforePaymentTermsConditionPopUpClose = function () {
    $scope.beforePaymentTermsConditionPopUp = false;
  }

  $scope.termsConitionBeforePayement = function () {
    $rootScope.setLoading(true);
    var res = $http.get(baseUrl + 'rest_pages/agreement.json');
    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("checkout response" + JSON.stringify(data));
      $scope.termsdescription = data.response.data.page.description;
      $scope.beforePaymentTermsConditionPopUp = true;

    });
    res.error(function (data, status, headers, config) {
      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log(" failure message: " + JSON.stringify({
        data: data
      }));

    });
  }







  $scope.privacyClick = function () {

    $rootScope.next();
    $location.path('/TermsandConditions/privacy');


  }


  $scope.BuyNow = function () {


    if ($scope.package == "") {
      $cordovaDialogs.alert("Please select Package first", "", "OK").
        then(function () {

        });

      return false;
    }

    else {

      // $scope.showPopUp();
      $scope.termsConditionsBeforePreceedToCheckOut();


    }

  }



  /*--Proceed to check out---*/
  $scope.proceedToCheckOutisChecked = false;
  $scope.proceedToCheckOutcheckBoxClicked = function () {
    $scope.proceedToCheckOutisChecked = true;
    $scope.proceedToCheckOutPopUp = false;
   // alert(JSON.stringify($scope.package));
  //  alert("Pprice-"+$scope.package.price+" *"+$scope.package.multiplier+" dis-"+$scope.package.discount);
    var priceNew =($scope.package.price) * ($scope.package.multiplier);
  
    $scope.tip_price = Math.round((priceNew * 20) / 100)

    $scope.showPopUp();

  }

  $scope.proceedToCheckOutPopUpClose = function () {
    $scope.proceedToCheckOutPopUp = false;
  }


  $scope.termsConditionsBeforePreceedToCheckOut = function () {

    $rootScope.setLoading(true);
    var res = $http.get(baseUrl + 'rest_pages/agreement.json');
    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("checkout response" + JSON.stringify(data));
      $scope.proceedToCheckOutdescription = data.response.data.page.description;
      $scope.proceedToCheckOutPopUp = true;

    });
    res.error(function (data, status, headers, config) {
      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log(" failure message: " + JSON.stringify({
        data: data
      }));

    });

  }









  $scope.confirm = function () {
    if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {
      $scope.price = parseInt($scope.package.price);

      $scope.price = ((($scope.package.price) * ($scope.package.multiplier)) - ((($scope.package.price) * ($scope.package.multiplier) * ($scope.package.discount)) / 100)) / ($scope.package.multiplier);
      $rootScope.next();
      if ($scope.tip_price == "") {
        $scope.tip_price = "0"
      }

      $location.path('/PaypalPackage/' + $scope.package.id + "/" + parseInt($scope.tip_price));



    }
    else {
      $cordovaDialogs.alert("You have to login first.", "", "OK").
        then(function () {
          $rootScope.next();
          $location.path('/Login/Packages');
        })
    }

  }



  $scope.showPopUp = function () {

    $scope.isVisible = true;
  }

  $scope.closePopUp = function () {
    $scope.isVisible = false;
    $scope.confirm();
  }

  $scope.packageClicked = function (package) {
    $scope.package = package;
    for (var i in $scope.value) {
      var ID = $scope.value[i].id;
      if (ID == package.id) {
        $('#packageType1' + package.id).removeClass("active");
        $('#packageType1' + package.id).addClass("active");
      } else {
        $('#packageType1' + ID).removeClass("active");

      }
    }
  }


  $rootScope.setLoading(true);

  var res = $http.get(baseUrl + 'rest_products/41.json');
  res.success(function (data, status, headers, config) {
    console.log("package response: " + JSON.stringify(data));
    $rootScope.setLoading(false);
    $scope.value = data.response.data.products;

  });
  res.error(function (data, status, headers, config) {
    console.log("errorLoginMessage: " + JSON.stringify(data));
    $rootScope.setLoading(false);

    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {
          // callback success
        });
    } else {
      $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
        .then(function () {
          // callback success
        });
    }
    console.log("failure message: " + JSON.stringify({
      data: data
    }));
  });

  $('#random').focus(function () {
    $('#proceed_chk_btn').css('margin-top', '50px');
  }).blur(function () {
    $('#proceed_chk_btn').css('margin-top', '0px');
  });



});
MassMobileMassageAppControllers.controller("PriceController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "13");
  $scope.pricePercentage = [];
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {

    $rootScope.setLoading(true);

    var res = $http.get(baseUrl + 'rest_products/prices.json');
    res.success(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      $scope.prices12 = data.response.data.prices;

      ///*
      //                                                         var total = $scope.prices.length;
      //                                                         for(var i=1;i<total;i++){
      //                                                         $scope.percentage = ($scope.prices[i].price) - (($scope.prices[i].price*$scope.discount_first_treatment)/100);
      //
      //                                                         $scope.duration_array  = $scope.prices[i].duration;
      //
      //                                                         var dataObj = {'duration' : $scope.duration_array ,'percentage' : Math.ceil($scope.percentage)  };
      //                                                         $scope.pricePercentage.push(dataObj);
      //                                                         }*/



    });
    res.error(function (data, status, headers, config) {

      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("chefs product details api failure message: " + JSON.stringify({
        data: data
      }));
    });

  }

});
MassMobileMassageAppControllers.controller("ProfileController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs, $cordovaFileTransfer) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "14");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.editClick = '0';



  $scope.firstName = localStorage.getItem('first_name');
  $scope.lastName = localStorage.getItem('last_name');
  $scope.phone = localStorage.getItem('phone');
  $scope.address1 = localStorage.getItem('address_line_1') + " " + localStorage.getItem('address_line_2') + " " + localStorage.getItem('city') + " "
    + localStorage.getItem('state') + " " + localStorage.getItem('zip_code');
  $scope.user_image = localStorage.getItem('user_image');





  document.getElementById("first_name").setAttribute("disabled", "disabled");
  document.getElementById("last_name").setAttribute("disabled", "disabled");
  document.getElementById("phone_no").setAttribute("disabled", "disabled");
  document.getElementById("add_ress").setAttribute("disabled", "disabled");

  $scope.editProfile = function () {
    document.getElementById('first_name').removeAttribute("disabled");
    document.getElementById("first_name").focus();
    document.getElementById('last_name').removeAttribute("disabled");
    document.getElementById("last_name").focus();
    document.getElementById('phone_no').removeAttribute("disabled");
    document.getElementById("phone_no").focus();
    document.getElementById('add_ress').removeAttribute("disabled");
    document.getElementById("add_ress").focus();
    $scope.editClick = '1';



  }





  $scope.profileEditImageClicked = function () {
    $cordovaDialogs.confirm('Please upload an image', 'Upload Image', ['Camera', 'Gallery', 'Cancel'])
      .then(function (buttonIndex) {
        // no button = 0, 'OK' = 1, 'Cancel' = 2
        var btnIndex = buttonIndex;
        if (buttonIndex == 1) {
          toaster.CaptureImageFromCamera("profilePic");
        } else if (buttonIndex == 2) {
          toaster.selectimagefromGalery("profilePic");
        } else if (buttonIndex == 3) { }
      });
  }


  $rootScope.uploadProfilePic = function (imageURI) {
    $rootScope.setLoading(true);
    var imagePath = imageURI;
    var options = {};
    options.file = "image";
    options.fileName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.user_id = localStorage.getItem('user_id');
    console.log('profile setting data object parameter ' + JSON.stringify(options));

    var server = baseUrl + 'rest_users/' + localStorage.getItem('user_id') + '.json';

    console.log('server======== ' + server);

    $cordovaFileTransfer.upload(server, imagePath, options)
      .then(function (result) {
        $scope.value = JSON.parse(result.response);
        console.log(' profile setting data object response : ' + JSON.stringify($scope.value));


        $rootScope.setLoading(false);


        if ($scope.value.response.status == true) {
          $cordovaDialogs.alert($scope.value.response.message, '', 'OK')
            .then(function () {
              localStorage.setItem("user_image", $scope.value.response.data.user.image_path);
            });
        }
        else if ($scope.value.response.status == false) {

          $cordovaDialogs.alert($scope.value.response.message, '', 'OK')
            .then(function () {

            });


        }


        // Success!
      }, function (err) {
        $rootScope.setLoading(false);
        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("edit user failureSignUP: " + JSON.stringify(err));

      }, function (progress) {
        $rootScope.setLoading(false);
      });

  }


  $scope.updateProfile = function () {
    $scope.editClick = '0';


    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {

        });
    } else {


      $rootScope.setLoading(true);

      var dataObj = {

        first_name: $scope.firstName,
        last_name: $scope.lastName,
        phone: $scope.phone,
        address_line_1: $scope.address1

      };
      console.log("update profile : " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_users/' + localStorage.getItem('user_id') + '.json', dataObj);



      res.success(function (data, status, headers, config) {
     
        console.log("responselogoutMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              $rootScope.next();
              localStorage.setItem("first_name", data.response.data.user.first_name);
              localStorage.setItem("last_name", data.response.data.user.last_name);
              localStorage.setItem("phone", data.response.data.user.phone);
              $location.path('/index');

            });
        } else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }

      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({ data: data }));
      });


    }





  }


  $scope.resetPassword = function () {
    $rootScope.next();
    $location.path('/ResetPwd');
  }




});
MassMobileMassageAppControllers.controller("ResetPasswordController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "15");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.oldPassword = "";
  $scope.newPassword = "";
  $scope.confirmPassword = "";


  $scope.submit = function () {

    if ($scope.oldPassword == "") {
      $cordovaDialogs.alert("Please fill the old password", "", "OK").
        then(function () {
        });
      return false;
    }

    else if ($scope.newPassword == "") {

      $cordovaDialogs.alert("Please fill the new password", "", "OK").
        then(function () {
        });

    }

    else if ($scope.confirmPassword == "") {

      $cordovaDialogs.alert("Please fill the confirm password", "", "OK").
        then(function () {
        });

    }

    else if ($scope.newPassword != $scope.confirmPassword) {

      $cordovaDialogs.alert("Password does not matches", "", "OK").
        then(function () {
        });

    }

    else {


      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {

          });
      }

      else {

        $rootScope.setLoading(true);

        var dataObj = {

          user_id: localStorage.getItem("user_id"),
          old_password: $scope.oldPassword,
          new_password: $scope.newPassword

        };

        console.log("ResetParameter  : " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_users_change_password.json', dataObj);

        res.success(function (data, status, headers, config) {
          console.log("responseResetMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);
          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {



              });



          }

          else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });





          }

          else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success


              });



          }

        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({
            data: data
          }));
        });

      }


    }


  }
});
MassMobileMassageAppControllers.controller("TermController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "16");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.fromWhere = $routeParams.fromWhere;

  if (!$cordovaNetwork.isOnline()) {
    $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
      .then(function () {

      });
  }
  else {


    $rootScope.setLoading(true);

    if ($scope.fromWhere == "terms") {
      $scope.header = ""
      //  var res = $http.get(baseUrl+'rest_pages/terms-and-conditions.json');
      var res = $http.get(baseUrl + 'rest_pages/about-us.json');

    } else {

      // var res = $http.get(baseUrl+'rest_pages/policies.json');
      var res = $http.get(baseUrl + 'rest_pages/about-us.json');
    }

    res.success(function (data, status, headers, config) {
      console.log("responseTermsandConditionMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      $scope.name = data.response.data.page.name;
      $scope.description = data.response.data.page.description;

    });
    res.error(function (data, status, headers, config) {
      console.log("errorAboutusMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("failure message: " + JSON.stringify({ data: data }));
    });


  }



});
MassMobileMassageAppControllers.controller("MembershipController", function ($scope, $http, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "17");
  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $rootScope.setLoading(true);

  var res = $http.get(baseUrl + 'rest_membership.json');



  res.success(function (data, status, headers, config) {
    console.log("responseAboutusMessage: " + JSON.stringify(data));
    $rootScope.setLoading(false);

    $scope.nameget = data.response.data.page.name;
    $scope.title = data.response.data.page.title;
    $scope.description = data.response.data.page.description;

    $scope.recurring = data.response.data.page.links.monthly;
    $scope.payinfull = data.response.data.page.links.yearly;


  });
  res.error(function (data, status, headers, config) {
    console.log("errorAboutusMessage: " + JSON.stringify(data));
    $rootScope.setLoading(false);

    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {
          // callback success
        });
    } else {
      $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
        .then(function () {
          // callback success
        });
    }
    console.log("failure message: " + JSON.stringify({ data: data }));
  });




  $scope.memberbtnClick = function (price, id, name, type, title) {
    $scope.total_price = price;
    $scope.product_id = id;
    $scope.name = name;
    $scope.type = type;
    $scope.title = title;
    if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {

      $rootScope.next();
      $location.path('/CheckoutMembership/' + $scope.total_price + "/" + $scope.product_id + "/" + $scope.nameget + "/" + $scope.type + "/" + $scope.title);


    }


    else {
      $cordovaDialogs.alert("Please login first to buy the membership", "", "OK").
        then(function () {
          $rootScope.next();
          $location.path('/Login/Membership');
        });

    }
  }




});
MassMobileMassageAppControllers.controller("PreviewController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "18");
  $scope.addCart = '0';
  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.package_id = $rootScope.giftTypeValue;



  for (var i = 0; i < $rootScope.products.length; i++) {

    if ($scope.package_id == $rootScope.products[i].id) {
      $scope.packagename = $rootScope.products[i].name;
      $scope.packagename1 = $rootScope.products[i].title;

      $scope.money = $rootScope.products[i].price;
    }
  }



  if ($rootScope.name1 == "" || $rootScope.email1 == "" || $rootScope.name2 == "" || $rootScope.email2 == "" || $rootScope.message == "") {
    $scope.name1 = "";
    $scope.email1 = "";
    $scope.name2 = "";
    $scope.email2 = "";
    $scope.message = "";
  }


  $scope.paypal_payment = function () {
    $rootScope.next();
    $location.path('/Checkout');
  }

  $scope.previewbtnClick = function (value) {

    if ($scope.name1 == "") {
      $cordovaDialogs.alert("Please fill the sender's name", "", "OK").
        then(function () {
        });
      return false;
    }
    else if ($scope.email1 == "") {
      $cordovaDialogs.alert("Please fill the sender's email id", "", "OK").
        then(function () {
        });
      return false;



    }
    else if (angular.isUndefined($scope.email1)) {
      $cordovaDialogs.alert("Please fill the valid from sender's email id", "", "OK").
        then(function () {
        });
      return false;
    }
    if ($scope.name2 == "") {
      $cordovaDialogs.alert("Please fill the receiver's name", "", "OK").
        then(function () {
        });
      return false;
    }
    else if ($scope.email2 == "") {
      $cordovaDialogs.alert("Please fill the receiver's email id", "", "OK").
        then(function () {
        });
      return false;



    }
    else if (angular.isUndefined($scope.email2)) {
      $cordovaDialogs.alert("Please fill the valid receiver's email id", "", "OK").
        then(function () {
        });
      return false;
    }

    else {

      $rootScope.name1 = $scope.name1;
      $rootScope.email1 = $scope.email1;
      $rootScope.name2 = $scope.name2;
      $rootScope.email2 = $scope.email2;
      $rootScope.message = $scope.message;
      $rootScope.packagename1 = $scope.packagename1;

      $rootScope.next();
      $location.path('/PreviewNext/' + $scope.name1 + "/" + $scope.name2);

    }

  }

  $scope.addtocartClick = function () {

    if ($scope.name1 == "") {
      $cordovaDialogs.alert("Please fill the sender's name", "", "OK").
        then(function () {
        });
      return false;
    }
    if ($scope.email1 == "") {
      $cordovaDialogs.alert("Please fill the sender's email id", "", "OK").
        then(function () {
        });
      return false;
    }
    if (angular.isUndefined($scope.email1)) {
      $cordovaDialogs.alert("Please fill the valid from sender's email id", "", "OK").
        then(function () {
        });
      return false;
    }
    if ($scope.name2 == "") {
      $cordovaDialogs.alert("Please fill the receiver's name", "", "OK").
        then(function () {
        });
      return false;
    }
    if ($scope.email2 == "") {
      $cordovaDialogs.alert("Please fill the receiver's email id", "", "OK").
        then(function () {
        });
      return false;
    }
    if ($scope.message == "") {
      $cordovaDialogs.alert("Please fill message", "", "OK").
        then(function () {
        });
      return false;
    }
    if (angular.isUndefined($scope.email2)) {
      $cordovaDialogs.alert("Please fill the valid receiver's email id", "", "OK").
        then(function () {
        });
      return false;
    }


    $rootScope.setLoading(true);

    if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {
      var dataObj = {
        session_token: localStorage.getItem("session_token"),
        product_id: $scope.package_id,
        to_name: $scope.name1,
        to_email: $scope.email1,
        from_name: $scope.name2,
        from_email: $scope.email2,
        device_id: device.uuid,
        message: $scope.message
      };
    }
    else {
      var dataObj = {
        session_token: "0",
        product_id: $scope.package_id,
        to_name: $scope.name1,
        to_email: $scope.email1,
        device_id: device.uuid,
        from_name: $scope.name2,
        from_email: $scope.email2,
        message: $scope.message
      };

    }

    console.log("add to cart parameter : " + JSON.stringify(dataObj));
    $rootScope.setLoading(true);
    var res = $http.post(baseUrl + 'rest_user_sessions.json', dataObj);

    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("add to cart parameter response : " + JSON.stringify(data));

      if (data.response.status == true) {
        $cordovaDialogs.alert(data.response.message, '', 'OK')
          .then(function () {

            $scope.cart_count = data.response.data.cart_count;
            $scope.addCart = '1';
            localStorage.setItem("cart_count", $scope.cart_count);
          });
      }
      else if (data.response.status == false) {

        $cordovaDialogs.alert(data.response.message, '', 'OK')
          .then(function () {

          });


      }

    });
    res.error(function (data, status, headers, config) {
      console.log("errorAboutusMessage: " + JSON.stringify(data));
      $rootScope.setLoading(false);

      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log("failure message: " + JSON.stringify({ data: data }));
    });

  }

  $scope.backToGift = function () {
    $rootScope.next();
    $location.path('/GiftCertificates');
  }

  $scope.goToCartClick = function () {
 // alert("b");
    $scope.name1 = "";
    $scope.email1 = "";
    $scope.name2 = "";
    $scope.email2 = "";
    $rootScope.name1 = "";
    $rootScope.email1 = "";
    $rootScope.name2 = "";
    $rootScope.email2 = "";

    $scope.addCart = '0';
    $rootScope.next();
    $location.path('/Checkout');
  }

});
MassMobileMassageAppControllers.controller("PreviewNextController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "19");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.name1 = $routeParams.name1;
  $scope.name2 = $routeParams.name2;
  $scope.money = $rootScope.packagename1;

  $scope.backToReceiver = function () {
    $rootScope.back();

    $rootScope.packagename1 = "";
  }



});
MassMobileMassageAppControllers.controller("CheckoutController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
 //alert(JSON.stringify($routeParams));
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  
  localStorage.setItem("page_id", "20");
  //
  $scope.session_token = localStorage.getItem("session_token");
          $scope.cart_count = localStorage.getItem("cart_count");
         $scope.name = localStorage.getItem("first_name")+' '+localStorage.getItem("last_name");
          $scope.address = localStorage.getItem("city")+' '+localStorage.getItem("state");
        $scope.profilePic = localStorage.getItem("user_image");
  $scope.device_id = device.uuid;
  //
  //        $scope.tip_price="";

  if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {
    //                        console.log("registered user session token"+ localStorage.getItem("session_token"));
    console.log("registered user session token" + $scope.device_id + " <--> " + $scope.session_token);
    var res = $http.get(baseUrl + 'rest_user_sessions/' + $scope.device_id + '/' + $scope.session_token + '.json');

  }
  else {
    console.log("not registered user" + localStorage.getItem("DeviceToken"));
    var res = $http.get(baseUrl + 'rest_user_sessions/' + $scope.device_id + '/0.json');
  
  }
  //alert(baseUrl + 'rest_user_sessions/' + $scope.device_id + '/' + $scope.session_token + '.json');
  $rootScope.setLoading(true);
  res.success(function (data, status, headers, config) {
    $rootScope.setLoading(false);

 //  alert("checkout response->" + JSON.stringify(data));
    $scope.cart = data.response.data.carts;
    $scope.tip_price = Number(Math.round((data.response.data.total_original_price * 20) / 100));
    $scope.cartitems = data.response.data.carts;
    $scope.total_price = data.response.data.total_net_price;
    $scope.cart_count = data.response.data.cart_count;
    localStorage.setItem("cart_count", $scope.cart_count);
    localStorage.setItem("cart_items", data.response.data.carts);

  });
  res.error(function (data, status, headers, config) {
    $rootScope.setLoading(false);
    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {
          // callback success
        });
    } else {
      $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
        .then(function () {
          // callback success
        });
    }
    console.log(" failure message: " + JSON.stringify({
      data: data
    }));


  });



  $scope.closePopUp = function () {
    $scope.isVisible = false;
  }

  $scope.isChecked = false;
  $scope.checkBoxClicked = function () {
  //alert("true");
    $scope.isChecked = true;
    $scope.isVisible = false;
    console.log("price" + parseInt($scope.total_price));
    $rootScope.next();
    $location.path('/PaypalPayment' + "/" + parseInt($scope.total_price) + "/" + parseInt($scope.tip_price));
  }



  $scope.checkOut = function () {
    //  console.log("price"+parseInt($scope.total_price));

    $rootScope.setLoading(true);
    var res = $http.get(baseUrl + 'rest_pages/agreement.json');
    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("checkout response" + JSON.stringify(data));
      $scope.description = data.response.data.page.description;
      $scope.isVisible = true;

    });
    res.error(function (data, status, headers, config) {
      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log(" failure message: " + JSON.stringify({
        data: data
      }));


    });




    //                             $rootScope.next();
    //                             $location.path('/PaypalPayment'+"/"+parseInt($scope.total_price)+"/"+parseInt($scope.tip_price));


  }






  $scope.checkgetIndex = function (value) {

    $scope.getIndex = value;

    if (!$cordovaNetwork.isOnline()) {
      $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
        .then(function () {

        });
    }
    else {


      $rootScope.setLoading(true);

      if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {

        var dataObj = {
          session_token: localStorage.getItem("session_token"),
          cart_id: $scope.getIndex,
          device_id: $scope.device_id
        };
      }
      else {

        var dataObj = {
          session_token: "0",
          cart_id: $scope.getIndex,
          device_id: $scope.device_id
        };



      }

      console.log("remove product from cart parameter : " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_remove_cart.json', dataObj);
      console.log("remove carddata " + baseUrl + 'rest_remove_cart.json')
      res.success(function (data, status, headers, config) {
        $rootScope.setLoading(false);

        console.log("remove response : " + JSON.stringify(data));

        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

              $scope.cart_count = data.response.data[0].cart_count;

              localStorage.setItem("cart_count", $scope.cart_count);


              if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {
                console.log("registered user session token" + localStorage.getItem("session_token"));
                var res = $http.get(baseUrl + 'rest_user_sessions/' + $scope.device_id + '/' + $scope.session_token + '.json');

              }
              else {
                console.log("not registered user" + localStorage.getItem("DeviceToken"));
                var res = $http.get(baseUrl + 'rest_user_sessions/' + $scope.device_id + '/0.json');
              }


              $rootScope.setLoading(true);
              res.success(function (data, status, headers, config) {
                $rootScope.setLoading(false);

                console.log("checkout response again" + JSON.stringify(data));
                $scope.cart = data.response.data.carts;
                $scope.cartitems = data.response.data.carts;
                 $scope.tip_price = Number(Math.round((data.response.data.total_original_price * 20) / 100));
                $scope.total_price = data.response.data.total_net_price;
                $scope.cart_count = data.response.data.cart_count;
                localStorage.setItem("cart_count", $scope.cart_count);


              });
              res.error(function (data, status, headers, config) {
                $rootScope.setLoading(false);
                if (!$cordovaNetwork.isOnline()) {
                  $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
                    .then(function () {
                      // callback success
                    });
                } else {
                  $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
                    .then(function () {
                      // callback success
                    });
                }
                console.log(" failure message: " + JSON.stringify({
                  data: data
                }));


              });

            });
        }
        else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

            });


        }

      });
      res.error(function (data, status, headers, config) {
        console.log("errorAboutusMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({ data: data }));
      });

    }
  }



});
MassMobileMassageAppControllers.controller("CheckoutMassageController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "21");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  // $scope.tip_price = "";
  $rootScope.pricetopay = JSON.parse($routeParams.price1);

  // $scope.tip_price = localStorage.getItem("gratuity");
  $scope.tip_price = Number(localStorage.getItem("gratuity"));
  $rootScope.travel_amount = Number(localStorage.getItem("travel_amount"));
  $rootScope.early_or_late_fee = Number(localStorage.getItem("early_or_late_fee"));

  // $scope.totalClicks = localStorage.getItem("gratuity")
  // $rootScope.gratuity = localStorage.getItem("gratuity");
  // alert($rootScope.gratuity)
  $scope.checkOut = function () {

    $scope.popBeforeCheckout();
    /*if($scope.tip_price=="")
            {
            $scope.tip_price="0"
            }
$rootScope.next();
$location.path('/PaypalPaymentMassage/'+$routeParams.price1+"/"+parseInt($scope.pricetopay.prices)+"/"+$scope.tip_price);
  */

  }



  $scope.checkOutMemberShipChecked = false;
  $scope.checkUutMemberShipcheckBoxClicked = function () {
    $scope.checkOutMemberShipPopUp = false;
    $scope.checkOutMemberShipChecked = true;

    if ($scope.tip_price == " ") {
      $scope.tip_price = "0"
    }
    $rootScope.next();
    $location.path('/PaypalPaymentMassage/' + $routeParams.price1 + "/" + parseInt($scope.pricetopay.prices) + "/" + $scope.tip_price);

  }




  $scope.checkOutMemberShipOutPopUpClose = function () {
    $scope.checkOutMemberShipPopUp = false;
  }


  $scope.popBeforeCheckout = function () {

    $rootScope.setLoading(true);
    var res = $http.get(baseUrl + 'rest_pages/agreement.json');
    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("checkout response" + JSON.stringify(data));
      $scope.checkOutMemberShipdescription = data.response.data.page.description;
      $scope.checkOutMemberShipPopUp = true;

    });
    res.error(function (data, status, headers, config) {
      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log(" failure message: " + JSON.stringify({
        data: data
      }));

    });

  }





});
MassMobileMassageAppControllers.controller("CheckoutMembershipController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
//alert($location);
//alert(JSON.stringify($location));

  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "22");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.total_price = $routeParams.total_price;
  $scope.product_id = $routeParams.product_id;
  $scope.namecheckout = $routeParams.name;
  $scope.type = $routeParams.type;
  $scope.title = $routeParams.title;
  $scope.tip_price = "";
 
      if( $scope.product_id=="26" && $scope.type=="0"){
        $scope.tip_price = "28";
      } else  if( $scope.product_id=="27" && $scope.type=="0"){
        $scope.tip_price = "37";
      } else  if( $scope.product_id=="26" && $scope.type=="1"){
        $scope.tip_price = "364";
      }else  if( $scope.product_id=="27" && $scope.type=="1"){
        $scope.tip_price = "481";
      }
     var final_price_mem = parseInt($routeParams.total_price)+parseInt($scope.tip_price); 
      localStorage.setItem("final_price_mem",final_price_mem); 
      // alert($scope.tip_price+" "+$scope.product_id+" "+$scope.type);
  $scope.checkboxModel = {
    value1: 'NO',
    value2: 'NO',
    value3: 'NO'

  };

  $scope.checkOut = function () {

    if ($scope.checkboxModel.value1 == "'YES'" && $scope.checkboxModel.value2 == "'YES'" && $scope.checkboxModel.value3 == "'YES'") {

      $rootScope.next();

      
      // $location.path('/PaypalMembership/'+$scope.product_id+"/"+$scope.type+"/"+$scope.tip_price);
      $scope.checkOutMembershipPopUpFunction();
    }

    else {


      $cordovaDialogs.alert('Please accept our Terms & Conditions', '', 'OK')
        .then(function () {
        });


    }



  }



  $scope.checkOutMemberShipChecked = false;
  $scope.checkUutMemberShipcheckBoxClicked = function () {
    $scope.checkOutMemberShipPopUp = false;
    $scope.checkOutMemberShipChecked = true;
//alert('/PaypalMembership/' + $scope.product_id + "/" + $scope.type + "/" + $scope.tip_price);


   $location.path('/PaypalMembership/' + $scope.product_id + "/" + $scope.type + "/" + $scope.tip_price);

  }

  $scope.checkOutMemberShipOutPopUpClose = function () {
    $scope.checkOutMemberShipPopUp = false;
  }


  $scope.checkOutMembershipPopUpFunction = function () {
    $rootScope.setLoading(true);
    var res = $http.get(baseUrl + 'rest_pages/agreement.json');
    res.success(function (data, status, headers, config) {
      $rootScope.setLoading(false);

      console.log("checkout response" + JSON.stringify(data));
      $scope.checkOutMemberShipdescription = data.response.data.page.description;
      $scope.checkOutMemberShipPopUp = true;

    });
    res.error(function (data, status, headers, config) {
      $rootScope.setLoading(false);
      if (!$cordovaNetwork.isOnline()) {
        $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
          .then(function () {
            // callback success
          });
      } else {
        $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
          .then(function () {
            // callback success
          });
      }
      console.log(" failure message: " + JSON.stringify({
        data: data
      }));

    });
  }








});
MassMobileMassageAppControllers.controller("PaymentController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
//alert($routeParams.price);
  var totalAmount = Number($routeParams.tipprice) + Number($routeParams.price)
  var dataObj = {
    // completeresponse: $scope.completeresponse,
    session_token: localStorage.getItem("session_token"),
    // device_id: $scope.device_id,
    tip_price: $routeParams.tipprice,
    transaction_id: '1111'
  };
  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
 localStorage.setItem("page_id", "22");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.device_id = device.uuid;
  $scope.pricetopay = $routeParams.price;
  $scope.tippricetopay = $routeParams.tipprice;



  function onDeviceReady() {

    var totalAmount = Number($routeParams.tipprice) + Number($routeParams.price);
    var totalAmount = localStorage.getItem("final_price_mem");
 // alert(totalAmount);
    var urlpay='https://www.massmobilemassage.com/app_paypal.php?amount=' + totalAmount + '&description=' + 'GiftCart';
    
        document.getElementById('paymentiframe').src = urlpay;

  
  }

   document.addEventListener("deviceready", onDeviceReady, false);














 

  $scope.nameoncard = "";
  $scope.cardno = "";
  $scope.cvvno = "";
  $scope.month = "";
  $scope.year = "";
  $scope.card_type = "";

  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(i);
  }
  $scope.monthsarray = months;


  var years = [];
  for (var i = 2015; i < 2050; i++) {
    years.push(i);
  }
  $scope.yearsArray = years;


  $scope.proceedClick = function () {

    if ($scope.card_type == "") {

      $cordovaDialogs.alert('Please select card type', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cardno == "") {


      $cordovaDialogs.alert('Please fill the card number', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.nameoncard == "") {

      $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.month == "") {

      $cordovaDialogs.alert('Please fill the month', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.year == "") {

      $cordovaDialogs.alert('Please fill the year', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cvvno == "") {

      $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
        .then(function () {
        });


      return false;

    }


    else {

      $rootScope.setLoading(true);
      if (localStorage.getItem("session_token") != null && !angular.isUndefined(localStorage.getItem("session_token"))) {
        var dataObj = {
          session_token: localStorage.getItem("session_token"),
          device_id: $scope.device_id,
          name_on_card: $scope.nameoncard,
          card_number: $scope.cardno,
          cvv: $scope.cvvno,
          expiry_month: $scope.month,
          expiry_year: $scope.year,
          card_type: $scope.card_type,
          tip_price: $scope.tippricetopay

        };

      }
      else {
        var dataObj = {
          session_token: "0",
          device_id: $scope.device_id,
          name_on_card: $scope.nameoncard,
          card_number: $scope.cardno,
          cvv: $scope.cvvno,
          expiry_month: $scope.month,
          expiry_year: $scope.year,
          card_type: $scope.card_type,
          tip_price: $scope.tippricetopay
        };
      }


      console.log("gift checkout payment request: " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_gift_certificate.json', dataObj);
      res.success(function (data, status, headers, config) {
        console.log("gift checkout payment response: " + JSON.stringify(data));

        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              localStorage.setItem("cart_count", "0");
              $rootScope.next();
              $location.path('/index');
            });
        } else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

            });
        } else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }


      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });
    }



  }




});
MassMobileMassageAppControllers.controller("PaypalPaymentMassageController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
 var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "23");
   $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.device_id = device.uuid;
  $scope.completeresponse = $rootScope.pricetopay;
  $scope.pricetopay = $routeParams.price;
  $scope.tippricetopay = $routeParams.tipprice;
  function onDeviceReady() {

    let totalAmount = Number($routeParams.price) + Number(localStorage.getItem("gratuity")) + Number(localStorage.getItem("early_or_late_fee")) + Number(localStorage.getItem("travel_amount"))
   // var ref = window.open('https://www.massmobilemassage.com/app_paypal.php?amount=' + totalAmount + '&description=' + localStorage.getItem("product_name"), '_self', 'location=yes,footer=yes');
 var urlpay='https://www.massmobilemassage.com/app_paypal.php?amount=' + totalAmount + '&description=' + localStorage.getItem("product_name");
    
        document.getElementById('paymentiframe').src = urlpay;


    }

  document.addEventListener("deviceready", onDeviceReady, false);





 

 


  $scope.nameoncard = "";
  $scope.cardno = "";
  $scope.cvvno = "";
  $scope.month = "";
  $scope.year = "";
  $scope.card_type = "";

  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(i);
  }
  $scope.monthsarray = months;


  var years = [];
  for (var i = 2015; i < 2050; i++) {
    years.push(i);
  }
  $scope.yearsArray = years;


  $scope.proceedClick = function () {

    if ($scope.card_type == "") {

      $cordovaDialogs.alert('Please select card type', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cardno == "") {


      $cordovaDialogs.alert('Please fill the card number', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.nameoncard == "") {

      $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.month == "") {

      $cordovaDialogs.alert('Please fill the month', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.year == "") {

      $cordovaDialogs.alert('Please fill the year', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cvvno == "") {

      $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
        .then(function () {
        });


      return false;

    }

    else {

      $rootScope.setLoading(true);

      var dataObj = {
        completeresponse: $scope.completeresponse,
        session_token: localStorage.getItem("session_token"),
        device_id: $scope.device_id,
        name_on_card: $scope.nameoncard,
        card_number: $scope.cardno,
        cvv: $scope.cvvno,
        expiry_month: $scope.month,
        expiry_year: $scope.year,
        card_type: $scope.card_type,
        tip_price: $scope.tippricetopay
      };




      console.log("massage payment request: " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_orders.json', dataObj);
      res.success(function (data, status, headers, config) {
        console.log("massage payment response: " + JSON.stringify(data));

        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

              $rootScope.next();
              $location.path('/MassageType');
            });
        } else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

            });
        } else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }


      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });
    }



  }




});
MassMobileMassageAppControllers.controller("PaymentPackagesController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {

  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "24");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.device_id = device.uuid;

  $scope.product_id = $routeParams.package;
  $scope.tipprice = $routeParams.tipprice;
function onDeviceReady() {

    let totalAmount = Number($routeParams.tipprice);
   // var ref = window.open('https://www.massmobilemassage.com/app_paypal.php?amount=' + totalAmount + '&description=' + localStorage.getItem("product_name"), '_self', 'location=yes,footer=yes');
 var urlpay='https://www.massmobilemassage.com/app_paypal.php?amount=' + totalAmount + '&description=' + $routeParams.package;

    
        document.getElementById('paymentiframe').src = urlpay;


    }

  document.addEventListener("deviceready", onDeviceReady, false);



  $scope.nameoncard = "";
  $scope.cardno = "";
  $scope.cvvno = "";
  $scope.month = "";
  $scope.year = "";
  $scope.card_type = "";

  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(i);
  }
  $scope.monthsarray = months;


  var years = [];
  for (var i = 2015; i < 2050; i++) {
    years.push(i);
  }
  $scope.yearsArray = years;
  $scope.proceedClick = function () {
    if ($scope.card_type == "") {

      $cordovaDialogs.alert('Please select card type', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cardno == "") {


      $cordovaDialogs.alert('Please fill the card number', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.nameoncard == "") {

      $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.month == "") {

      $cordovaDialogs.alert('Please fill the month', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.year == "") {

      $cordovaDialogs.alert('Please fill the year', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cvvno == "") {

      $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
        .then(function () {
        });


      return false;

    }

    else {

      $rootScope.setLoading(true);

      var dataObj = {
        session_token: $scope.session_token,
        name_on_card: $scope.nameoncard,
        card_number: $scope.cardno,
        cvv: $scope.cvvno,
        expiry_month: $scope.month,
        expiry_year: $scope.year,
        expiry_year: $scope.year,
        card_type: $scope.card_type,
        product_id: $scope.product_id,
        tip_price: $scope.tipprice

      };



      console.log("package checkout payment request: " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_package.json', dataObj);
      res.success(function (data, status, headers, config) {
        console.log("package checkout payment response: " + JSON.stringify(data));

        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              localStorage.setItem("cart_count", "0");
              $rootScope.next();
              $location.path('/index');
            });
        } else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

            });
        } else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }


      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });
    }


  }


});
MassMobileMassageAppControllers.controller("PaymentPackagesOtherController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {

  var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "25");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");
  $scope.device_id = device.uuid;

  $scope.otheramount = $routeParams.price;
 function onDeviceReady() {

 // alert(totalAmount);
    var urlpay='https://www.massmobilemassage.com/app_paypal.php?amount=' + $scope.otheramount + '&description=' + 'Packagerandomamount';
    

        document.getElementById('paymentiframe').src = urlpay;
           $rootScope.setLoading(false);
    }
  document.addEventListener("deviceready", onDeviceReady, false);
  $scope.nameoncard = "";
  $scope.cardno = "";
  $scope.cvvno = "";
  $scope.month = "";
  $scope.year = "";
  $scope.card_type = "";

  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(i);
  }
  $scope.monthsarray = months;


  var years = [];
  for (var i = 2015; i < 2050; i++) {
    years.push(i);
  }
  $scope.yearsArray = years;
  $scope.proceedClick = function () {
    if ($scope.card_type == "") {

      $cordovaDialogs.alert('Please select card type', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cardno == "") {


      $cordovaDialogs.alert('Please fill the card number', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.nameoncard == "") {

      $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.month == "") {

      $cordovaDialogs.alert('Please fill the month', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.year == "") {

      $cordovaDialogs.alert('Please fill the year', '', 'OK')
        .then(function () {
        });


      return false;

    }
    if ($scope.cvvno == "") {

      $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
        .then(function () {
        });


      return false;

    }

    else {

      $rootScope.setLoading(true);

      var dataObj = {
        session_token: $scope.session_token,
        name_on_card: $scope.nameoncard,
        card_number: $scope.cardno,
        cvv: $scope.cvvno,
        expiry_month: $scope.month,
        expiry_year: $scope.year,
        expiry_year: $scope.year,
        card_type: $scope.card_type,
        amount: $scope.otheramount
      };



      console.log("package checkout payment request: " + JSON.stringify(dataObj));

      var res = $http.post(baseUrl + 'rest_ortherpayment.json', dataObj);
      res.success(function (data, status, headers, config) {
        console.log("package checkout payment response: " + JSON.stringify(data));

        $rootScope.setLoading(false);
        if (data.response.status == true) {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              localStorage.setItem("cart_count", "0");
              $rootScope.next();
              $location.path('/index');
            });
        } else if (data.response.status == false) {

          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {

            });
        } else {
          $cordovaDialogs.alert(data.response.message, '', 'OK')
            .then(function () {
              // callback success
            });



        }


      });
      res.error(function (data, status, headers, config) {
        console.log("errorLoginMessage: " + JSON.stringify(data));
        $rootScope.setLoading(false);

        if (!$cordovaNetwork.isOnline()) {
          $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
            .then(function () {
              // callback success
            });
        } else {
          $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
            .then(function () {
              // callback success
            });
        }
        console.log("failure message: " + JSON.stringify({
          data: data
        }));
      });
    }



  }




});
MassMobileMassageAppControllers.controller("PaypalMembershipController", function ($scope, $http, $routeParams, $rootScope, $location, $window, $cordovaNetwork, $cordovaDialogs) {
//alert($rootScope.completeresponse);
var res = $http.get(baseUrl + 'rest_menu.json');
  res.success(function (data, status, headers, config) {
    $scope.home_menues = data.response.data.home_menues;
  });
  localStorage.setItem("page_id", "26");

  $scope.session_token = localStorage.getItem("session_token");
  $scope.cart_count = localStorage.getItem("cart_count");
  $scope.name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
  $scope.address = localStorage.getItem("city") + ' ' + localStorage.getItem("state");
  $scope.profilePic = localStorage.getItem("user_image");

  $scope.device_id = device.uuid;

  $scope.product_id = $routeParams.productid;
  $scope.type = $routeParams.type;
  $scope.tipprice = $routeParams.tipprice;

  function onDeviceReady() {
  var totalAmount = localStorage.getItem("final_price_mem");
 // alert(totalAmount);
    var urlpay='https://www.massmobilemassage.com/app_paypal_subscription.php?amount=' + totalAmount + '&description=' + 'Membership';
    
        document.getElementById('paymentiframe').src = urlpay;
           $rootScope.setLoading(false);
    }
  document.addEventListener("deviceready", onDeviceReady, false);
  


  $scope.nameoncard = "";
  $scope.firstName = "";
  $scope.lastname1 = "";
  $scope.cardno = "";
  $scope.cvvno = "";
  $scope.month = "";
  $scope.year = "";
  $scope.card_type = "";

  $scope.emailCheck = "";
  $scope.phnumber = "";



  var months = [];
  for (var i = 1; i < 13; i++) {
    months.push(i);
  }
  $scope.monthsarray = months;


  var years = [];
  for (var i = 2015; i < 2050; i++) {
    years.push(i);
  }
  $scope.yearsArray = years;
  $scope.proceedClick = function () {


    if ($scope.type == "1") {

      if ($scope.card_type == "") {
        $cordovaDialogs.alert('Please select card type', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.cardno == "") {


        $cordovaDialogs.alert('Please fill the card number', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.nameoncard == "") {

        $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.month == "") {

        $cordovaDialogs.alert('Please fill the month', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.year == "") {

        $cordovaDialogs.alert('Please fill the year', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.cvvno == "") {

        $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
          .then(function () {
          });




      }
      else {
        $rootScope.setLoading(false);




        var dataObj = {
          session_token: $scope.session_token,
          name_on_card: $scope.nameoncard,
          card_number: $scope.cardno,
          cvv: $scope.cvvno,
          expiry_month: $scope.month,
          expiry_year: $scope.year,
          expiry_year: $scope.year,
          card_type: $scope.card_type,
          product_id: $scope.product_id,
          type: $scope.type,
          tip_price: $scope.tipprice

        };
 



        alert("membership yearly checkout payment request: " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_checkout_membership.json', dataObj);
        res.success(function (data, status, headers, config) {
          console.log("membership checkout payment response: " + JSON.stringify(data));

          $rootScope.setLoading(false);
          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                localStorage.setItem("cart_count", "0");
                $rootScope.next();
                $location.path('/index');
              });
          } else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {

              });
          } else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });



          }


        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({
            data: data
          }));
        });
      }
    }
    else if ($scope.type == "0") {

      if ($scope.card_type == "") {

        $cordovaDialogs.alert('Please select card type', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.cardno == "") {


        $cordovaDialogs.alert('Please fill the card number', '', 'OK')
          .then(function () {
          });




      }
      else if (angular.isUndefined($scope.firstName) || $scope.firstName == "") {
        $cordovaDialogs.alert('Please fill the name on card', '', 'OK')
          .then(function () {
          });


      }
      /*  else  if($scope.lastname1==""){
                    $cordovaDialogs.alert('Please fill the last name', '', 'OK')
                              .then(function() {
                            });




     }
        else if($scope.emailCheck == ""){

                   $cordovaDialogs.alert('Please fill the email', '', 'OK')
                              .then(function() {
                           });


                     }
        else if(angular.isUndefined($scope.emailCheck)){
                $cordovaDialogs.alert('Please fill the valid email id', '', 'OK')
                   .then(function() {
                 });



                }
        else if($scope.phnumber == ""){
             $cordovaDialogs.alert('Please fill the phone number', '', 'OK')
                                 .then(function() {
                               });


             }
        else if($scope.phnumber.length<10 || $scope.phnumber.length>12){
                                            $cordovaDialogs.alert('Please fill the valid phone number', '', 'OK')
                                                                .then(function() {
                                                              });


                                            }*/
      else if ($scope.month == "") {

        $cordovaDialogs.alert('Please fill the month', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.year == "") {

        $cordovaDialogs.alert('Please fill the year', '', 'OK')
          .then(function () {
          });




      }
      else if ($scope.cvvno == "") {

        $cordovaDialogs.alert('Please fill the cvv no', '', 'OK')
          .then(function () {
          });




      }
      else {
        $rootScope.setLoading(true);



        var dataObj = {
          session_token: $scope.session_token,
          card_number: $scope.cardno,
          cvv: $scope.cvvno,
          expiry_month: $scope.month,
          expiry_year: $scope.year,
          expiry_year: $scope.year,
          card_type: $scope.card_type,
          product_id: $scope.product_id,
          type: $scope.type,
          name_on_card: $scope.firstName,
          /*    last_name:$scope.lastname1,
          address:$scope.address,
            city:$scope.city,
            state:$scope.state,
            zip:$scope.zipcode,
            country: $scope.country,
            phone:$scope.phnumber,
            email:$scope.emailCheck,*/
          tip_price: $scope.tipprice


        };




        console.log("membership recurring checkout payment request: " + JSON.stringify(dataObj));

        var res = $http.post(baseUrl + 'rest_checkout_membership.json', dataObj);
        res.success(function (data, status, headers, config) {
          console.log("membership checkout payment response: " + JSON.stringify(data));

          $rootScope.setLoading(false);
          if (data.response.status == true) {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                localStorage.setItem("cart_count", "0");
                $rootScope.next();
                $location.path('/index');
              });
          } else if (data.response.status == false) {

            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {

              });
          } else {
            $cordovaDialogs.alert(data.response.message, '', 'OK')
              .then(function () {
                // callback success
              });



          }


        });
        res.error(function (data, status, headers, config) {
          console.log("errorLoginMessage: " + JSON.stringify(data));
          $rootScope.setLoading(false);

          if (!$cordovaNetwork.isOnline()) {
            $cordovaDialogs.alert('There is no network connectivity. Please check your network connection.', '', 'OK')
              .then(function () {
                // callback success
              });
          } else {
            $cordovaDialogs.alert('There is some problem. Please try again later.', '', 'OK')
              .then(function () {
                // callback success
              });
          }
          console.log("failure message: " + JSON.stringify({
            data: data
          }));
        });
      }
    }





  }

});
