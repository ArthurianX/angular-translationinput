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


angular.module('tagsCategorizer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-tagscategorizer.html',
    "<div class=\"ar-tags-categorizer\">\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <div class=\"groups-list col-md-6\">\n" +
    "\n" +
    "            <div class=\"add-group\">\n" +
    "                <input type=\"text\" ng-model=\"newGroup\">\n" +
    "                <button ng-click=\"addNewGroup()\">Add</button>\n" +
    "            </div>\n" +
    "            <uib-accordion close-others=\"true\">\n" +
    "\n" +
    "                <uib-accordion-group ng-repeat=\"group in tagsGroups track by $index\"\n" +
    "                                     is-open=\"status[$index].open\">\n" +
    "                    <uib-accordion-heading>\n" +
    "                        <span ng-if=\"!renameGroup[$index]\">{{group.name}}</span>\n" +
    "                        <input type=\"text\" class=\"rename\" ng-model=\"group.name\" ng-click=\"stopEvent($event)\" ng-if=\"renameGroup[$index] && status[$index].open\">\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <span ng-if=\"status[$index].open\" ng-click=\"editGroup($event, $index)\"><i class=\"fa fa-pencil-square-o\"></i></span>\n" +
    "                            <span class=\"remove-group\" ng-if=\"status[$index].open\" ng-click=\"deleteGroup($event, $index)\"><i class=\"fa fa-times\"></i></span>\n" +
    "                            <button type=\"button\" class=\"btn btn-info nr-tags\">{{group.tags.length}} <i class=\"fa fa-tags\"></i></button>\n" +
    "                            <i class=\"glyphicon\" ng-class=\"{'glyphicon-chevron-down': status[$index].open, 'glyphicon-chevron-right': !status[$index].open}\"></i>\n" +
    "                        </div>\n" +
    "                    </uib-accordion-heading>\n" +
    "\n" +
    "                    <div class=\"inside-bag\"\n" +
    "                         dragula='\"unused-bag\"'\n" +
    "                         dragula-model=\"group.tags\">\n" +
    "                        <!--dragula=\"{{group.short + \"-bag\"}}\"-->\n" +
    "              <span class=\"tag\" ng-repeat=\"tag in group.tags track by $index\">\n" +
    "                <i class=\"fa fa-tag\"></i> {{tag}} <i ng-click=\"removeAssignedTag(group.tags, $index)\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "              </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </uib-accordion-group>\n" +
    "\n" +
    "            </uib-accordion>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"ungrouped-tags col-md-6\"\n" +
    "             dragula='\"unused-bag\"'\n" +
    "             dragula-model=\"ungroupedTags\">\n" +
    "        <span class=\"unsel-tag\" ng-repeat=\"tag in ungroupedTags track by $index\">\n" +
    "            <i class=\"fa fa-tag\"></i> {{tag}} <i ng-click=\"removeAssignedTag(group.tags, $index)\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "        </span>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
