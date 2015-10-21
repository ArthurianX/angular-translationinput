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
