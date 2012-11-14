module.exports = {
	routes: {
		'/': 'index',
		'login':'user_login',
		'logout': 'user_logout',
		'add_ads': 'add_ads',
		'my_ads_list/:uid': 'ads_list',
		'ads_statistics': 'ads_statstics',
		'add_user':'user_add'
	},
	port: 3000,
	post: {

	}
}