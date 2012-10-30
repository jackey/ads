Ext.onReady(function () {
	var header = Ext.create('Ext.panel.Panel', {
		layout: 'border',
		html: 'header',
		width: '100%',
		height: 135,
		region: 'north'
	});

	function homeLinkClickHandler() {
		console.log(arguments);
	}

	var menu = Ext.create('Ext.panel.Panel', {
		layout:'border',
		width: '30%',
		margin: '0 5 0 0',
		height: 800,
		region: 'west',
		title: '导航',
		resize: true,
		collapsible: true,
		items: [
			Ext.create('Ext.menu.Menu', {
			    width: '100%',
			    margin: '0 0 10 0',
			    region: 'center',
			    floating: false,  // usually you want this set to True (default)
			    renderTo: Ext.getBody(),  // usually rendered by it's containing component
			    items: [{
			        text: '首页',
			        handler: function () {
			        	Ext.Msg.alert("Home", 'Clicked');
			        }
			    },{
			        text: '发布广告'
			    },{
			        text: '账户设置'
			    }]
			}),
		]
	})

	var content = Ext.create('Ext.panel.Panel', {
		layout: 'border',
		width: '68%',
		region: 'center',
		height: 800,
		html: 'hello world'
	});

	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [header, menu],
		width: '100%',
	});

});