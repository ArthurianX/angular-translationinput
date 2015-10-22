"use strict";


if (typeof dragula == 'undefined') {
    var dragula;
    throw "Exception: dragula.js is undefined. Please add the library as a dependency to your project";
}

angular.module('tagsCategorizer',[]);

angular.module('tagsCategorizer')
    .directive('tagsCategorizer',['$parse', '$document', '$http', '$timeout', '$compile','$templateCache',
        function($parse, $document, $http, $timeout, $compile, $templateCache){
            return {
                restrict: 'E',
                scope: {
                    tagsGroups: '=tagsGroups',
                    ungroupedTags: '=ungroupedTags',
                    addGroup: '&addGroup',
                    updateGroup: '&updateGroup',
                    deleteGroup: '&deleteGroup'
                },
                templateUrl: 'angular-tagscategorizer.html',
                controller: ['$scope', function tagsCategorizerCtrl($scope){

                    // Init

                    $scope.newGroup = '';
                    $scope.renameGroup = [];

                    //Actions
                    $scope.addNewGroup = function(){
                        if ($scope.newGroup.length > 3) {
                            $scope.tagsGroups.unshift({name: $scope.newGroup, tags: [], short: $scope.newGroup.toLowerCase()});
                            $scope.newGroup = '';
                            $scope.addGroup($scope.newGroup);
                        }
                    };

                    $scope.checkAddNew = function(event){
                        if (event.keyCode == 13) {
                            $scope.addNewGroup();
                        }
                    };

                    $scope.editGroup = function(e, index){
                        e.preventDefault();
                        e.stopPropagation();
                        if ($scope.renameGroup[index]){
                            //Means we're closing the edit ?
                            $scope.updateGroup($scope.tagsGroups[index]);
                        }
                        $scope.renameGroup[index] = !$scope.renameGroup[index];


                    };

                    $scope.stopEvent = function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    };

                    $scope.deleteTagGroup = function(e, index){
                        console.log($scope.tagsGroups);
                        $scope.ungroupedTags = $scope.ungroupedTags.concat($scope.tagsGroups[index].tags);
                        $scope.tagsGroups.splice(index, 1);
                        $scope.deleteGroup($scope.tagsGroups[index]);
                    };

                    $scope.makeVisible = function(index) {

                        if ($scope.renameGroup.indexOf(true) > -1) {
                            return false;
                        }

                        $scope.tagsGroups.forEach(function(val){
                            val.open = false;
                        });
                        $scope.tagsGroups[index].open = true;
                    };

                    $scope.removeAssignedTag = function(tags, index) {
                        $scope.ungroupedTags.push(tags[index]);
                        tags.splice(index, 1);
                        $scope.updateGroup($scope.tagsGroups[index]);
                    };

                    $scope.addTagToGroup = function(index) {
                        $scope.tagsGroups.forEach(function(group, gIndex){
                            if (group.open) {
                                group.tags.push($scope.ungroupedTags[index]);
                                $scope.ungroupedTags.splice(index, 1);
                                $scope.updateGroup($scope.tagsGroups[gIndex]);
                            }
                        });
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
    "\n" +
    "                <input type=\"text\" ng-model=\"newGroup\" placeholder=\"Add new group\" ng-keypress=\"checkAddNew($event)\">\n" +
    "                <button ng-click=\"addNewGroup()\"><i class=\"fa fa-plus\"></i></button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"bags\" ng-init=\"makeVisible(0)\">\n" +
    "                <div class=\"bag clearfix\"\n" +
    "                     ng-repeat=\"group in tagsGroups track by $index\"\n" +
    "                     ng-click=\"makeVisible($index)\"\n" +
    "                     data-gid=\"{{group.id}}\">\n" +
    "                    <div class=\"title clearfix\"\n" +
    "                         ng-class=\"{'editing': renameGroup[$index]}\">\n" +
    "\n" +
    "                        <span ng-if=\"!renameGroup[$index]\">{{group.name}}</span>\n" +
    "                        <input type=\"text\" class=\"rename\" ng-model=\"group.name\" ng-click=\"stopEvent($event)\" ng-if=\"renameGroup[$index] && group.open\">\n" +
    "                        <div class=\"pull-right\">\n" +
    "                            <span class=\"edit-group\" ng-if=\"group.open\" ng-click=\"editGroup($event, $index)\"><i class=\"fa fa-pencil-square-o\"></i></span>\n" +
    "                            <span class=\"remove-group\" ng-if=\"group.open\" ng-click=\"deleteTagGroup($event, $index)\"><i class=\"fa fa-times\"></i></span>\n" +
    "                            <button type=\"button\" class=\"btn btn-info nr-tags\">{{group.tags.length}} <i class=\"fa fa-tags\"></i></button>\n" +
    "                            <i class=\"arrow glyphicon\" ng-class=\"{'glyphicon-chevron-down': group.open, 'glyphicon-chevron-right': !group.open}\"></i>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"tags clearfix\"\n" +
    "                         ng-show=\"group.open\">\n" +
    "\n" +
    "                          <span class=\"tag\" ng-repeat=\"tag in group.tags track by $index\" data-tag=\"{{tag}}\">\n" +
    "                            <i class=\"fa fa-tag\"></i> {{tag}} <i ng-click=\"removeAssignedTag(group.tags, $index)\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                          </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"ungrouped-tags col-md-6\">\n" +
    "        <span class=\"unsel-tag\" ng-repeat=\"tag in ungroupedTags track by $index\" data-tag=\"{{tag}}\" ng-click=\"addTagToGroup($index)\">\n" +
    "            <i class=\"fa fa-tag\"></i> {{tag}} <i ng-click=\"removeAssignedTag(group.tags, $index)\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "        </span>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
