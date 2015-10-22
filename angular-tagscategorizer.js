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

