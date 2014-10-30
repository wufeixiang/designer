// 定义全局的用户信息， 这里从后台获取
var _GLOBAL = {
	"api" : "http://m.yfway.com/MobileAPI/?s=/Mapi",
	"matchapi" : "http://cloud1.yfway.com/mmatch/?s=/Mapi",
};
angular.module('starter', ['ionic', 'myControllers', 'myFilters', 'myServices']).run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).config(function($httpProvider) {
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for (var p in obj) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}
	$httpProvider.defaults.headers.post = {
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tabs', {
		url : "/tab",
		abstract : true,
		templateUrl : "resource/views/menu.html",
		controller : 'AppCtrl'
	})
	// 个人中心
	.state('tabs.my', {
		url : "/my",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/my.html",
				controller : 'MyCtrl'
			}
		}
	})
	// 设置
	.state('tabs.mySetting', {
		url : "/mySetting",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/mySetting.html",
				controller : 'MySettingCtrl'
			}
		}
	}).state('tabs.myStar', {
		url : "/myStar",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myStar.html",
				controller : 'MyStarCtrl'
			}
		}
	}).state('tabs.myFavor', {
		url : "/myFavor",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myFavor.html",
				controller : 'MyFavorCtrl'
			}
		}
	}).state('tabs.myResource', {
		url : "/myResource",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myResource.html",
				controller : 'MyResourceCtrl'
			}
		}
	}).state('tabs.myResourceDetail', {
		url : "/myResourceDetail/:cid",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myResourceDetail.html",
				controller : 'MyResourceDetailCtrl'
			}
		}
	}).state('tabs.myMessage', {
		url : "/myMessage",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myMessage.html",
				controller : 'MyMessageCtrl'
			}
		}
	}).state('tabs.myComments', {
		url : "/myComments",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/myComments.html",
				controller : 'MyCommentsCtrl'
			}
		}
	})
	/* end 个人中心 */

	// 推荐
	.state('tabs.good', {
		url : "/good",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/good.html",
				controller : 'PlanGoodCtrl'
			}
		}
	})
	// 发现
	.state('tabs.explore', {
		url : "/explore",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/explore.html",
				controller : 'ExploreCtrl'
			}
		}
	})
	// 发现详细列表
	.state('tabs.exploreDetail', {
		url : "/exploreDetail/:type",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/exploreDetail.html",
				controller : 'ExploreDetailCtrl'
			}
		}
	})

	// 排行榜
	.state('tabs.rank', {
		url : "/rank",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rank.html",
				controller : 'RankCtrl'
			}
		}
	}).state('tabs.level', {
		url : "/rankLevel",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rankLevel.html",
				controller : 'RankLevelCtrl'
			}
		}
	}).state('tabs.rankPlan', {
		url : "/rankPlan",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rankPlan.html",
				controller : 'RankPlanCtrl'
			}
		}
	}).state('tabs.rankSignIn', {
		url : "/rankSignIn",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rankSignIn.html",
				controller : 'RankSignInCtrl'
			}
		}
	}).state('tabs.rankGood', {
		url : "/rankGood",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rankGood.html",
				controller : 'RankGoodCtrl'
			}
		}
	}).state('tabs.rankComment', {
		url : "/rankComment",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/rankComment.html",
				controller : 'RankCommentCtrl'
			}
		}
	})
	/* end 排行榜 */

	// 单个方案
	.state('tabs.plan', {
		url : "/plan/:CloudID",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/planDetail.html",
				controller : 'PlanCtrl'
			}
		}
	})
	// 用户
	.state('tabs.user', {
		url : "/user/:username",
		views : {
			'menuContent' : {
				templateUrl : "resource/views/user.html",
				controller : 'UserCtrl'
			}
		}
	});
	$urlRouterProvider.otherwise('/tab/my');
});

