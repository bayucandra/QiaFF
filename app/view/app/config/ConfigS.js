/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.config.ConfigS',{
    extend:'Ext.data.Store',
    storeId:'ConfigS',
    requires:[
	'B.view.app.config.ConfigM'
    ],
    model:'B.view.app.config.ConfigM',
    autoLoad:false,
    autoSync:true,
    proxy:{
	type:'ajax',
	api:{
	    read:'resources/php/crud/config_crud.php?crud=read',
	    update:'resources/php/crud/config_crud.php?crud=update'
	},
	reader:{
	    type:'json',
	    rootProperty:'data'
	}
    },
    listeners:{
	beforesync:function(options, opts){
	    var view=Ext.getCmp('ConfigApp');
	    if(view){
		view.mask("Saving data, please wait...");
	    }
	},
	write:function(store, operation, opts){
	    var state=operation.wasSuccessful();
	    
	    var view=Ext.getCmp('ConfigApp');
	    if(view){
		view.unmask();
		if(state){
//		    Ext.Msg.alert("success", "Data saved.");
		}else{
		    Ext.Msg.show({
			title:'Error', msg:'There is error when saving data', icon:Ext.Msg.ERROR, buttons:Ext.Msg.OK
		    });
		}
	    }
	}
    }
});