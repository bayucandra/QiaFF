/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserS',{
    extend:'Ext.data.Store',
    storeId:'UserManagerUserS',
    requires:[
	'B.view.app.user.UserManagerUserM'
    ],
    model:'B.view.app.user.UserManagerUserM',
    autoLoad:false,
    autoSync:true,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/user_manager_crud.php?section=user&&crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    },
    listeners:{
	load:function(th, record, success, eopts){
	    Ext.getStore('UserManagerGroupPrivS').reload();
	    Ext.getStore('UserManagerUserPrivS').reload();
	}
    }
});