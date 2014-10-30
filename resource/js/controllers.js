angular.module('myControllers', []).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	$scope.loginData = {};
	$ionicModal.fromTemplateUrl('resource/views/login.html', {
		scope : $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
	$scope.login = function() {
		$scope.modal.show();
	};
	$scope.doLogin = function() {
	};
}).controller('MyCtrl', function($scope, $http, User, $ionicModal, $ionicPopup, $ionicLoading, $state) {
	$scope.myInfo = {};
	$scope.news = 0;
	$scope.isSignIn = false;

	$ionicLoading.show({
		template : '<span class="icon spin ion-loading-d"></span> 加载中...'
	});
	$scope.loadInfo = function() {
		User.getInfo(_userInfo.username).then(function(data) {
			if (data != null) {
				$scope.myInfo = data;
				$scope.myInfo.devicename = _userInfo.devicename;
			}
			$ionicLoading.hide();
		});
	}
	$scope.loadInfo();

	$scope.toUser = function(username) {
		User.home(username);
	}
	// 先判断用户是否已经签到
	$scope.isUserSignIn = function() {
		User.isSignIn(_userInfo.username).then(function(status) {
			if (status > 0) {
				$scope.isSignIn = true;
			}
		});
	}
	$scope.isUserSignIn();

	$scope.signIn = function() {
		User.signIn(_userInfo.username).then(function(status) {
			if (status > 0) {
				$scope.myInfo.signInCount = parseInt($scope.myInfo.signInCount) + status;
				$scope.isSignIn = true;
			}
		});
	}
}).controller('MyStarCtrl', function($scope, $http, User) {
	$scope.list = [];
	$scope.last_id = 0;
	$scope.loadData = function() {
		User.getStars(_userInfo.username, $scope.last_id).then(function(data) {
			if (data != null) {
				$scope.list = data;
				$scope.last_id = data[data.length - 1].id;
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	$scope.loadData();

	$scope.delStar = function(obj) {
		User.delStar(_userInfo.username, obj).then(function(status) {
			if (status == 1) {
				$scope.list.splice($scope.list.indexOf(obj), 1);
			}
		});
	}
}).controller('MyFavorCtrl', function($scope, $http, Plan, User, $ionicPopup) {
	$scope.list = [];
	$scope.last_id = 0;

	$scope.loadData = function() {
		User.getFavor(_userInfo.username, $scope.last_id).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.last_id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	$scope.delFavor = function(obj) {
		var confirmPopup = $ionicPopup.confirm({
			title : '删除收藏？',
			template : '确定要删除这个收藏吗？',
			cancelText : "取消",
			okText : "确定",
		});
		confirmPopup.then(function(res) {
			if (res) {
				Plan.delFavor(obj).then(function(ret) {
					$scope.list.splice($scope.list.indexOf(obj), 1);
				});
			} else {
				console.log('you cancel it,love it');
			}
		});
	}
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	$scope.loadMore = function() {
		$scope.loadData();
	}
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}
}).controller('MyResourceCtrl', function($scope, $http, $ionicLoading, User) {
	$scope.list = [];
	$scope.id = 0;

	$ionicLoading.show({
		template : '<span class="icon spin ion-loading-d"></span> 加载中...'
	});
	$scope.loadData = function() {
		User.getCusList(_userInfo.username, _userInfo.token).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.id = data[data.length - 1].id;
			} else {
				$scope.hasMoreData = false;
			}
			$ionicLoading.hide();
		});
	}
	$scope.loadData();
}).controller('MyResourceDetailCtrl', function($scope, $http, $stateParams, User) {
	$scope.list = [];
	$scope.id = 0;
	$scope.cid = $stateParams.cid;

	$scope.loadData = function() {
		User.getResourceList(_userInfo.username, $scope.cid, $scope.id).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}

	$scope.loadMore = function() {
		$scope.loadData();
	};
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
}).controller('MyCommentsCtrl', function($scope, $http, User) {
	$scope.list = [];
	$scope.next_id = 0;
	$scope.reload = 0;

	$scope.loadData = function() {
		User.getComments(_userInfo.username, $scope.next_id).then(function(data) {
			if (data != null) {
				$scope.next_id = data[data.length - 1].id;
				if ($scope.reload) {
					$scope.list = data;
					$scope.$broadcast('scroll.refreshComplete');
				} else {
					$scope.list.push.apply($scope.list, data);
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			} else {
				$scope.hasMoreData = false;
			}
		});
	}

	$scope.doRefresh = function() {
		$scope.next_id = 0;
		$scope.reload = 1;
		$scope.loadData();
	}

	$scope.loadMore = function() {
		$scope.loadData();
	}
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

}).controller('MyMessageCtrl', function($scope, $http, User) {
	$scope.next_id = 0;
	$scope.reload = 0;
	$scope.list = [];

	$scope.loadData = function() {
		User.getMessages(_userInfo.username, $scope.next_id).then(function(data) {
			if (data != null) {
				$scope.next_id = data[data.length - 1].id;
				if ($scope.reload) {
					$scope.list = data;
					$scope.$broadcast('scroll.refreshComplete');
				} else {
					$scope.list.push.apply($scope.list, data);
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	$scope.doRefresh = function() {
		$scope.next_id = 0;
		$scope.reload = 1;
		$scope.loadData();
	}
	$scope.loadMore = function() {
		$scope.loadData();
	};
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	};
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

}).controller('FeedCtrl', function($scope, $http) {
	console.log("FeedCtrl");
}).controller('AboutCtrl', function($scope, $http) {
	console.log("AboutCtrl");
}).controller('MySettingCtrl', function($scope, $http) {
	console.log("MySettingCtrl");
}).controller('PlanGoodCtrl', function($scope, $http, Plan, $ionicLoading) {
	// 初始化的时候加载当天的
	$scope.day = date2str(new Date(), "yyyyMMdd");
	$scope.list = [];

	$scope.loadData = function() {
		Plan.getDaily($scope.day).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.day = data[0].dayid;
				$scope.$broadcast('scroll.infiniteScrollComplete');
				Plan.getPreviousDay($scope.day).then(function(data) {
					if (data != null){
						$scope.day = data;
					}	
				});
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	// $scope.loadData();

	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	$scope.loadMore = function() {
		$scope.loadData();
	}

	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}

	$scope.setPlanGood = function(obj) {
		Plan.addGood(obj.CloudID).then(function(ret) {
			obj.good_cnt = parseInt(obj.good_cnt) + ret;
		});
	}
	$scope.setPlanFavor = function(obj) {
		Plan.addFavor(obj.CloudID).then(function(ret) {
			obj.favor = true;
		});
	}
}).controller('ExploreCtrl', function($scope, $http, $ionicLoading) {
	$scope.list = [];

	$ionicLoading.show({
		template : '<i class="icon ion-loading-a"></i>'
	});
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getRoomCover/';
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			var status = ret.status;
			if (data != null && status == 1) {
				$scope.list = data;
			}
			$ionicLoading.hide();
		});
	}

	$scope.loadData();
}).controller('RankCtrl', function($scope, $http) {

}).controller('RankPlanCtrl', function($scope, $http, User) {
	$scope.list = [];

	$scope.toUser = function(username) {
		User.home(username);
	}
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getPlanRank/';
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	};
	$scope.doRefresh = function() {
		$scope.loadData();
	};
	$scope.loadData();

}).controller('RankSignInCtrl', function($scope, $http) {
	$scope.list = [];

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getSignInRank/';
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	};
	$scope.doRefresh = function() {
		$scope.loadData();
	};
	$scope.loadData();

}).controller('RankCommentCtrl', function($scope, $http) {
	$scope.list = [];

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getCommentRank/';
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	};
	$scope.doRefresh = function() {
		$scope.loadData();
	};
	$scope.loadData();

}).controller('RankGoodCtrl', function($scope, $http) {
	$scope.list = [];

	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getGoodRank/';
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
				$scope.$broadcast('scroll.refreshComplete');
			}
		});
	};
	$scope.doRefresh = function() {
		$scope.loadData();
	};
	$scope.loadData();

}).controller('RankLevelCtrl', function($scope, $http, User) {
	$scope.list = [];

	$scope.toUser = function(username) {
		User.home(username);
	}
	$scope.loadData = function() {
		var url = _GLOBAL.api + '/getExpRank/id/' + $scope.next_id;
		$http.get(url, {
			cache : true
		}).success(function(ret) {
			var data = ret.data;
			if (data != null) {
				$scope.list = data;
			}
		});
	};
	$scope.loadData();
}).controller('ExploreDetailCtrl', function($scope, $http, $stateParams, Plan, $ionicPopover, $ionicLoading) {
	$scope.list = [];
	$scope.id = 0;
	$scope.style = "";
	$scope.styles = [];
	$scope.type = $stateParams.type;
	$scope.loadData = function() {
		$ionicLoading.show({
			template : '<span class="icon spin ion-loading-d"></span> 加载中...'
		});
		Plan.getByType($scope.type, $scope.style, $scope.id).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
			} else {
				$scope.hasMoreData = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicLoading.hide();
		});
	}

	$scope.reloadData = function() {
		$ionicLoading.show({
			template : '<span class="icon spin ion-loading-d"></span> 加载中...'
		});
		Plan.getByType($scope.type, $scope.style, 0).then(function(data) {
			if (data != null) {
				$scope.list = data;
				$ionicLoading.hide();
			} else {
				$ionicLoading.hide();
				$ionicLoading.show({
					template : '<span class="icon spin ion-eye-disabled"></span> 没有找到数据',
					noBackdrop : true,
					duration : 1500
				});
			}
		});
	}
	// $scope.loadData();
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope : $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

	$scope.setStyle = function(style) {
		$scope.style = style;
		$scope.reloadData();
		$scope.popover.hide();
	}

	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	$scope.loadMore = function() {
		$scope.loadData();
	}

	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}

	$scope.setPlanGood = function(obj) {
		Plan.addGood(obj.CloudID).then(function(ret) {
			obj.good_cnt = parseInt(obj.good_cnt) + ret;
		});
	}
	$scope.setPlanFavor = function(obj) {
		Plan.addFavor(obj.CloudID).then(function(ret) {
			obj.favor = true;
		});
	}
}).controller('UserCtrl', function($scope, $http, $stateParams, Plan, User) {
	$scope.next_id = 0;
	$scope.list = [];
	$scope.userInfo = [];
	$scope.username = $stateParams.username;
	$scope.hasInfo = false;
	// 用户概况
	$scope.loadSummary = function() {
		User.getInfo($scope.username).then(function(data) {
			if (data != null) {
				$scope.userInfo = data;
			} else {
				$scope.hasInfo = true;
			}
		});
	}
	$scope.loadSummary();

	$scope.userhasInfo = function() {
		return $scope.hasInfo;
	}

	$scope.loadData = function() {
		User.getPlans($scope.username, $scope.next_id).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.next_id = data[data.length - 1].CloudID;
			} else {
				$scope.hasMoreData = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	}

	$scope.loadMore = function() {
		$scope.loadData();
	}
	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});

	// 判断是不是自己
	$scope.isMe = false;
	$scope.checkIsMe = function() {
		if (_userInfo.username == $scope.username) {
			$scope.isMe = true;
		}
	}
	$scope.checkIsMe();

	// 关注某人
	$scope.stared = false;
	$scope.addStar = function() {
		$scope.catalog = 1;
		User.addStar(_userInfo.username, $scope.username, $scope.catalog).then(function(status) {
			if (status == 1) {
				$scope.stared = true;
			}
		});
	}

	$scope.setPlanGood = function(obj) {
		Plan.addGood(obj.CloudID).then(function(ret) {
			obj.good_cnt = parseInt(obj.good_cnt) + ret;
		});
	}
	$scope.setPlanFavor = function(obj) {
		Plan.addFavor(obj.CloudID).then(function(ret) {
			obj.favor = true;
		});
	}
}).controller('PlanCtrl', function($scope, $http, $stateParams, Plan) {
	$scope.CloudID = $stateParams.CloudID;
	// 加载该图的信息
	$scope.loadRoom = function() {
		Plan.getInfo($scope.CloudID).then(function(data) {
			if (data != null) {
				$scope.room = data;
			}
		});
	}
	$scope.loadRoom();

	// 加载评论
	$scope.list = [];
	$scope.last_id = 0;
	$scope.loadData = function() {
		Plan.getComments($scope.CloudID, $scope.last_id).then(function(data) {
			if (data != null) {
				$scope.list.push.apply($scope.list, data);
				$scope.last_id = data[data.length - 1].id;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.hasMoreData = false;
			}
		});
	}
	// 加载评论
	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
	$scope.loadMore = function() {
		$scope.loadData();
	}

	$scope.hasMoreData = true;
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasMoreData;
	}

	$scope.setPlanGood = function(obj) {
		Plan.addGood(obj.CloudID).then(function(ret) {
			obj.good_cnt = parseInt(obj.good_cnt) + ret;
		});
	}
	$scope.setPlanFavor = function(obj) {
		Plan.addFavor(obj.CloudID).then(function(ret) {
			obj.favor = true;
		});
	}
	// 添加方案评论
	$scope.reply = {};
	$scope.name = _userInfo.name;
	$scope.reply.CloudID = $scope.CloudID;
	$scope.addReply = function() {
		Plan.addComment($scope.reply).then(function(data) {
			$scope.reply.content = "";
			$scope.list.push.apply($scope.list, data);
		});
	}
	// 回复某人
	$scope.replyTo = function(item) {
		$scope.reply.content = "@" + item.name + " ";
		var input = document.getElementById("input");
		input.focus();
	}
});
