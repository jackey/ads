module.exports = {
	routes: {
		'': {
			'handler':'index',
			'permissions': ["user_is_logined"]
		},
		'index': {
			'handler': 'index',
			"permissions": ["user_is_logined"],
		},
		'user_login': {
			'handler': 'user_login',
			"permissions": ["access_content"],
		},
		'user_logout': {
			'handler': 'user_logout'
		},
		'add_ads': {
			'handler':'add_ads'
		},
		'ads_list/:uid': {
			'handler':'ads_list'
		},
		'ads_statstics': {
			'handler':'ads_statstics'
		},
		'add_user': {
			'handler': 'add_user',
			'permissions': ['add_user'],
		},
		'add_enterprice': {
			'handler': 'add_enterprice',
			"permissions": ["add_enterprice"]
		},
		'list_enterprice': {
			'handler': 'list_enterprice',
			"permissions": ["access_enterprice_list"]
		},
		'user_accessdeny': {
			'handler': 'user_accessdeny',
			'permissions': ["all_time"]
		}
	},
	port: 3000,
	post: {
		'add_user': {
			'handler':'add_user'
		},
		'user_login': {
			'handler':'user_login'
		},
		'list_enterprice': {
			'handler':'list_enterprice'
		},
		'add_enterprice': {
			'handler':'add_enterprice'
		}
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