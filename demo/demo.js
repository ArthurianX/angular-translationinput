angular.module('app', ['ngAnimate', angularDragula(angular), 'ui.bootstrap','tagsCategorizer']);

angular.module('app').controller('DemoCtrl',function($scope,$http, dragulaService, $timeout){

    $scope.tagsGroups = [
        {id: 1, name: 'Weather Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'weather'},
        {id: 2, name: 'Area Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'area'},
        {id: 3, name: 'Electric Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'electric'},
        {id: 4, name: 'Region Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'region'},
        {id: 5, name: 'Gas Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'gas'},
        {id: 6, name: 'Heat Tags', tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'], short: 'heat'},
    ];

    $scope.ungroupedTags = [];

    $timeout(function(){

        $scope.ungroupedTags = [
            'tag1', 'tag2', 'ElectroTag1', 'ReadingArea', 'LuttonMC', 'DixonskWh', 'CroatoanR', 'ReginaldCityHall',
            'SomeOtherTag', 'Tagging7', 'Raddington', 'SHElectroValves', 'SwissCheeseFctry', 'Blabla', 'tag1', 'tag2', 'ElectroTag1', 'ReadingArea', 'LuttonMC',
            'SomeOtherTag', 'Tagging7', 'Raddington', 'SHElectroValves', 'SwissCheeseFctry'
        ];

    }, 1500);

    var checkDuplicates = function(groups, group){

        for (var i = 0; i < groups.length; i++) {
          if (groups[i].name == group.name) {
              group.name +="1";
          }
        };

    };

    $scope.addGroupExt = function(group){
        group.id = Math.round(Math.random() * (100 - 10) + 10);
        console.log('Added goup', group);
        checkDuplicates($scope.tagsGroups, group);
        $timeout(function(){
            $scope.tagsGroups.unshift(group);
        }, 50);
    };

    $scope.updateGroupExt = function(group) {
        console.log('Update the group, send stuff to server, refresh data');
    };

    $scope.deleteGroupExt = function(group) {
        console.log('Delete group, update stuff, send to server, etc');
    };


});