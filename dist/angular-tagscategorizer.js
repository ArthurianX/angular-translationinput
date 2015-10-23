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
                            //$scope.tagsGroups.unshift({name: $scope.newGroup, tags: [], short: $scope.newGroup.toLowerCase()});
                            $scope.addGroup({group: {name: $scope.newGroup, tags: [], short: $scope.newGroup.toLowerCase()}});
                            $scope.newGroup = '';
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

                    /* Drag and Drop To Model Logic */

                    $scope.modelActions = function(type, tag, source, dest, before) {
                        var groupChange;

                        var pushSpecific = function(arr, el, index) {
                            if (index) {
                                // Push to specific position in array
                                arr.splice(index, 0, el);
                            } else {
                                arr.push(el);
                            }
                        };

                        if (type) {

                            $scope.tagsGroups[source].tags.splice(tag[0], 1);
                            pushSpecific($scope.ungroupedTags, tag[1], before);

                            groupChange = $scope.tagsGroups[source];
                        } else {

                            pushSpecific($scope.tagsGroups[dest].tags, tag[1], before);
                            $scope.ungroupedTags.splice(tag[0], 1);

                            groupChange = $scope.tagsGroups[dest];
                        }

                        // Callback UPDATE event
                        $timeout(function(){
                            $scope.$apply();
                        }, 100);
                        $scope.updateGroup(groupChange);

                        // At the end of the operations delete the "COPIED" tag
                        //$scope.removeTag();

                    };

                }],
                link: function(scope, element, attrs) {
                    var currEl;

                    var applyToModel = function(el, target, source, sibling) {
                        currEl = angular.element(el);
                        var tagsToUnused, bagDest, bagSource, pushBefore;
                        var tag = [angular.element(el).attr('data-index'), angular.element(el).attr('data-tag')];

                        if (angular.element(target).hasClass('ungrouped-tags')) {
                            tagsToUnused = true;
                            bagSource = angular.element(source).parent().attr('data-index');
                            bagDest = 'unused';
                        } else {
                            tagsToUnused = false;
                            bagDest = angular.element(target).parent().attr('data-index');
                            bagSource = 'unused';
                        }

                        if (sibling) {
                            pushBefore = angular.element(sibling).attr('data-index');
                        }

                        scope.modelActions(tagsToUnused, tag, bagSource, bagDest, pushBefore);

                    };

                    scope.removeTag = function(){
                        // We will delete the element that has been dragged after the controller logic is OK
                        currEl.remove();
                    };

                    // Instantiate dragula
                    var drake = dragula({
                        isContainer: function (el) {
                            return false; // only elements in drake.containers will be taken into account
                        },
                        moves: function (el, source, handle, sibling) {
                            return true; // elements are always draggable by default
                        },
                        accepts: function (el, target, source, sibling) {
                            //console.log(el, target, source, sibling);
                            return true; // elements can be dropped in any of the `containers` by default
                        },
                        invalid: function (el, target) {
                            return false; // don't prevent any drags from initiating by default
                        },
                        direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
                        copy: false,                       // elements are moved by default, not copied
                        copySortSource: false,             // elements in copy-source containers can be reordered
                        revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
                        removeOnSpill: false,              // spilling will `.remove` the element, if this is true
                        mirrorContainer: document.body,    // set the element that gets mirror elements appended
                        ignoreInputTextSelection: true     // allows users to select input text, see details below
                    });

                    // Events
                    drake
                        .on('drag', function (el) {
                            // Indicate drag
                        })
                        .on('drop', function (el, target, source, sibling) {
                            // Work the model instead of just leaving the elements
                            applyToModel(el, target, source, sibling);
                        }).on('over', function (el, container) {
                            angular.element(container).addClass('ar-tags-over');
                        }).on('out', function (el, container) {
                            angular.element(container).removeClass('ar-tags-over');
                        });

                    /* Bad Watchers - REFACTOR */
                    scope.$watchCollection(
                        "tagsGroups",
                        function( newValue, oldValue ) {
                            if (newValue.length > 0) {
                                $timeout(function(){
                                    for (var i=0; i < newValue.length; i++) {
                                        drake.containers.push(document.querySelector('.bag' + i + ' .tags'));
                                    }
                                }, 100);
                            }
                        }
                    );

                    scope.$watchCollection(
                        "ungroupedTags",
                        function( newValue, oldValue ) {
                            if (newValue.length > 0) {
                                $timeout(function(){
                                    var tags = angular.element(element.children().children().children()[1])[0];
                                    drake.containers.push(tags);
                                }, 100);
                            }
                        }
                    );


                    /*attrs.$observe("tagsGroups", function(){
                        console.log( "Inner $observe() fired." );
                    });

                    attrs.$observe("ungroupedTags", function(){
                        console.log( "UG $observe() fired." );
                    });*/


                    /*scope.hookGroups = function(val){
                     if (val) {
                     var bags = angular.element(element.children().children().children().children()[1]).children();
                     console.log(bags);
                     }

                     };

                     scope.hookTags = function(val){
                     if (val) {
                     var tags = angular.element(element.children().children().children()[1]);
                     console.log(tags);
                     }

                     };*/

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
    "                <div\n" +
    "                     ng-repeat=\"group in tagsGroups track by $index\"\n" +
    "                     class=\"bag clearfix bag{{$index}}\"\n" +
    "                     id=\"bag bag{{$index}}\"\n" +
    "                     ng-click=\"makeVisible($index)\"\n" +
    "                     data-gid=\"{{group.id}}\"\n" +
    "                     data-index=\"{{$index}}\">\n" +
    "                    <!--ng-init=\"hookGroups($last)\"-->\n" +
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
    "                          <span class=\"tag\"\n" +
    "                                ng-repeat=\"tag in group.tags track by $index\"\n" +
    "                                data-tag=\"{{tag}}\"\n" +
    "                                data-index=\"{{$index}}\">\n" +
    "                              <!--ng-init=\"hookTags($last)\"-->\n" +
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
    "        <span class=\"unsel-tag\"\n" +
    "              ng-repeat=\"tag in ungroupedTags track by $index\"\n" +
    "              data-tag=\"{{tag}}\"\n" +
    "              data-index=\"{{$index}}\"\n" +
    "              ng-click=\"addTagToGroup($index)\"\n" +
    "                >\n" +
    "            <i class=\"fa fa-tag\"></i> {{tag}} <i ng-click=\"removeAssignedTag(group.tags, $index)\" class=\"glyphicon glyphicon-remove\"></i>\n" +
    "        </span>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
