module.exports = {
	routes: {
		'': 'index',
		'index':'index',
		'user_login':'user_login',
		'user_logout': 'user_logout',
		'add_ads': 'add_ads',
		'ads_list/:uid': 'ads_list',
		'ads_statstics': 'ads_statstics',
		'add_user':'add_user',
		'add_enterprice': 'add_enterprice',
		'list_enterprice': 'list_enterprice'
	},
	port: 3000,
	post: {
		'add_user': 'add_user',
		'user_login': 'user_login',
		'list_enterprice': 'list_enterprice',
		'add_enterprice': 'add_enterprice'
	},
	mongo: {
		host:'localhost',
		db: 'ads'
	},
	session: {
		db: 'ad_session_db',
		ip: 'localhost',
		port: 27017,
	}
}