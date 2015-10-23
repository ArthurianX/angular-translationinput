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
