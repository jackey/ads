Ext.onReady(function () {
	var header = Ext.create('Ext.panel.Panel', {
		layout: 'border',
		width: '100%',
		height: 135,
		region: 'north',
		contentEl: 'header'
	});

	var ad_statistics_data = {
		name: 'Jackey',
		title: 'Jackey ad statistics',
	};

	var ad_statistics_tpl = new Ext.XTemplate(
		"<h1>Name: {name}</h1>"
	);

	var content = Ext.create("Ext.panel.Panel", {
		title: '我的广告数据和状态',
		width: '100%',
		region: 'center',
		id: 'ad_content_region'
	});

	var statistics_win = Ext.create('Ext.panel.Panel', {
		title: '我的广告数据和状态',
		height: 350,
		width: 600,
		minWidth: 200,
		minHeight: 100,
		layout: 'fit',
		id: 'statistics_window',
		html: ad_statistics_tpl.apply(ad_statistics_data),
		buttons: [
			{text: 'Close', 
			handler: function () {
				content.remove('statistics_window', false);
			}}
		],
		listeners: {
			afterlayout: function (container, layout, e) {
				statistics_win.center();
			}
		}
	});

	var menu = Ext.create('Ext.panel.Panel', {
		layout:'border',
		width: '30%',
		margin: '0 5 0 0',
		height: 800,
		region: 'west',
		title: '导航',
		resize: true,
		items: [
			Ext.create('Ext.menu.Menu', {
			    width: '100%',
			    margin: '0 0 10 0',
			    region: 'center',
			    floating: false,  // usually you want this set to True (default)
			    renderTo: Ext.getBody(),  // usually rendered by it's containing component
			    items: [{
			        text: '广告状态',
			        handler: function (item, event) {
			        	content.setTitle("我的广告数据和状态");
			        	content.add(statistics_win);
			        	content.doLayout();
			        }
			    },{
			        text: '发布广告',
			        handler: function (item, event) {
			        	content.setTitle("发布新广告");
			        	content.remove('statistics_window', false);
			        }
			    },{
			        text: '账户设置',
			        handler: function (item, event) {
			        	content.setTitle("设置我的账户");
			        	content.remove('statistics_window', false);
			        }
			    }]
			}),
		]
	});

	var viewport = Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [header, menu, content],
		width: '100%',
	});

});