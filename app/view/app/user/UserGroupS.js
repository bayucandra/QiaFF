/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserGroupS',{
    extend:'Ext.data.Store',
    storeId:'UserGroupS',
    requires:['B.view.app.user.UserGroupM'],
    model:'B.view.app.user.UserGroupM',
    autoLoad:true,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/user_manager_crud.php?section=user_group&&crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    }
});