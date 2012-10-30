Ext.onReady(function () {
	var header = Ext.create('Ext.panel.Panel', {
		layout: 'border',
		html: 'header',
		width: '100%',
		height: 135,
		region: 'north'
	});

	var menu = Ext.create('Ext.panel.Panel', {
		layout:'border',
		width: '30%',
		height: 800,
		region: 'west',
		floating: false,
		items: [
			Ext.create('Ext.menu.Menu', {
			    width: '100%',
			    margin: '0 0 10 0',
			    region: 'center',
			    floating: false,  // usually you want this set to True (default)
			    renderTo: Ext.getBody(),  // usually rendered by it's containing component
			    items: [{
			        text: 'regular item 1'
			    },{
			        text: 'regular item 2'
			    },{
			        text: 'regular item 3'
			    }]
			}),
		]
	})

	Ext.create('Ext.container.Viewport', {
		layout: 'border',
		items: [header, menu],
		width: '100%',
	});

});