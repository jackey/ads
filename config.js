module.exports = {
	routes: {
		'': 'index',
		'home':'index',
		'login':'user_login',
		'logout': 'user_logout',
		'add_ads': 'add_ads',
		'my_ads_list/:uid': 'ads_list',
		'ads_statistics': 'ads_statstics',
		'add_user':'add_user'
	},
	port: 3000,
	post: {
		'add_user': 'add_user'
	},
	mongo: {
		host:'localhost',
		db: 'ads'
	}
}