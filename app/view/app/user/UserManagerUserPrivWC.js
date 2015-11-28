/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserPrivWC',{
    extend:'Ext.app.ViewController',
    alias:'controller.UserManagerUserPrivWC',
    onAfterrender:function(th,opt){
	var grid_user=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-user]');
	var selected_record=grid_user.getSelectionModel().getSelection()[0];
	var iduser=selected_record.get('iduser');
	th.down('form').getForm().setValues({iduser:iduser});
    },
    onSubmit:function(btn){
	var form=btn.up('window').down('form').getForm();
	var form_values=form.getValues(false,false,false,true);
	//BEGIN CUSTOM VALIDATION=======================
	var is_valid_custom=true;
	if(bisnull(form_values.crud) || bisnull(form_values.iduser)){
	    is_valid_custom=false;
	}
	//END CUSTOM VALIDATION**************************
	if(is_valid_custom){
	    if(form.isValid()){
		form.submit({
		    url:'resources/php/crud/user_manager_crud.php',
		    waitMsg:'Submitting privilege data...',
		    success:function(form, action){
			if(!action.result.success){
			    Ext.Msg.show({
				title:'Error: DB error',
				msg:'Message: '+action.result.error_msg,
				buttons:Ext.Msg.OK, icon:Ext.Msg.ERROR
			    });
			}else{
			    Ext.getCmp('UserManagerUserPrivW').close();
			    Ext.getStore('UserManagerUserPrivS').reload();
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
	    }
	}else{
	    Ext.Msg.show({
		title:'System Error',
		msg:'There is form error(System error)',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	}
    }
});