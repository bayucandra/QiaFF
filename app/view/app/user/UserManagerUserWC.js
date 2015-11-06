/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserWC',{
    extend:'Ext.app.ViewController',
    alias:'controller.UserManagerUserWC',
    onSubmit:function(btn){
	var form=btn.up('window').down('form').getForm();
	var form_values=form.getValues(false,false,false,true);
	//BEGIN CUSTOM VALIDATION==============
	form.findField('password_repeat').clearInvalid();
	form.findField('password_repeat').setValidation(true);
	if(form_values.password!==form_values.password_repeat){
	    form.findField('password_repeat').markInvalid('Password repeat doesn\'t match.');
	    form.findField('password_repeat').setValidation('Password repeat doesn\'t match.');
	}
	//END CUSTOM VALIDATION================
	if(form.isValid()){
	    form.submit({
		url:'resources/php/crud/user_manager_crud.php',
		waitMsg:'Submitting user data...',
		success:function(form,action){
		    if(!action.result.success){
			Ext.Msg.show({
			    title:'Error: DB error',
			    msg:'Message: '+action.result.error_msg,
			    buttons:Ext.Msg.OK, icon:Ext.Msg.ERROR
			});
		    }else{
			Ext.getCmp('UserManagerUserW').close();
			Ext.getStore('UserManagerUserS').reload();
		    }
		},
		failure:function(form,action){
		    var msg_str='';
		    switch (action.failureType) {
			case Ext.form.action.Action.CLIENT_INVALID:
			    msg_str='Form fields may not be submitted with invalid values';
			    break;
			case Ext.form.action.Action.CONNECT_FAILURE:
			    msg_str='Ajax communication failed';
			    break;
			case Ext.form.action.Action.SERVER_INVALID:
			    msg_str=action.result.message;
		    }
		    var obj_response = Ext.decode(action.response.responseText);
		    if(!obj_response.success){
			msg_str=msg_str+obj_response.error_msg;
		    }
		    Ext.Msg.show({
			title:'Failure of submission',
			msg:msg_str,
			icon:Ext.Msg.ERROR,
			buttons:Ext.Msg.OK
		    });
		}
	    });
	}else{
	    Ext.Msg.show({
		title:'Error: form not valid',
		msg:'Please check field marked with red',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	}
    }
});