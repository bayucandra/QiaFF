/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerApp',{
    extend:'B.view.widget.BWindow',
    id:'UserManagerApp',
    requires:[
	'B.view.app.user.UserManagerAppC',
	'B.view.app.user.UserManagerUserW',
	'B.view.app.user.UserManagerUserPrivW'
    ],
    width:'80%', height:'80%',
    last_size:[],
    last_pos:[],
    alias:'widget.UserManagerApp',
    layout:{
	type:'border'
    },
    bodyPadding:'2 1 0',
    defaults:{border:false},
    items:[
	{
	    title:'User',
	    region:'west', width:250, split:true, collapsible:false, minWidth: 100,
	    defaults:{border:false},
	    layout:'fit',
	    items:[{
		xtype:'grid',
		itemId:'grid-user',
		controller:'UserManagerAppC',
		margin:'0 5 0 0',
		flex:1,
		store:'UserManagerUserS',
		tbar:[
		    {text:'Add', handler:'onUserCreate', iconCls:'def_btn_new'}
		],
		columns:{
		    defaults:{
			dragable:false, hideable:false, sortable:false
		    },
		    items:[
			{xtype: 'rownumberer'},
			{xtype:'actioncolumn',width:60, sortable:false, menuDisabled:true, resizable:false,
			    items:[
				{ iconCls:'def_btn_edit', tooltip:'Edit User', handler:'onUserUpdate'},
				{ xtype: 'tbspacer' },
				{ iconCls:'def_btn_delete', tooltip:'Delete user', handler:'onUserDestroy'}
			    ]
			},
			{text:'User Name', dataIndex:'username'}, {text:'Group', dataIndex:'groupname'},
			{text:'Full Name', dataIndex:'fullname'},{text:'Email', dataIndex:'email', width:150}
		    ]
		},
		listeners:{
		    select:function(th,record,idx,opts){
			var iduser={iduser:record.get('iduser')};
			var group_priv_store=Ext.getStore('UserManagerGroupPrivS');
			group_priv_store.getProxy().extraParams=iduser;
			group_priv_store.load();
			Ext.getCmp('UserManagerApp').down('grid[itemId=grid-group-privilege]').setTitle('Group privilege of: '+record.get('groupname'));
			var group_priv_rev_store= Ext.getStore('UserManagerGroupPrivRevS');
			group_priv_rev_store.getProxy().extraParams={iduser:iduser};
			group_priv_rev_store.load();
			Ext.getCmp('UserManagerApp').down('grid[itemId=grid-user-privilege]').setTitle('Privilege of user: '+record.get('username'));
			var user_priv_store= Ext.getStore('UserManagerUserPrivS');
			user_priv_store.getProxy().extraParams={iduser:iduser};
			user_priv_store.load();
		    },
		    itemdblclick:function(th,rc,itm,idx,e,opts){
			this.getController('UserManagerAppC').onUserUpdate('itemdblclick',rc,itm);
		    }
		}
	    }]
	},{
	    region:'center',
	    defaults:{border:false},
	    layout:{
		type:'vbox',
		align:'stretch'
	    },
	    items:[
		{
		    xtype:'panel',
		    flex:1,
		    controller:'UserManagerAppC',
		    defaults:{
			header: {
			    titleAlign: "center"
			}
		    },
		    layout:{
			type:'hbox',
			align:'stretch'
		    },
		    items:[
			{
			    xtype:'grid',
			    title:'Group Privilege',
			    itemId:'grid-group-privilege',
			    flex:1, emptyText:'No User is selected. No Privilege of group to display.',
			    store:'UserManagerGroupPrivS',
			    header: {
				titleAlign: "left"
			    },
			    columns:{
				defaults:{
				    dragable:false, hideable:false, sortable:false
				},
				items:[
				    {xtype: 'rownumberer'},
				    {text:'Privilege',dataIndex:'privilege',flex:1}
				]
			    }
			},{
			    xtype:'container',
			    layout:'center',
			    width:30,height:'100%',
			    items:[
				{
				    xtype:'panel',
				    layout:{
					type:'vbox'
				    },
				    items:[
					{xtype:'button',text:'>',tooltip:'Add to revoke list',handler:'onRevokeCreate'},
					{xtype:'button',text:'<',tooltip:'Remove from revoke list',margin:'5 0 0 0', handler:'onRevokeDestroy'}
				    ]
				}
			    ]
			},
			{
			    xtype:'grid',
			    title:'Group Privilege revoke',
			    itemId:'grid-group-privilege-revoke',
			    flex:1, emptyText:'There is no record to display',
			    store:'UserManagerGroupPrivRevS',
			    header: {
				titleAlign: "left"
			    },
			    columns:{
				defaults:{dragable:false, hideable:false, sortable:false},
				items:[
				    {xtype:'rownumberer'},
				    {text:'Privilege revoked', dataIndex:'privilege_revoke',flex:1}
				]
			    }
			}
		    ]
		},
		{
		    xtype:'grid',
		    flex:1, emptyText:'There is no record to display',
		    itemId:'grid-user-privilege',
		    store:'UserManagerUserPrivS',
		    controller:'UserManagerAppC',
		    header: {
			titleAlign: "left"
		    },
		    title:'User Privilege',
		    tbar:[
			{text:'Add', handler:'onUserPrivCreate', iconCls:'def_btn_new'}
		    ],
		    columns:{
			defaults:{dragabel:false,hideable:false,sortable:false},
			items:[
			    {xtype:'rownumberer'},
			    {text:'User Privilege',dataIndex:'privilege_user',width:300},
			    {xtype:'actioncolumn', width:60, sortable:false, menuDisabled:true, resizeable:false,
				items:[
				    {iconCls:'def_btn_delete', tooltip:'Delete User', handler:'onUserPrivDestroy'}
				]
			    }
			]
		    }
		}
	    ]
	}
    ],
    listeners:{
	afterrender:function(th,opt){
	    Ext.getStore('UserManagerUserS').load({
		scope:this,
		callback: function(rec, operation, success){
		    th.down('grid[itemId=grid-user]').getSelectionModel().select(0);
		}
	    });
	    Ext.getStore('UserGroupS').load();

	}
    }
});