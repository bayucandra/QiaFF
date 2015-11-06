/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.controller.Root',{
    extend: 'Ext.app.Controller',
    requires:[
	'B.view.login.LoginV',
	'B.view.main.Main'
    ],
    onLaunch:function(){
	Ext.Ajax.request({
	    url:'resources/php/ajax_session.php',
	    params:{
		act:'get'
	    },
	    scope:this,
	    success:function(response,opts){
		var obj=Ext.decode(response.responseText);
		if(!bisnull(obj.iduser)){
		    Ext.widget('app-main');
		}else{
		    Ext.widget('LoginV');
		}
	    }
	});
	
	var bloading_indicator=document.getElementById('bloading_indicator');
	bloading_indicator.parentNode.removeChild(bloading_indicator);
    },
    logout:function(){
	
	var mask=new Ext.LoadMask({
	    target:Ext.getCmp('app-main'),
	    msg:'Loging out, please wait...'
	});
	mask.show();
	Ext.WindowManager.each(function(comp){
	    var xtype=comp.getXType();
	    var is_app = xtype.substr(xtype.length-3).toLowerCase()==='app'? true:false;
	    if(is_app){
		comp.close();
	    }
	});
	Ext.Ajax.request({
	    url:'resources/php/ajax_session.php',
	    params:{
		act:'destroy'
	    },
	    scope:this,
	    success:function(){
		mask.hide();
		Ext.getCmp('app-main').destroy();
		Ext.widget('LoginV');
	    }
	});
    },
    getSession:function(){
	Ext.Ajax.request({
	    url:'resources/php/ajax_session.php',
	    params:{
		act:'get'
	    },
	    scope:this,
	    success:function(response,opts){
		var obj=Ext.decode(response.responseText);
		return obj;
	    }
	});
    }
});