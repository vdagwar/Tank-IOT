/* global angular, document, window */
//'use strict';
angular.module('starter.controllers', ['LocalStorageModule'])

.service('StoreService', function () {
    var DataID = {};

    this.save = function (dataID) {
        // alert('DATA: ' + dataID);
        DataID = dataID;


    };

    this.getData = function () {

        // alert('DATA: ' + DataID);
        return DataID;

    };


})

.service('DeviceService', function () {
    var deviceDetail = {};

    this.set = function (tankdetail) {
        //
        // alert(tankdetail);
        deviceDetail = tankdetail;


    };

    this.getData = function () {
        //
        // alert('DeviceDetail: ' + DeviceDetail);
        return deviceDetail;

    };


})

.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $state, $window, localStorageService, $http) {
 
    //$scope.Name = 'Maria Muro';
    //$scope.address = 'Santa Clara';
    var logUser = localStorageService.get('UserData');
    //$scope.Name = logUser.Name;
    console.log("logUser", logUser);
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

    function onPositionUpdate(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
      
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        $http.get(url)
            .then(function (result) {
                var address = result.data.results[2].formatted_address;
                $scope.address = address;
                localStorageService.set("Address", $scope.address);
                console.log("address", address);
            });
    }
    
    
   
    $scope.Edit = function () {
        //  debugger;
        $(".file-upload").click();
    };
    if (localStorageService.get('profilePic'))
        $scope.UserPhoto = localStorageService.get('profilePic');
    else
        $scope.UserPhoto = "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";
    
    $(document).ready(function () {
        var readURL = function (input) {
            if (input.files && input.files[0]) {
                //debugger;
                var reader = new FileReader();
                reader.onload = function (e) {

                    //Sets the Old Image to new New Image
                    $('#photo-id').attr('src', e.target.result);
                    $scope.UserPhoto = e.target.result;
                    console.log($scope.UserPhoto);
                    localStorageService.set('profilePic', e.target.result);
                };
                //Renders Image on Page
                reader.readAsDataURL(input.files[0]);
            }
        };


        $(".file-upload").on('change', function () {
            readURL(this);
        });

        $(".upload-button").on('click', function () {
            
        });
    });
   
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }


    ////////////////////////////////////////
    // Layout Methods
    $scope.logout = function () {
        //var logUser = localStorageService.get('UserData');
        //$window.localStorage.clear(logUser);
        $state.go('app.login');
        $window.location.reload(true);
    };



    ////////////////////////////////////////

    $scope.hideNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function (bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function (location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function () {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function () {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function () {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function ($scope, $ionicLoading, $timeout, $http, $state, $stateParams, ionicMaterialInk, $ionicPopup, StoreService, localStorageService) {

    
    

    $scope.hideNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function (bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function (location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function () {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function () {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function () {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
    $timeout(function () {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    //get login user data if registered 
    var logUser = localStorageService.get('UserData');
    if (logUser) {
        $scope.show = true;
        $scope.hide = false;
        $scope.user = localStorageService.get('UserData');
        $(".Signin").addClass("border-sc");
        $(".Signup").removeClass("border-sc");
    } else {
        $scope.show = false;
        $scope.hide = true;
        $(".Signup").addClass("border-sc");
        $(".Signin").removeClass("border-sc");
    }

    $scope.Register = function () {
        $scope.hide = true;
        $scope.show = false;

    };
    $scope.Signin = function () {
        $scope.show = true;
        $scope.hide = false;
    };

    $(".Signin").click(function () {
        $(".Signin").addClass("border-sc");
        $(".Signup").removeClass("border-sc");
    });
    $(".Signup").click(function () {
        $(".Signup").addClass("border-sc");
        $(".Signin").removeClass("border-sc");
    });

    $scope.Login = function (User) {
        var user = localStorageService.get('UserData');
        //  console.log("user", user);
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
        if (User !== undefined) {
            if (User.Password !== undefined && User.Email !== undefined) {
                if (user !== undefined) {
                    if (User.Email == user.Email) {
                        if (User.Password == user.Password) {
                            if (User.EmailConfirm === true) {
                                var today = new Date();
                                var regDEate = new Date(user.Reg_Date);
                                regDEate.setMonth(regDEate.getMonth() + 3);

                                if (today > regDEate || user.LoginCount == 90) {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Alert...!!!',
                                        template: "You have exceed the free trial limit [50 sessions or 3 months of registration has passed] to explore the App. Hope you have a fair understanding of the App functionality. Kindly email to 'tankapp@ramp.digital' and let us know how we can help further."
                                    });
                                }
                                else {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Wel-Come...!!!',
                                        template: user.Email + ' have been successfully logged in.!!!'
                                    });
                                    alertPopup.then(function (res) {
                                        if (res) {
                                            regDEate.setMonth(regDEate.getMonth() - 2);
                                            if (today > regDEate || user.LoginCount > 20) {
                                                var alertPopup = $ionicPopup.alert({
                                                    title: 'Alert...!!!',
                                                    template: "Hope you have a fair understanding of the App functionality. Kindly email to 'tankapp@ramp.digital' and let us know how we can help further."
                                                });
                                                alertPopup.then(function (res) {
                                                    if (res) {
                                                        user.LoginCount += 1;
                                                        localStorageService.set('UserData', user);
                                                        $state.go('app.settingRelayr')
                                                        window.location.reload();
                                                    }
                                                });
                                            }
                                            else {
                                                user.LoginCount += 1;
                                                localStorageService.set('UserData', user);
                                                $state.go('app.settingRelayr');
                                                window.location.reload();
                                            }
                                        }
                                    });
                                }
                            }
                            else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Alert...!!!',
                                    template: 'Email id not verified! Please confirm email first..!!!'
                                });
                                alertPopup.then(function (res) {
                                    if (res) {
                                        $state.go('app.emailverification');
                                        //window.location.reload();
                                    }
                                });
                            }
                        }
                        else {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Alert...!!!',
                                template: 'You enter wrong Password!'
                            });
                        }
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Alert...!!!',
                            template: 'Email id not registerd   !'
                        });
                    }
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert...!!!',
                        template: 'First Register Your Email..!!!'
                    });
                }
            }
            else if (User.Password === undefined && User.Email) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert...!!!',
                    template: 'Please fill Password..!!!'
                });
            }
            else if (User.Password && User.Email === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert...!!!',
                    template: 'Please fill Email..!!!'
                });
            }
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert...!!!',
                template: 'Please fill Email & Password, it should not be Empty..!!!'
            });
        }
        $ionicLoading.hide();
    };


    $scope.RegisterNow = function (User) {
     
        var userEmail = null;
        var user = localStorageService.get('UserData');
        console.log("user", User);
        if (!user) {
            user = {
                "Email": null,
                "Phone": null,
                "Password": null

            };
        }
        else
            userEmail = user.Email;

       // console.log("registration", User);
        if (User != undefined) {
            if (User.Email != userEmail) {
                if (user.Phone)
                    user.Phone = null;

                var UserData = {
                    "Name": null,
                    "Company": null,
                    "Email": User.Email,
                    "Phone": user.Phone,
                    "Password": User.Password,
                    "Reg_Date": new Date(),
                    "LoginCount": 0,
                    "EmailConfirm": false
                };
                if (User.Password && User.Email) {
                    userEmail = User.Email;
                    localStorageService.set('UserData', UserData);
                    $state.go('app.registration');
                }
                else if (User.Password === undefined || User.Password === "" || User.Password === null) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert...!!!',
                        template: 'Please fill Password..!!!'
                    });
                }
                else if (User.Email === undefined || User.Email === "" || User.Email === null) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert...!!!',
                        template: 'Please fill Email..!!!'
                    });
                }
            }
            else if (User.Email === userEmail && user.Phone === null) {
                $state.go('app.registration');
            }
            else if (User.Email === userEmail && user.Phone && user.EmailConfirm === false) {
                $state.go('app.emailverification');
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert...!!!',
                    template: 'You have aleady registered!'
                });
                alertPopup.then(function (res) {
                    alertPopup.then(function (res) {
                        if (res) {
                            $state.go('app.login');
                        }
                    });
                });
            }
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert...!!!',
                template: 'Please fill Email & Password, it should not be Empty..!!!'
            });
        }
    };

    $scope.CheckMail = function (emailAddress) {
        try {
            $scope.mailDomain = false;
            var idx = emailAddress.lastIndexOf('@');
            if (idx > -1 && (emailAddress.slice(idx + 1) === 'gmail.com' || emailAddress.slice(idx + 1) === 'gmail.in' || emailAddress.slice(idx + 1) === 'yahoo.com' || emailAddress.slice(idx + 1) === 'yahoo.in' || emailAddress.slice(idx + 1) === 'hotmail.com' || emailAddress.slice(idx + 1) === 'outlook.com')) {

                $scope.mailDomain = true;
                var alertPopup = $ionicPopup.alert({
                    title: 'warning...!!!',
                    template: emailAddress.slice(idx + 1) + ' domain not supported.!!!'
                });
            }
        } catch (e) { }
    };
})

.controller('registrationCtrl', function ($scope, $ionicPopup, $state, $http, $timeout, $stateParams, ionicMaterialInk, StoreService, localStorageService) {
   
    $scope.$parent.clearFabs();
    $timeout(function () {
        $scope.$parent.hideHeader();
    }, 0);

    ionicMaterialInk.displayEffect();

    $scope.RegisterDetail = function (User) {
        if (User !== undefined) {
            var UserData = localStorageService.get('UserData');
            // debugger;
            console.log("getUserData", UserData);
            UserData.Name = User.Name;
            UserData.Phone = User.Phone;
            UserData.Company = User.Company;
            localStorageService.set('UserData', UserData);
            var alertPopup = $ionicPopup.alert({
                title: 'Alert...!!!',
                template: 'Registration Successfully..!!!'
            });
            // console.log("setUserData", UserData);
            $state.go('app.emailverification');
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert...!!!',
                template: 'Please fill Correct information..!!!'
            });
        }
    };
})

.controller('emailverificationCtrl', function ($scope, $ionicPopup, $state, $http, $timeout, $stateParams, ionicMaterialInk, StoreService, localStorageService) {
   
    $scope.$parent.clearFabs();
    $timeout(function () {
        $scope.$parent.hideHeader();
    }, 0);

    ionicMaterialInk.displayEffect();

    $scope.EmailConfirm = function () {
        var UserData = localStorageService.get('UserData');
        //console.log("EmailConfirm", UserData)
        UserData.EmailConfirm = true;
        localStorageService.set('UserData', UserData);
        // console.log("setEmailConfirm", UserData)
        var alertPopup = $ionicPopup.alert({
            title: 'Succeed..!!!',
            template: 'You have Successfully verified.'
        });
        alertPopup.then(function (res) {
            if (res) {
                $state.go('app.login');
            }
        });
    };
})

.controller('configCtrl', function ($scope, $ionicPopup, $state, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, localStorageService) {
  
    template: '<input type = "text" ng-model = "data.model">',
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();

    var tank = localStorageService.get("tank");
    //if (tank) {
    $scope.data = localStorageService.get("ConfigData");
    console.log("data", $scope.data);
    var today = new Date().getDay();
   var timeString = time.getHours() + ':' + time.getMinutes() + ':00';
    if ($scope.data == null) {
        $scope.data = {
            minTemp: 20,
            MaxTemp: 80,
            minLevel: 20,
            timeValue: {
                timeValue1: today.timeString,
                timeValue2: today.timeString
            }

        };
    }
    else {
      //  debugger;
        //var today = new Date().getDay();
        if (today == 0) {
            $scope.timeValue1 = $scope.data.timeValue.sunday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.sunday.timeValue2;
        }
        else if (today == 1) {
            $scope.timeValue1 = $scope.data.timeValue.monday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.monday.timeValue2;
        }
        else if (today == 2) {
            $scope.timeValue1 = $scope.data.timeValue.tuesday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.tuesday.timeValue2;
        }
        else if (today == 3) {
            $scope.timeValue1 = $scope.data.timeValue.wednesday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.wednesday.timeValue2;
        }
        else if (today == 4) {
            $scope.timeValue1 = $scope.data.timeValue.thusday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.thusday.timeValue2;
        }
        else if (today == 5) {
            $scope.timeValue1 = $scope.data.timeValue.friday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.friday.timeValue2;
        }
        else if (today == 6) {
            $scope.timeValue1 = $scope.data.timeValue.saturday.timeValue1;
            $scope.timeValue2 = $scope.data.timeValue.saturday.timeValue2;
        }
    }
    $scope.save = function (data) {
        localStorageService.set("ConfigData", data);
        $state.go("app.Home");
    };
    $scope.Cancel = function () {
        $state.go("app.Home");

    };

    $scope.reset = function (data, value) {
        if (value == 1) {
            $scope.data.minTemp = '';
            $scope.data.MaxTemp = '';
        }
        if (value == 2) {
            $scope.data.minLevel = '';
        }
        if (value == 3) {
            $scope.data.timeValue1 = '';
            $scope.data.timeValue2 = '';
            $state.go('app.hatchshedule');
        }

    };
})
.controller('hatchsheduleCtrl', function ($scope, $ionicPopup, $state, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, localStorageService) {
  
    template: '<input type = "text" ng-model = "data.model">',
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();

    var tank = localStorageService.get("tank");
    //if (tank) {
    $scope.data = localStorageService.get("ConfigData");

    $scope.save = function (data) {
        console.log("data", data);
       // debugger;
        if (data.Sun === true) {
            $scope.data.timeValue.sunday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Mon === true) {
            $scope.data.timeValue.monday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Tue === true) {
            $scope.data.timeValue.tuesday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Wed === true) {
            $scope.data.timeValue.wednesday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Thu === true) {
            $scope.data.timeValue.thusday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Fri === true) {
            $scope.data.timeValue.friday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        if (data.Sat === true) {
            $scope.data.timeValue.saturday = {
                timeValue1: data.timeValue1,
                timeValue2: data.timeValue2,
            }
        }
        console.log("data inside Hatch", $scope.data);
        localStorageService.set("ConfigData", $scope.data);
       // console.log("data", $scope.data);
        $state.go('app.config');
    };

    $scope.Cancel = function () {
        $state.go("app.config");
    };
})

.controller('settingsCtrl', function ($scope, $ionicPopup, $ionicLoading, $state, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, localStorageService) {
   
    $scope.$parent.showHeader();
    $scope.AccessToken = function (relayrData) {
        //   debugger;
        //id = "29204e93-3c0e-414a-a8ef-efc6632c486e";
        localStorageService.set("relayrData", relayrData);
        console.log("relayrData", relayrData);
        $state.go('app.tanks');
    };

    $scope.skip = function () {
        $state.go("app.Home");
    };
})

.controller('tankListController', function ($scope, $state, $ionicLoading, filterFilter, DeviceService, localStorageService) {
  
    $(document).ready(function () {
        $(".item-hover").click(function () {
            $(".item-hover").removeClass("item-blue");
            $(this).addClass("item-blue");
        });
    });
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.TList = localStorageService.get("TankList");
    //console.log("TankList", $scope.TList);

    $scope.$on('$ionicView.enter', function () {
        // Code you want executed every time view is opened
        //$scope.deviceList();
        //console.log('Opened!')
    });

    $scope.TankDetail = function (tank) {
        var tankdetail = tank;
        DeviceService.set(tankdetail);
        //console.log("tankdetail", tankdetail);
        //debugger;
        $state.go('app.tank1');
        // window.location.reload();
    }

})

.controller('tankmanagmentCtrl', function ($scope, $state, $ionicLoading, filterFilter, DeviceService, $ionicSlideBoxDelegate) {
   
    $(document).ready(function () {
        $(".item-hover").click(function () {
            $(".item-hover").removeClass("item-blue");
            $(this).addClass("item-blue");
        });
    });
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };

    $scope.$on('$ionicView.enter', function () {

    });


    $scope.items = [
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 2', desc: 'This is item 2' },
    { title: 'Item 3', desc: 'This is item 3' }
    ];

    $scope.onSlideChanged = function (slideIndex) {
        // Do something when slide changes
    };
    //$scope.nextSlide = function () {
    //    $ionicSlideBoxDelegate.next();
    //}
})
.controller('HomeCtrl', function ($scope, $state, $ionicLoading, filterFilter, localStorageService, DeviceService) {
   
    $scope.Adress = localStorageService.get("Address");
   
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.deviceID = "";
    $scope.TankList = '';
    $scope.relayrdata = localStorageService.get("relayrData");
    var relayrId = $scope.relayrdata.relayrId;
    $scope.accessToken = $scope.relayrdata.accessToken;
    //console.log("relayrdata", $scope.relayrdata);

   
    $scope.deviceList = function () {
        $scope.ConfifDetail = localStorageService.get("ConfigData");
        $scope.MinLevel = $scope.ConfifDetail.minLevel;
        console.log("MinLevel", $scope.MinLevel);
        $scope.show($ionicLoading);
        if ($scope.relayrdata !== null && $scope.relayrdata !== undefined && !$scope.relayrdata) {
            //debugger;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.relayr.io/users/" + relayrId + "/devices",
                "method": "GET",
                "headers": {
                    "authorization": $scope.accessToken

                }
            };
        }
        else {
            //debugger;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.relayr.io/users/cf1cf510-a383-413b-ad53-258aaf34a18a/devices",
                "method": "GET",
                "headers": {
                    "authorization": "Bearer gdrlGsuEw3L7HWD8bwtbEWCOJlxDgx5vmTUM0XFFCrG90n9KyUqaZxZWv5xWfCQq"

                }
            };
        }

        $.ajax(settings).done(function (response) {

            $scope.TankList = response;
            $scope.TList = filterFilter($scope.TankList, { name: 'Tank' });
            localStorageService.set("TankList", $scope.TList);
            var tankDetails = localStorageService.get("TankDetail[0]");
            if (!tankDetails) {
                tankDetails = $scope.TList[0];
                $scope.deviceID = tankDetails.id;
            }
            $scope.TankDetails(tankDetails);
            $scope.hide($ionicLoading);
        });
    };

    $scope.TankDetails = function (tankDetails) {
        // debugger;
        localStorageService.set("DetailForTank", tankDetails);
        $scope.ConfifDetail = localStorageService.get("ConfigData");
        //$scope.MinLevel = $scope.ConfifDetail.minLevel;
        console.log("ConfifDetail", $scope.ConfifDetail);
        $scope.show($ionicLoading);
        $scope.deviceID = tankDetails.id;
        $scope.deviceName = tankDetails.name;
        localStorageService.set("TankDetail", tankDetails);
        console.log("TList", $scope.TList);
        console.log("deviceID", $scope.deviceID, $scope.deviceName);
        $scope.HatchDoorMeaning = "";
        $scope.HatchDoorDate = "";
        $scope.HatchDoorValue = '';
        $scope.temperatureValue = "";
        $scope.level = "";
        $scope.levelval = "";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/devices/" + $scope.deviceID + "/readings",
            "method": "GET",
            "headers": {
                "authorization": $scope.accessToken,
                "cache-control": "no-cache"
            }
        };

        $.ajax(settings).done(function (response) {
            // console.log("response of tank detail", response);
            $scope.tankdata = response.readings;
            // console.log("tankdata", $scope.tankdata);
            if ($scope.tankdata.length == 0) {
                $scope.tem1 = 65;
                $("#tank").height(($scope.tem1 * 2.4));
                $(".water1").css("background-color", "rgba(100, 194, 223, 0.34)");
                $scope.temperatureValue = 0;
                $("#temp").height(($scope.temperatureValue * 2.8));
                $(".water2").css("background-color", "#e2858a");
                $scope.tem3 = 80;
                $("#water").height(($scope.tem3 * 1.8));
                $(".water3").css("background-color", "rgba(100, 194, 223, 0.34)");
                $scope.hide($ionicLoading);
            }
            else {
                for (var s = 0; s < $scope.tankdata.length; s++) {
                    if ($scope.tankdata[s].meaning == "Hatch Open") {

                        $scope.HatchDoorMeaning = "Hatch Door";
                        $scope.HatchDoorDate = $scope.tankdata[s].received;
                        $scope.HatchDoorVal = $scope.tankdata[s].value;

                        if ($scope.HatchDoorVal == true) {
                            $scope.HatchDoorValue = 'Open';
                            console.log("HatchDoorVal", $scope.HatchDoorValue);

                            $(".temprature2").css("border-top-style", "hidden");

                            $("#Bell").addClass("fa fa-bell-o").text("Open");
                        }
                        if ($scope.HatchDoorVal == false) {
                            $scope.HatchDoorValue = 'Close';
                        }
                        //  console.log("HatchDoorValue:" + $scope.HatchDoorValue);
                    }
                    if ($scope.tankdata[s].meaning == "Level Within Threshold") {
                        $scope.level = "Level Within Threshold";
                        $scope.levelval = $scope.tankdata[s].value;
                    }
                    if ($scope.tankdata[s].meaning == "Temperature") {
                        $scope.temperatureMeaning = "Temprature";
                        $scope.tem1 = 65;
                        $("#tank").height(($scope.tem1 * 2.4));
                        $("#tank").css("background-color", "rgba(100, 194, 223, 0.34)");
                        $scope.temperatureValue = $scope.tankdata[s].value;
                        $scope.temperatureValue = Math.round($scope.temperatureValue);
                        //console.log("TempValue", $scope.temperatureValue);
                        if ($scope.temperatureValue * 2.8 >= 280)
                            $("#temp").height(250);
                        else if ($scope.temperatureValue * 2.8 <= 0)
                            $("#temp").height(0);
                        else
                            $("#temp").height($scope.temperatureValue * 2.8);
                        if ($scope.temperatureValue >= $scope.ConfifDetail.minTemp && $scope.temperatureValue <= $scope.ConfifDetail.MaxTemp) {
                            $("#temp").css("background-color", "#41a6f4");
                        }
                        else
                            $("#temp").css("background-color", "#e2858a");
                        $scope.tem3 = 55;
                        $("#water").height(($scope.tem3 * 1.8));
                        $("#water").css("background-color", "rgba(100, 194, 223, 0.34)");
                    }
                }
                $scope.hide($ionicLoading);
            }


        })
        .error(function (errors) {

        });

    };

    $scope.TankDetail = function () {
        $scope.DetailForTank = localStorageService.get("DetailForTank");
        console.log("deviceID", $scope.DetailForTank);
        DeviceService.set($scope.DetailForTank);
        $state.go('app.tank1');
    };


    $scope.items = [
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' }

    ];
    $scope.onSlideChanged = function (index) {

        var TankList = localStorageService.get("TankList");
        var tankDetails = TankList[index];
        console.log("tank slider", tankDetails);
        $scope.TankDetails(tankDetails);
        //$ionicSlideBoxDelegate.next();
    };
})

.controller('tank1Ctrl', function ($scope, $ionicLoading, DeviceService, localStorageService) {
  
    $scope.config = localStorageService.get("ConfigData");
    $scope.MinLevel = $scope.config.minLevel;
    $scope.Adress = localStorageService.get("Address");
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.relayrdata = localStorageService.get("relayrData");
    $scope.relayrId = $scope.relayrdata.relayrId;
    $scope.accessToken = $scope.relayrdata.accessToken;
    $scope.TankDetails = function () {
        $scope.show($ionicLoading);
        $scope.deviceData = DeviceService.getData();
        console.log("deviceData", $scope.deviceData);
        $scope.deviceID = $scope.deviceData;
        $scope.deviceID = $scope.deviceData.id;
        $scope.deviceName = $scope.deviceData.name;
        $scope.HatchDoorValue = "";
        $scope.HatchDoorMeaning = "";
        $scope.HatchDoorDate = "";
        $scope.levelTimeval = '';
        $scope.temperatureValue = "";
        $scope.levelTimeval1 = "";
        $scope.level = "";
        $scope.levelval = "";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/devices/" + $scope.deviceID + "/readings",
            "method": "GET",
            "headers": {
                "authorization": $scope.accessToken,
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            $scope.tankdata = response.readings;
            var TempArray = localStorageService.get("TemperatureArray");
            if (TempArray == null)
                TempArray = [];
            for (var s = 0; s < $scope.tankdata.length; s++) {
                if ($scope.tankdata[s].meaning == "Hatch Open") {
                    $scope.HatchDoorMeaning = "Hatch Door";
                    $scope.HatchDoorDate = $scope.tankdata[s].received;
                    $scope.HatchDoorVal = $scope.tankdata[s].value;
                    if ($scope.HatchDoorVal == true) {
                        $scope.HatchDoorValue = 'Open';
                        console.log("HatchDoorVal Open:", $scope.HatchDoorValue);
                    }
                    if ($scope.HatchDoorVal == false) {
                        $scope.HatchDoorValue = 'Close';
                        console.log("HatchDoorValue Close:" + $scope.HatchDoorValue);
                    }
                    var HatchArray = [];
                    var hatch = {
                        "HatchDoorDate": new Date($scope.HatchDoorDate),
                        "HatchDoorVal": $scope.HatchDoorVal
                    };
                    HatchArray.push(hatch);
                    localStorageService.set("HatchDoor", HatchArray);
                    var HatchArrayvalues = localStorageService.get("HatchDoor");
                    var arrayOfHatchDoor = _.map(
                _.uniq(
                   _.map(HatchArrayvalues, function (obj) {
                       return JSON.stringify(obj);
                   })
                     ), function (obj) {
                         return JSON.parse(obj);
                     }
                   );
                    localStorageService.set("arrayOfHatchDoor", arrayOfHatchDoor);
                    var HacthArray = [];
                    var ArrayOfHatch = localStorageService.get("arrayOfHatchDoor");
                    for (var i = 0; i < ArrayOfHatch[i].length; i++) {
                        if (ArrayOfHatch.HatchDoorVal === true) {
                            HacthArray.push(ArrayOfHatch[i]);
                        }
                    }
                }
                else if ($scope.tankdata[s].meaning == "Level Within Threshold") {
                    $scope.levelval = "Level Within Threshold";
                    $scope.levelTimeval = $scope.tankdata[s].received;
                }
                else if ($scope.tankdata[s].meaning == "Level Below Threshold") {
                    $scope.levelval = "Level Below Threshold";
                    $scope.levelTimeval1 = $scope.tankdata[s].received;
                }
                else if ($scope.tankdata[s].meaning == "Temperature") {
                    $scope.temperatureTime = $scope.tankdata[s].received;

                    var TempDate = new Date($scope.temperatureTime);

                    $scope.temperatureValue = $scope.tankdata[s].value;
                    $scope.temperatureValue = Math.round($scope.temperatureValue);
                    console.log("temperatureValue y", TempDate);

                    var temp = {
                        "temperatureTime": new Date(TempDate),
                        "temperatureValue": $scope.temperatureValue
                    };
                    TempArray.push(temp);
                    localStorageService.set("TemperatureArray", TempArray);
                    var TemperatureArrayvalues = localStorageService.get("TemperatureArray");

                    var arrayOfObjAfter = _.map(
                _.uniq(
                   _.map(TempArray, function (obj) {
                       return JSON.stringify(obj);
                   })
                     ), function (obj) {
                         return JSON.parse(obj);
                     }
                   );
                    // console.log("arrayOfObjAfter", arrayOfObjAfter);
                    localStorageService.set("TankTempratureArray", arrayOfObjAfter);
                    var TankTemprature = $scope.temperatureValue;
                    localStorageService.set("TankTemprature", TankTemprature);
                    $scope.ConfifDetail = localStorageService.get("ConfigData");
                    if ($scope.temperatureValue * 2.8 >= 280)
                        $("#temp").height(280);
                    else if ($scope.temperatureValue * 2.8 <= 0)
                        $("#temp").height(0);
                    else

                        $("#temp").height($scope.temperatureValue * 2.8);
                    if ($scope.temperatureValue >= $scope.ConfifDetail.minTemp && $scope.temperatureValue <= $scope.ConfifDetail.MaxTemp) {
                        $("#tank").css("background-color", "rgb(65, 166, 244)");
                        $("#AlarmBell").removeClass("fa fa-bell-o");
                    }
                    else
                        $("#tank").css("background-color", "rgb(226, 133, 138)");
                    $("#AlarmBell").addClass("fa fa-bell-o");
                }
            }
            $scope.hide($ionicLoading);

        })
        .error(function (errors) {

        });

    }

    $scope.TankDetails();

    $scope.items = [
 { title: 'Item 1', desc: 'This is item 1' },
 { title: 'Item 2', desc: 'This is item 2' },
 { title: 'Item 3', desc: 'This is item 3' },
 { title: 'Item 4', desc: 'This is item 4' }];

    $scope.onSlideChanged = function (index) {
      //$ionicSlideBoxDelegate.next();
    }
    $scope.graph = function () {
       var TankTemprature = localStorageService.get('TankTempratureArray');
       var ArrayOfTemp = [];
       for (var i = 0; i < TankTemprature.length; i++) {
           var Today = new Date();
           Today.setHours(0, 0, 0, 0);
           var CDate = new Date(TankTemprature[i].temperatureTime);
           CDate.setHours(0, 0, 0, 0);
           if (CDate >= Today) {
               ArrayOfTemp.push(TankTemprature[i]);
           }
         
       }
       console.log("TempratureArray inside", ArrayOfTemp);
       var TempArrayValue = [];
       _.map(ArrayOfTemp, function (obj) {
           TempArrayValue.push({ "label": obj.temperatureTime, "y": obj.temperatureValue });
        })
       console.log("date should be greater ", TempArrayValue);
        Highcharts.chart('container', {
            title: {
                text: 'Temprature'
            },
            
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    pointStart: 0
                },
                line: {
            dataLabels: {
                    enabled: true
            },   
            enableMouseTracking: false
        }
            },

            series: [{
                name: 'Temprature',
                data: TempArrayValue,
                

            }]

        });
    }


})

.controller('contactusCtrl', function ($scope, localStorageService, $timeout, $state) {
   
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.PostComment = function (data) {
        var ContactData = data;
        // console.log("ContactData", ContactData);
        localStorageService.set('key', ContactData);
        $state.go('app.Home');
    }
    $scope.data = {};
    $scope.data.subject = 'SKdemoApp';


})

.controller('aboutCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
 
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();



})

