angular.module('panono', []).controller('indexCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.expanded = true;
	$scope.filters = ["All", "Favorites"];
	$scope.views = ["Grid", "List"];
	$scope.viewBy = "Grid";
	$scope.filterBy = "All";
	let url = "http://api3-dev.panono.com/explore";

	function getImages() {
		return $http.get(url)
			.then(response => response.data)
			.catch(err => console.log(`error getting images ${error.data}`));
	}

	$scope.filterChange = function() {
		if (!localStorage.getItem('pics')) {
			getImages()
				.then(tiles => {
					$scope.tiles = tiles.items;
					saveDB();
				});
		} else {
			$scope.tiles = readDB();
		}
	};

	function onInit() {
		$scope.filterChange();
	}
	$scope.isGrid = function() {
		return $scope.viewBy.toLowerCase() === 'grid';
	};

	$scope.getImage = function(obj) {
		let thumbnail = obj.data.images.thumbnails.find(img => img.height === 350);
		return {
			background: `url(${thumbnail.url}) center no-repeat`,
			backgroundSize: "cover"
		};
	};

	$scope.processFavorite = function(imgObj) {
		if (imgObj.isFavorite) {
			imgObj.isFavorite = false;
		} else {
			imgObj.isFavorite = true;
		}
		saveDB();
	};

	function saveDB() {
		localStorage.setItem('pics', JSON.stringify($scope.tiles));
	}

	function readDB() {
		return JSON.parse(localStorage.getItem('pics'));
	}

	$scope.filterTiles = function(tile) {
		if ($scope.filterBy.toLowerCase() === "favorites") {
			if (!tile.hasOwnProperty('isFavorite')) {
				tile.isFavorite = false;
			}
			return tile.isFavorite;
		} else {
			return tile;
		}
	};

	onInit();
}]);