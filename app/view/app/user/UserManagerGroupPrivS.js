/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerGroupPrivS',{
    extend:'Ext.data.Store',
    storeId:'UserManagerGroupPrivS',
    requires:[
	'B.view.app.user.UserManagerGroupPrivM'
    ],
    model:'B.view.app.user.UserManagerGroupPrivM',
    autoLoad:false,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/user_manager_crud.php?section=group_priv&&crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    },
    listeners:{
	load:function(th, record, success, eopts){
	    Ext.getStore('UserManagerGroupPrivRevS').reload();
	}
    }
});