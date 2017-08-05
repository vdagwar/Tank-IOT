// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ion-datetime-picker'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false); */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.registration', {
        url: '/registration',
        views: {
            'menuContent': {
                templateUrl: 'templates/registration.html',
                controller: 'registrationCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.emailverification', {
         url: '/emailverification',
         views: {
             'menuContent': {
                 templateUrl: 'templates/emailverification.html',
                 controller: 'emailverificationCtrl'
             },
             'fabContent': {
                 template: ''
             }
         }
    })

    .state('app.config', {
            url: '/config',
            views: {
                'menuContent': {
                    templateUrl: 'templates/config.html',
                    controller: 'configCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
    })

    .state('app.settingRelayr', {
             url: '/settingRelayr',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/settingRelayr.html',
                     controller: 'settingsCtrl'
                 },
                 'fabContent': {
                     template: ''
                 }
             }
         })

   //.state('app.configure', {
   //    url: '/configure',
   //    views: {
   //        'menuContent': {
   //            templateUrl: 'templates/configure.html',
   //            controller: 'configureCtrl'
   //        },
   //        'fabContent': {
   //            template: ''
   //        }
   //    }
   //})

   .state('app.tanks', {
            url: '/tanks',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tanks.html',
                    controller: 'tankListController'
                },
                'fabContent': {
                    template: ''
                }
            }
   })

   .state('app.setuptank', {
            url: '/setuptank',
            views: {
                'menuContent': {
                    templateUrl: 'templates/setuptank.html',
                    //controller:  'setupTankCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

         .state('app.hatchshedule', {
             url: '/hatchshedule',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/hatchshedule.html',
                     controller:  'hatchsheduleCtrl'
                 },
                 'fabContent': {
                     template: ''
                 }
             }
         })

   .state('app.tank1', {
            url: '/tank1',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tank1.html',
                    controller: 'tank1Ctrl'
                },
                'fabContent': {
                    template: ''
                }
            }
   })

   .state('app.tank2', {
             url: '/tank2',
             views: {
                 'menuContent': {
                     templateUrl: 'templates/tank2.html',
                     controller: 'tank2Ctrl'
                 },
                 'fabContent': {
                     template: ''
                 }
             }
   })

  

  

  

  .state('app.about', {
      url: '/about',
      views: {
          'menuContent': {
              templateUrl: 'templates/about.html',
              controller: 'aboutCtrl'
          },
          'fabContent': {
              template: ''
          }
      }
  })

  .state('app.tanklist', {
      url: '/tanklist',
      views: {
          'menuContent': {
              templateUrl: 'templates/tanklist.html',
              controller: 'tanklistCtrl'
          },
          'fabContent': {
              template: ''
          }
      }
  })

  .state('app.tankdetail', {
      url: '/tankdetail',
      views: {
          'menuContent': {
              templateUrl: 'templates/tankdetail.html',
              controller: 'tankdetailCtrl'
          },
          'fabContent': {
              template: ''
          }
      }
  })

  .state('app.contactus', {
      url: '/contactus',
      views: {
          'menuContent': {
              templateUrl: 'templates/contactus.html',
              controller: 'contactusCtrl'
          },
          'fabContent': {
              template: ''
          }
      }
  })
.state('app.tankmanagment', {
    url: '/tankmanagment',
    views: {
        'menuContent': {
            templateUrl: 'templates/tankmanagment.html',
            controller: 'tankmanagmentCtrl'
        },
        'fabContent': {
            template: ''
        }
    }
})
        .state('app.tank4', {
            url: '/tank4',
            views: {
                'menuContent': {
                    templateUrl: 'templates/tank4.html',
                    controller: 'tank4Ctrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
  .state('app.profile', {
      url: '/profile',
      views: {
          'menuContent': {
              templateUrl: 'templates/profile.html',
              controller: 'ProfileCtrl'
          },
          'fabContent': {
              //template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
              controller: function ($timeout) {
                  /*$timeout(function () {
                      document.getElementById('fab-profile').classList.toggle('on');
                  }, 800);*/
              }
          }
      }
  })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
