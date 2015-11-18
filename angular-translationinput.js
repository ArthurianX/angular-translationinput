"use strict";


if (typeof dragula == 'undefined') {
    var dragula;
    throw "Exception: dragula.js is undefined. Please add the library as a dependency to your project";
}

angular.module('translationInput',[]);

angular.module('translationInput')
    .directive('translationInput',['$parse', '$document', '$window', '$http', '$timeout', '$compile','$templateCache',
        function($parse, $document, $window, $http, $timeout, $compile, $templateCache){
            return {
                restrict: 'A',
                controller: ['$scope', function translationInputCtrl($scope){


                }],
                link: function(scope, element, attrs, ngModel) {

                    scope.isAROpen = false;

                    scope.languages = [];

                    var flags = {};

                    scope.defaults = {
                        defaultLanguage: "en",
                        fetchFlags: false,
                        languages: ['en'],
                        openPosition: "bottom",
                        translateMessage: "Translate Text"
                    };

                    // Extend the default configuration with the one received from the app
                    var configuration = scope[attrs.translationInput];

                    for (var key in configuration) {
                        scope.defaults[key] = configuration[key];
                    }

                    var createList = function(){
                        // Make the languages list
                        scope.defaults.languages.forEach(function(val, index){
                            var text = '';
                            console.log(scope.defaults.defaultLanguage, val);
                            if (scope.defaults.defaultLanguage === val) {
                                text = angular.copy(scope[attrs.ngModel]);
                                scope[attrs.ngModel] = scope.defaults.translateMessage;
                                button.html('x');
                                button.addClass('aropen');
                            }
                            scope.languages.push({text: text, symbol: val, flag: flags[val] || ''});
                        });
                    };

                    var restoreInput = function(){

                        scope.languages.forEach(function(val, index){
                            if (val.symbol === scope.defaults.defaultLanguage) {
                                scope[attrs.ngModel] = val.text;
                                button.html(val.symbol);
                                button.removeClass('aropen');
                            }
                        });

                        scope.languages = [];

                    };

                    console.log('Defaults ', scope.defaults);

                    // The list element
                    var selectTemplate = $compile($templateCache.get('angular-translationinput.html'))(scope);
                    var button = $compile('<span ng-click="showARTranslations()" class="ar-translation-input-opener">' + scope.defaults.defaultLanguage + '</span>')(scope);

                    // Position the list when it's open
                    var positionList = function(){
                        var location = angular.element(element)[0].getBoundingClientRect();
                        console.log(location, selectTemplate);
                        selectTemplate.css({top: location.top + angular.element(element)[0].offsetHeight + 'px'});
                    };


                    scope.showARTranslations = function(){

                        if (scope.isAROpen) {

                            angular.element(element).next().next().remove();
                            scope.isAROpen = false;
                            angular.element($window).unbind("scroll");
                            restoreInput();

                        } else {

                            angular.element(element).next().after(selectTemplate);
                            createList();
                            scope.isAROpen = true;
                            positionList();
                            angular.element($window).bind("scroll", function() {
                                positionList();
                            });

                        }
                    };

                    angular.element(element).addClass('ar-translation-input-base');

                    angular.element(element).after(button);


                }
            };
        }
    ]);

