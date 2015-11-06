/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.login.LoginC',{
    extend:'Ext.app.ViewController',
    requires:[
	'B.view.main.Main'
    ],
    id:'LoginC',
    alias:'controller.LoginC',
    onLogin:function(){
	var form=this.getView().down('form');
	var form_values=form.getValues(false,false,false,true);
	
	var mask=new Ext.LoadMask({
	    target:Ext.getCmp('LoginV').down('panel'),
	    msg:"Loging in, please wait..."
	});
	mask.show();
	Ext.Ajax.request({
	    url:'resources/php/user.php',
	    scope:this,
	    params:{
		    login:true,
		    username:form_values.username,
		    password:form_values.password
	    },
	    success:function(response,opts){
		mask.hide();
		var obj=Ext.decode(response.responseText);
		var success=obj.success;
		var iduser=obj.iduser;
		var username=obj.username;
		var fullname=obj.fullname;
		var error_msg=obj.error_msg;
		if(success===false){
		    Ext.Msg.show({
			title:'Invalid login',
			message:error_msg,
			buttons:Ext.Msg.OK,
			icon:Ext.Msg.ERROR
		    });
		}else{
		    var main_app=Ext.widget('app-main');
		    main_app.getViewModel().set('fullname',fullname);
		    this.getView().destroy();
		}
	    },
	    failure:function(response,opts){
		Ext.Msg.alert("Error","Error when loging in.");
	    }
	});
    },
    onSpecialKey:function(field, e){
	if(e.getKey()===e.ENTER){
	    this.onLogin();
	}
    }
});