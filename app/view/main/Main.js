Ext.define('B.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    scrollable:false,
    requires: [
        'B.view.main.MainC',
        'B.view.main.MainModel',
	'B.view.main.DesktopV',
	'B.view.main.MainMenuV',
	//STORES===================
	'B.view.main.DesktopS',
	'B.view.app.config.ConfigS',
	'B.view.app.user.UserManagerUserS',
	'B.view.app.user.UserManagerGroupPrivS',
	'B.view.app.user.UserManagerGroupPrivRevS',
	'B.view.app.user.UserManagerUserPrivS',
	'B.view.app.user.UserGroupS',
	'B.store.PrivilegeS'
    ],

    id: 'app-main',
    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    initComponent:function(){
	//BEGIN STORES===============================
	    Ext.create('B.view.main.DesktopS');
	    Ext.create('B.view.app.config.ConfigS');
	    Ext.create('B.view.app.user.UserManagerUserS');
	    Ext.create('B.view.app.user.UserManagerGroupPrivS');
	    Ext.create('B.view.app.user.UserManagerGroupPrivRevS');
	    Ext.create('B.view.app.user.UserManagerUserPrivS');
	    Ext.create('B.view.app.user.UserGroupS');
	    Ext.create('B.store.PrivilegeS');
	//END STORES***************************
	//BEGIN APPLICATION LIST============================
	    Ext.getStore('DesktopS').add({app_name:'Product',app_id:'Product'});
	    Ext.getStore('DesktopS').add({app_name:'Costing',app_id:'Costing'});
	//END APPLICATION LIST**********************
	Ext.getStore('PrivilegeS').load();
	this.callParent();
    },

    items: [{
	xtype: 'panel',
	id:'DesktopPanel',
	region:'center',
	layout: 'fit',
	items:[{
	    xtype: 'DesktopV'
	}]
    },{
	xtype:'toolbar',
	id:'BTaskbar', padding:'3 3 3 2',
	region:'south',
	height:35,
	clock:null,
	items:[
	    {
		xtype:'button',text:'Start', width:80, enableToggle:false,
		tooltip:'Start menu',tooltipType:'title',
		controller: 'main',
		icon:'resources/bimages/btn-icons/def_start.png',
		menu:[{
		    xtype:'panel',
		    id:'main-menu',
		    layout:{
			type:'hbox'
		    },
		    bodyPadding:'10 5 10 5',
		    title:'-',
		    items:[
			{xtype:'MainMenuV'},
			{xtype:'container', layout:{type:'vbox'}, flex:1, margin:'0 0 0 10',
			    defaults:{
				    bodyPadding:3
			    },
			    items:[
				{
				    xtype:'panel',flex:1,layout:'vbox',
				    itemId:'config_panel',
				    requires:[
					'B.view.main.MainMenuC'
				    ],
				    controller:'MainMenuC',
				    defaults:{
					xtype:'button',
					style:{border:0,backgroundColor:'none',background:'none',color:'#000000'},
					componentCls:'btn-special',
					handler:'onClick'
				    },
				    items:[
					{text:'config',app_name:'Config',app_id:'Config', icon:'resources/bimages/apps/Config-16.png'}
				    ],
				    listeners:{
					afterrender:function(th,opts){
					    if(Ext.getStore('PrivilegeS').hasPrivilegeOf('user_manager')){
						th.add({text:'User Manager', app_name:'UserManager', app_id:'UserManager',
						    icon:'resources/bimages/apps/UserManager-16.png'});
					    }
					}
				    }
				},
				{xtype:'button', text:'Logout', handler:'onLogout', icon:'resources/bimages/btn-icons/logout-18.png'}
			    ]
			}
		    ],
		    listeners:{
			afterrender:function(th, opts){
			    Ext.Ajax.request({
				url:'resources/php/ajax_session.php',
				params:{
				    act:'get'
				},
				scope:this,
				success:function(response,opts){
				    var obj=Ext.decode(response.responseText);
				    th.setTitle(obj.fullname);
				}
			    });
			}
		    }
		}]
	    },
	    '-',
	    {xtype:'tbfill'},
	    {xtype:'button',width:30, tooltip:'Full screen', tooltipType:'title',
		handler:function(){bfull_screen(document.documentElement);},
		style:{
		    backgroundImage:"url('resources/bimages/btn-icons/full_screen.png')",
		    backgroundRepeat:'no-repeat', backgroundPosition:'center center', border:'none', backgroundColor:'none'
		}
	    },
	    {xtype:'component',html:'<div id="clock" style="width:90px; text-align:right;">-</div>'}
	],
	listeners:{
	    afterrender:function(th,opts){
		var updateClock = function () {
		    Ext.fly('clock').setHtml(Ext.Date.format(new Date(), 'g:i:s A'));
		};

		    th.clock = new Ext.util.TaskRunner();
		    th.clock.start({
			run: updateClock,
			interval: 1000
		    });
	    },
	    beforedestroy:function(th,opts){
		th.clock.destroy();
	    }
	}
    }]
//    listeners:{
//	afterrender:function(th, opts){
//	    Ext.Ajax.request({
//		url:'resources/php/ajax_session.php',
//		params:{
//		    act:'get'
//		},
//		success:function(response,opts){
//		    var obj=Ext.decode(response.responseText);
//		}
//	    });
//	}
//    }
});
