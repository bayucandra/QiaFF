/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserPrivS',{
    extend:'Ext.data.Store',
    storeId:'UserManagerUserPrivS',
    requires:['B.view.app.user.UserManagerUserPrivM'],
    model:'B.view.app.user.UserManagerUserM',
    autoLoad:false,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/user_manager_crud.php?section=user_priv&&crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    }
});