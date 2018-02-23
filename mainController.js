var app = angular.module('myApp', []);
app.controller('MainController', function($scope,$http) {
	$scope.active='';	
	
	$scope.forage = function(dateBorn){
		var dborn = new Date(dateBorn).getTime()/3600000;
		var currd = new Date().getTime()/3600000;
		var age = (currd - dborn)/(24*365);
		return Math.ceil(age,0);
	}
	$http({
          method: 'GET',
          url: 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Chelsea'
        }).then(function successCallback(response) {
			$scope.players = response.data.player;
			$scope.playersfavor = response.data.player;
			$scope.player = $scope.players[0];
			$scope.age = $scope.forage($scope.player.dateBorn);
			$scope.playerid = $scope.player.idPlayer;
			if ($scope.player.intLoved == '0'){
			$scope.asterisk = 'far fa-star fa-lg'
			$scope.mycolor = 'none';
		}
		else if ($scope.player.intLoved == '1'){
			$scope.asterisk = 'fas fa-star fa-lg';
			$scope.mycolor = '#FFFF33';
		}
        }, function errorCallback(response) {
          //alert(response);
        });
		
	$scope.paikths = function(player){
		$scope.player = player;
		if ($scope.player.intLoved == '0'){
			$scope.asterisk = 'far fa-star fa-lg'
			$scope.mycolor = 'none';
		}
		else if ($scope.player.intLoved == '1'){
			$scope.asterisk = 'fas fa-star fa-lg';
			$scope.mycolor = '#FFFF33';
		}
		$scope.age = $scope.forage(player.dateBorn); 
		
		$scope.playerid = player.idPlayer;
		
	}
	
	$scope.add = function(player){
		
		for (var i=0; i<$scope.players.length; i++){
			if ($scope.players[i].idPlayer === player.idPlayer){
				$scope.players[i].intLoved = "1";
				$scope.player.intLoved = "1";
				$scope.mycolor = '#FFFF33';
				$scope.asterisk = 'fas fa-star fa-lg';
			}
		}
	}
	
	$scope.remove = function(player){
		for (var i=0; i<$scope.players.length; i++){
			if ($scope.players[i].idPlayer === player.idPlayer){
				$scope.players[i].intLoved = "0";
				$scope.player.intLoved = "0";
				$scope.mycolor = 'none';
				$scope.asterisk = 'far fa-star fa-lg';
			}
		}
	}
});
 
