/* global angular, document, window */
'use strict';
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

.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout) {
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
    $scope.$parent.clearFabs();
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
        $scope.show = false;
        $scope.hide = true;
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
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
        if (User != undefined) {
            if (User.Password != undefined && User.Email != undefined) {
                if (user != undefined) {
                    if (User.Email == user.Email) {
                        if (User.Password == user.Password) {
                            if (User.EmailConfirm == true) {
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
                                        title: 'Well-Come...!!!',
                                        template: User.Email + ' have been successfully logged in.!!!'
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
                                                        $state.go('app.tankmanagment')
                                                        window.location.reload();
                                                    }
                                                });
                                            }
                                            else {
                                                user.LoginCount += 1;
                                                localStorageService.set('UserData', user);
                                                $state.go('app.tankmanagment')
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
                                        $state.go('app.emailverification')
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
            else if (User.Password == undefined && User.Email) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert...!!!',
                    template: 'Please fill Password..!!!'
                });
            }
            else if (User.Password && User.Email == undefined) {
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
        if (!user) {
            user = {
                "Email": null,
                "Phone": null,
                "Password": null
            }
        }
        else
        userEmail = user.Email;

        console.log("registration", User)
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
                }
                if (User.Password && User.Email) {
                    userEmail = User.Email;
                    localStorageService.set('UserData', UserData);
                    $state.go('app.registration');
                }
                else if (User.Password == undefined || User.Password == "" || User.Password == null) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert...!!!',
                        template: 'Please fill Password..!!!'
                    });
                }
                else if (User.Email == undefined || User.Email == "" || User.Email == null) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Alert...!!!',
                        template: 'Please fill Email..!!!'
                    });
                }
            }
            else  if (User.Email == userEmail &&  user.Phone == null) {               
                    $state.go('app.registration');
                }
            else if (User.Email == userEmail && user.Phone && user.EmailConfirm == false) {
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
            if (idx > -1 && (emailAddress.slice(idx + 1) === 'gmail.com' || emailAddress.slice(idx + 1) === 'yahoo.com' || emailAddress.slice(idx + 1) === 'hotmail.com' || emailAddress.slice(idx + 1) === 'outlook.com')) {

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
        if (User != undefined) {
            var UserData = localStorageService.get('UserData');
            UserData.Name = User.Name;
            UserData.Phone = User.Phone;
            UserData.Company = User.Company;
            localStorageService.set('UserData', UserData);
            $state.go('app.emailverification');
        }
        else {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert...!!!',
                template: 'Please fill Correct information..!!!'
            });
        }
    }
})

.controller('emailverificationCtrl', function ($scope, $ionicPopup, $state, $http, $timeout, $stateParams, ionicMaterialInk, StoreService, localStorageService) {
    $scope.$parent.clearFabs();
    $timeout(function () {
        $scope.$parent.hideHeader();
    }, 0);

    ionicMaterialInk.displayEffect();

    $scope.EmailConfirm = function () {
        var UserData = localStorageService.get('UserData');
        UserData.EmailConfirm = true;
        localStorageService.set('UserData', UserData);

        var alertPopup = $ionicPopup.alert({
            title: 'Succeed..!!!',
            template: 'You have Successfully verified.'
        });
        alertPopup.then(function (res) {
            if (res) {
                $state.go('app.login');
            }
        });
    }
})

.controller('configCtrl', function ($scope, $ionicPopup, $state, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, localStorageService) {

    template: '<input type = "text" ng-model = "data.model">',
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();

    var tank = localStorageService.get("tank");
    //if (tank) {
    $scope.data = localStorageService.get("ConfigData");
    if ($scope.data == null) {
        $scope.data = {
            minTemp: 20,
            MaxTemp: 80,
            minLevel: 20,
            timeValue: {}
        }
    }
    else {
        //debugger;
        var today = new Date().getDay();
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
       
    }
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
           // debugger;
            if (data.Sun == true) {
                $scope.data.timeValue.sunday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                    }
            }
            if (data.Mon == true) {
                $scope.data.timeValue.monday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            if (data.Tue == true) {
                $scope.data.timeValue.tuesday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            if (data.Wed == true) {
                $scope.data.timeValue.wednesday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            if (data.Thu == true) {
                $scope.data.timeValue.thusday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            if (data.Fri == true) {
                $scope.data.timeValue.friday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            if (data.Sat == true) {
                $scope.data.timeValue.saturday = {
                    timeValue1: data.timeValue1,
                    timeValue2: data.timeValue2,
                }
            }
            console.log("data inside Hatch", $scope.data);
            localStorageService.set("ConfigData", $scope.data);
            console.log("data", $scope.data);
            $state.go('app.config');
        };
    })

.controller('settingsCtrl', function ($scope, $ionicPopup, $ionicLoading, $state, $http, $stateParams, $timeout,ionicMaterialInk,ionicMaterialMotion, localStorageService) {
    // Set Header
    $scope.$parent.showHeader();

    //$scope.$parent.clearFabs();
    //$scope.$parent.setHeaderFab('left');
    // Delay expansion
    //$timeout(function () {
    //    $scope.isExpanded = true;
    //    $scope.$parent.setExpanded(true);
    //}, 300);
    // Set Motion
    //ionicMaterialMotion.fadeSlideInRight();
    // Set Ink
    //ionicMaterialInk.displayEffect();

    $scope.AccessToken = function (relayrData) {
        debugger;
        //id = "29204e93-3c0e-414a-a8ef-efc6632c486e";
        localStorageService.set("relayrData", relayrData);
        $state.go('app.tanks');
    }
})

.controller('tankListController', function ($scope, $state, $ionicLoading, filterFilter, DeviceService, localStorageService) {
    $(document).ready(function () {
        $(".item-hover").click(function () {
            $(".item-hover").removeClass("item-blue");
            $(this).addClass("item-blue");
        });
    })
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.TList = localStorageService.get("TankList");
    console.log("TankList", $scope.TList);
    //
    //$scope.deviceList = function () {
    //    debugger;
    //    $scope.show($ionicLoading);
    //    var settings = {
    //        "async": true,
    //        "crossDomain": true,
    //        "url": "https://api.relayr.io/users/cf1cf510-a383-413b-ad53-258aaf34a18a/devices",
    //        "method": "GET",
    //        "headers": {
    //            "authorization": "Bearer vwuSvJN2utdMnoPaXdAM7GeaVSSHnYWWSX8sFF7GF3nPoXijJNfML92khi5O70FY"

    //        }
    //    }
    //    $.ajax(settings).done(function (response) {
    //        console.log("response", response);
    //        $scope.TankList = response;
    //        $scope.TList = filterFilter($scope.TankList, { name: 'Tank' });
    //        $scope.hide($ionicLoading);
    //    });
    //}
    $scope.$on('$ionicView.enter', function () {
        // Code you want executed every time view is opened
        //$scope.deviceList();
        //console.log('Opened!')
    })

    $scope.TankDetail = function (tank) {
        var tankdetail = tank;
        DeviceService.set(tankdetail);
        console.log("tankdetail", tankdetail);
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
    })
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    
    $scope.$on('$ionicView.enter', function () {
        
    })


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
.controller('tank4Ctrl', function ($scope, $state, $ionicLoading, filterFilter, localStorageService) {
   
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
    $scope.deviceList = function () {
        //debugger;
        $scope.show($ionicLoading);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/users/cf1cf510-a383-413b-ad53-258aaf34a18a/devices",
            "method": "GET",
            "headers": {
                "authorization": "Bearer vwuSvJN2utdMnoPaXdAM7GeaVSSHnYWWSX8sFF7GF3nPoXijJNfML92khi5O70FY"

            }
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
    }

    $scope.TankDetails = function (tankDetails) {
       // debugger;
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
                "authorization": "Bearer vwuSvJN2utdMnoPaXdAM7GeaVSSHnYWWSX8sFF7GF3nPoXijJNfML92khi5O70FY",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log("response of tank detail", response);
            //if (response) {
            //}
            //else{

            
            //}
            //debugger;
            //
            $scope.tankdata = response.readings;
            console.log("tankdata", $scope.tankdata);
            if ($scope.tankdata.length == 0) {
                
                $scope.tem1 = 65;
                $("#tank").height(($scope.tem1 * 2.4));
                $(".water1").css("background-color", "rgba(100, 194, 223, 0.34)");
                $scope.temperatureValue = 0;
                $("#temp").height(($scope.tem2 * 2.2));
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

                        if ($scope.HatchDoorVal == "true") {
                            $scope.HatchDoorValue = 'Open';
                            console.log("HatchDoorVal", $scope.HatchDoorValue);

                            $(".tank4 .temprature2").css("border-top-style", "hidden");

                            $("#Bell").addClass("fa fa-bell-o").addText("Open");
                        }
                        if ($scope.HatchDoorVal == "false") {
                            $scope.HatchDoorValue = 'Close';
                        }
                        console.log("HatchDoorValue:" + $scope.HatchDoorValue);
                    }
                    if ($scope.tankdata[s].meaning == "Level Within Threshold") {
                        $scope.level = "Level Within Threshold";
                        $scope.levelval = $scope.tankdata[s].value;
                    }
                    if ($scope.tankdata[s].meaning == "Temperature") {

                        $scope.temperatureValue = $scope.tankdata[s].value;
                        $scope.temperatureMeaning = "Temprature";

                        $scope.tem1 = 65;
                        $("#tank").height(($scope.tem1 * 2.4));
                        $("#tank").css("background-color", "rgba(100, 194, 223, 0.34)");

                        $("#temp").height(($scope.temperatureValue * 2.2));
                        $("#temp").css("background-color", "#e2858a");
                        $scope.tem3 = 80;
                        $("#water").height(($scope.tem3 * 1.8));
                        $("#water").css("background-color", "rgba(100, 194, 223, 0.34)");
                    }
                }
                $scope.hide($ionicLoading);
            }

           
        })
        .error(function (errors) {
            //  
        })
       
    }

    //$scope.TankDetails();


   
    
    $scope.items = [
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1'}, 
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' },
    { title: 'Item 1', desc: 'This is item 1' }
   
 ];

    
    $scope.onSlideChanged = function (index) {
       // debugger;
        var TankList = localStorageService.get("TankList");
        var tankDetails = TankList[index];
        console.log("tank slider", tankDetails);
        $scope.TankDetails(tankDetails);
        //$ionicSlideBoxDelegate.next();
    }
})
.controller('tank2Ctrl', function ($scope, $state, $ionicLoading, filterFilter) {
    
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.TankDetails = function () {
       // debugger;
        $scope.show($ionicLoading);
        $scope.deviceData = DeviceService.getData();
        $scope.deviceID = $scope.deviceData.id;
        $scope.deviceName = $scope.deviceData.name;
        $scope.HatchDoorMeaning = "";
        $scope.HatchDoorDate = "";
        $scope.HatchDoorVal = "";
        $scope.temperatureValue = "";
        $scope.levelval = "";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/devices/" + $scope.deviceID + "/readings",
            "method": "GET",
            "headers": {
                "authorization": "Bearer vwuSvJN2utdMnoPaXdAM7GeaVSSHnYWWSX8sFF7GF3nPoXijJNfML92khi5O70FY",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            

            //
            $scope.tankdata = response.readings;
            for (var s = 0; s < $scope.tankdata.length; s++) {
                if ($scope.tankdata[s].meaning == "door") {

                    $scope.HatchDoorMeaning = "Hatch Door";
                    $scope.HatchDoorDate = $scope.tankdata[s].received;
                    $scope.HatchDoorVal = $scope.tankdata[s].value;
                    console.log("Loop:" + $scope.HatchDoorDate);
                }
                if ($scope.tankdata[s].meaning == "level") {
                    $scope.level = "Lavel";
                    $scope.levelval = $scope.tankdata[s].value;
                }
                if ($scope.tankdata[s].meaning == "temperature") {

                    $scope.temperatureValue = $scope.tankdata[s].value;
                    $scope.temperatureMeaning = "Temprature";
                }
            }
            $scope.hide($ionicLoading);

        })
        .error(function (errors) {
            //  
        })

    }
    $scope.TankDetails();
    $scope.$on('$ionicView.enter', function () {
        $scope.tem1 = 85;
        $("#tank").height(($scope.tem1 * 2.2));
        $("#tank").css("background-color", "#e2858a");

    })
})

.controller('tank1Ctrl', function ($scope, $ionicLoading, DeviceService) {
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.TankDetails = function () {
        $scope.show($ionicLoading);
        $scope.deviceData = DeviceService.getData();
        $scope.deviceID = $scope.deviceData.id;
        $scope.deviceName = $scope.deviceData.name;
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
                "authorization": "Bearer vwuSvJN2utdMnoPaXdAM7GeaVSSHnYWWSX8sFF7GF3nPoXijJNfML92khi5O70FY",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            
            //debugger;
            //
            $scope.tankdata = response.readings;
            console.log("tankdata", $scope.tankdata);

            for (var s = 0; s < $scope.tankdata.length; s++) {
                if ($scope.tankdata[s].meaning == "Hatch Open") {

                    $scope.HatchDoorMeaning = "Hatch Door";
                    $scope.HatchDoorDate = $scope.tankdata[s].received;
                    $scope.HatchDoorVal = $scope.tankdata[s].value;
                
                    if ($scope.HatchDoorVal == "true") {
                        $scope.HatchDoorValue = 'Open';
                        console.log("HatchDoorVal", $scope.HatchDoorValue);
                    }
                 //   debugger;
                    if ($scope.HatchDoorVal == "false") {
                        $scope.HatchDoorValue = 'Close';
                    }
                    console.log("HatchDoorValue:" + $scope.HatchDoorValue);
                }
                if ($scope.tankdata[s].meaning == "Level Within Threshold") {
                    $scope.levelval = "Level Within Threshold";
                  //  $scope.levelval = $scope.tankdata[s].value;
                }
                if ($scope.tankdata[s].meaning == "Temperature") {

                    $scope.temperatureValue = $scope.tankdata[s].value;
                    $scope.temperatureMeaning = "Temprature";
                    $("#tank").height(($scope.temperatureValue * 2.2));
                    $("#tank").css("background-color", "#e2858a");
                }
            }
            $scope.hide($ionicLoading);

        })
        .error(function (errors) {
            //  
        })

    }

    $scope.TankDetails();

    $scope.items = [
 { title: 'Item 1', desc: 'This is item 1' },
 { title: 'Item 2', desc: 'This is item 2' },
 { title: 'Item 3', desc: 'This is item 3' },
 { title: 'Item 4', desc: 'This is item 4' }];
    $scope.onSlideChanged = function (index) {
        //debugger;
        
        //$ionicSlideBoxDelegate.next();
    }
    //$scope.graph = function () {
    //    Highcharts.chart('container', {

    //        title: {
    //            text: ''
    //        },

    //        //subtitle: {
    //        //    text: 'Source: thesolarfoundation.com'
    //        //},

    //        yAxis: {
    //            title: {
    //                text: ''
    //            }
    //        },
    //        legend: {
    //            layout: 'vertical',
    //            align: 'right',
    //            verticalAlign: 'middle'
    //        },

    //        plotOptions: {
    //            series: {
    //                pointStart:[0]
    //            }
    //        },

    //        series: [{
    //            name: '',
    //            data: [0,72]
    //        }]

    //    });

    //}
   
   
})

.controller('configureCtrl', function ($scope, $state, localStorageService) {
    $scope.$on('$ionicView.enter', function () {
        var relayrData = localStorageService.get("RelayeClientId");
        $scope.relayrLogUrl = "https://api.relayr.io/oauth2/auth?redirect_uri=http://localhost:57205/&response_type=token&client_id=" + relayrData.relayrId + "&scope=admin-user-info,admin-device-info,configure-devices";
        $('#Relayr').attr('src', $scope.relayrLogUrl);
    });
})

.controller('contactusCtrl', function ($scope, localStorageService, $timeout, $state) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.PostComment = function (data) {
        var ContactData = data;
        // console.log("ContactData", ContactData);

        localStorageService.set('key', ContactData);
        $state.go('app.siteselection');
    }
    $scope.data = {};
    $scope.data.subject = 'SKdemoApp';


})

.controller('aboutCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();



})

//.controller('tanklistCtrl', function ($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
//    // Set Header
//    $scope.$parent.showHeader();
//    $scope.$parent.clearFabs();
//    $scope.$parent.setHeaderFab('left');

//    // Delay expansion
//    $timeout(function () {
//        $scope.isExpanded = true;
//        $scope.$parent.setExpanded(true);
//    }, 300);

//    // Set Motion
//    ionicMaterialMotion.fadeSlideInRight();

//    // Set Ink
//    ionicMaterialInk.displayEffect();

//    $scope.tank = [{ "name": "SMOKTECH TFV4 Full Kit", "imagescr": "../img/Tank/images1.jpg" },
//                     { "name": "Uwell Crown", "imagescr": "../img/Tank/images2.jpg" },
//                     { "name": "Sense Herkles Hydra TC", "imagescr": "../img/Tank/images3.jpg" },
//                     { "name": "Eleaf Melo 2 Temperature Cont", "imagescr": "../img/Tank/images4.jpg" },
//                     { "name": "UD Zephyrus", "imagescr": "../img/Tank/images5.jpg" }]
//    console.log($scope.tank);

//    $scope.TankDetail = function () {

//        $state.go('app.tankdetail');
//    }
//})
//angular.module('ionicApp', ['ionic'])

.controller('SlideController', function ($scope) {

    $scope.myActiveSlide = 3;

})

.controller('tankdetailCtrl', function ($scope, $http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function () {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
    var token = "Bearer 9yocgSLLscgYfHc67lv6Ir9lZOjjZf3mn5EFOppBIH9dR3uSaM7RqGV3JTCqzBi9";
    var deviceid = "2e205796-7da4-4c04-81cf-3f01e2460ed1";
    $scope.TankDetail = function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/devices/" + deviceid + "/readings",
            "method": "GET",
            "headers": {
                "authorization": token,
                "accept": "application/json",
                "content-type": "application/json",
                "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function (response) {
            console.log(response);

            $scope.tankdata = response.readings;
            for (var s = 0; s < $scope.tankdata.length; s++) {
                if ($scope.tankdata[s].meaning == "door") {

                    $scope.HatchDoorMeaning = "Hatch Door";
                    $scope.HatchDoorDate = $scope.tankdata[s].received;
                    $scope.HatchDoorVal = $scope.tankdata[s].value;
                }
                if ($scope.tankdata[s].meaning == "level") {
                    $scope.level = "Lavel";
                    $scope.levelval = $scope.tankdata[s].value;
                }
                if ($scope.tankdata[s].meaning == "temperature") {
                    $scope.temperatureValue = $scope.tankdata[s].value;
                    $scope.temperatureMeaning = "Temprature";
                }
            }
        })
        .error(function (errors) {

        });
    }
    $scope.TankDetail();

    $scope.TankDetailPost = function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.relayr.io/devices/" + deviceid + "/readings",
            "method": "POST",
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "authorization": token
            },
            "processData": false,
            "data": "{\r\n\"meaning\": \"Hatch Door\",\r\n\"value\": true\r\n}"
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }
    //$scope.TankDetailPost();
})

.controller('temperatureCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function () {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function ($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function () {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function () {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
});