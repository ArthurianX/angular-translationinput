angular.module('app', ['ngAnimate', 'ui.bootstrap','translationInput']);

angular.module('app').controller('DemoCtrl',function($scope,$http, $timeout){

    $scope.testtranslation = 'Translate this';

    $scope.translationConfiguration = {
        languages: ['en', 'fr', 'de', 'it'],
        defaultLanguage: 'en',
        fetchFlags: true,
        openPosition: 'top',
        translateMessage: 'Traducere text'
    }

});