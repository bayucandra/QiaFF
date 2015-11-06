/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.store.PrivilegeS',{
    extend:'Ext.data.Store',
    storeId:'PrivilegeS',
    requires:[
	'B.store.PrivilegeM'
    ],
    model:'B.store.PrivilegeM',
    autoLoad:true,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/privilege_crud.php?crud=read'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    },
    hasPrivilegeOf:function(pStrPriv){
	var ret=false;
	this.each(function(record,idx){
	    if(record.get('privilege')===pStrPriv){
		ret=true;
	    }
	});
	return ret;
    }
});