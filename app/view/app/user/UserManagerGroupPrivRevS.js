/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerGroupPrivRevS',{
    extend:'Ext.data.Store',
    storeId:'UserManagerGroupPrivRevS',
    requires:[
	'B.view.app.user.UserManagerGroupPrivRevM'
    ],
    model:'B.view.app.user.UserManagerGroupPrivRevM',
    autoLoad:false,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/user_manager_crud.php?section=group_priv_rev&&crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    }
});