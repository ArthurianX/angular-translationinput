angular.module('translationInput').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-translationinput.html',
    "<div class=\"ar-translation-input\">\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"lang in languages track by $index\" ng-animate=\"{enter: 'aranimate-enter', leave: 'aranimate-leave'}\">\n" +
    "            <input type=\"text\" ng-model=\"lang.text\">\n" +
    "            <span>{{lang.symbol}}</span>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>"
  );

}]);
