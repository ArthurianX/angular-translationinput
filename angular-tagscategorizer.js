"use strict";


if (typeof dragula == 'undefined') {
    var dragula;
    throw "Exception: dragula.js is undefined. Please add the library as a dependency to your project";
}

angular.module('tagsCategorizer',[angularDragula(angular)]);

angular.module('tagsCategorizer')
    .directive('tagsCategorizer',['$parse', '$document', '$http', '$timeout', '$compile','$templateCache',
        function($parse, $document, $http, $timeout, $compile, $templateCache){
            return {
                restrict: 'E',
                templateUrl: 'angular-tagscategorizer.html',
                controller: ['$scope', 'dragulaService', function tagsCategorizerCtrl($scope, dragulaService){

                    $scope.$on('second-bag.drag', function (e, el) {
                        el.removeClass('ex-moved');
                    });

                    $scope.$on('second-bag.drop', function (e, el) {
                        el.addClass('ex-moved');
                    });

                    $scope.$on('second-bag.over', function (e, el, container) {
                        container.addClass('ex-over');
                    });

                    $scope.$on('second-bag.out', function (e, el, container) {
                        container.removeClass('ex-over');
                    });

                    //////////////////////////////////
                    $scope.newGroup = '';
                    $scope.renameGroup = [];
                    $scope.addNewGroup = function(){
                        //console.log('Poof');
                        $scope.tagsGroups.unshift({name: $scope.newGroup, tags: [], short: $scope.newGroup.toLowerCase()});
                        $scope.newGroup = '';
                    };

                    $scope.editGroup = function(e, index){
                        //console.log('Edit Group');
                        e.preventDefault();
                        e.stopPropagation();
                        $scope.renameGroup[index] = !$scope.renameGroup[index];

                    };

                    $scope.stopEvent = function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    };

                    $scope.deleteGroup = function(e, index){
                        $scope.tagsGroups.splice(index, 1);
                    };

                    $scope.status = [];

                    $scope.tagsGroups = [
                        {id: 1, name: 'Weather Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'weather'},
                        {id: 2, name: 'Area Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'area'},
                        {id: 3, name: 'Electric Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'electric'},
                        {id: 4, name: 'Region Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'region'},
                        {id: 5, name: 'Gas Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'gas'},
                        {id: 6, name: 'Heat Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'heat'},
                    ];

                    $scope.ungroupedTags = [
                        'tag1', 'tag2', 'ElectroTag1', 'ReadingArea', 'LuttonMC', 'DixonskWh', 'CroatoanR', 'ReginaldCityHall',
                        'SomeOtherTag', 'Tagging7', 'Raddington', 'SHElectroValves', 'SwissCheeseFctry', 'Blabla', 'tag1', 'tag2', 'ElectroTag1', 'ReadingArea', 'LuttonMC',
                        'SomeOtherTag', 'Tagging7', 'Raddington', 'SHElectroValves', 'SwissCheeseFctry'
                    ];

                    dragulaService.options($scope, 'weather-bag', {
                        removeOnSpill: false,
                        accepts: function (el, target, source, sibling) {
                            //console.log('Accept', el, target, source);
                            return true; // elements can be dropped in any of the `containers` by default
                        },
                        revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
                    });

                    dragulaService.options($scope, 'unused-bag', {
                        removeOnSpill: false,
                        accepts: function (el, target, source, sibling) {
                            return true; // elements can be dropped in any of the `containers` by default
                        },
                        revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
                    });

                    $scope.$on('unused-bag.drop', function (e, el) {

                        el.addClass('ex-moved');
                    });

                    $scope.$on('unused-bag.over', function (e, el, container) {
                        container.addClass('ex-over');
                    });

                    $scope.$on('unused-bag.out', function (e, el, container) {
                        container.removeClass('ex-over');
                    });

                    $scope.$on('unused-bag.drop-model', function (el, target, source) {
                        //console.log(el, target, source);
                    });

                    $scope.$on('unused-bag.remove-model', function (el, target, source) {
                        //console.log(el, target, source);
                    });

                    $scope.removeAssignedTag = function(tags, index) {
                        $scope.ungroupedTags.push(tags[index]);
                        tags.splice(index, 1);
                    };

                }],
                link: function(scope, element, attrs) {





                }
            };
        }
    ]);

