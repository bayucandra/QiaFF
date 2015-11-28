/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerAppC',{
    extend:'Ext.app.ViewController',
    alias:'controller.UserManagerAppC',
    onUserCreate:function(th, e, opts){
	var win_user_input=this.createUserInputWindow();
	var form=win_user_input.down('form').getForm();
	form.reset();
	form.setValues({crud:'create'});
	win_user_input.setTitle('Create new user');
	win_user_input.center();
	win_user_input.show();
	var zindexmanager=win_user_input.zIndexManager;
	zindexmanager.bringToFront('UserManagerUserW');
    },
    onUserUpdate:function(th,rowIdx,colIdx){
	var rec = (th==='itemdblclick')?rowIdx:th.getStore().getAt(rowIdx);
	var win_user_input=this.createUserInputWindow();
	var form=win_user_input.down('form').getForm();
	form.reset();
	form.findField('password').allowBlank=true;
	form.findField('password_repeat').allowBlank=true;
	form.setValues({crud:'update', iduser:rec.get('iduser'), username:rec.get('username'),
	    iduser_group_old:rec.get('iduser_group'),iduser_group:rec.get('iduser_group'), fullname:rec.get('fullname'), email:rec.get('email')});
	win_user_input.setTitle('Edit User: '+rec.get('username'));
	win_user_input.center();
	win_user_input.show();
	var zindexmanager=win_user_input.zIndexManager;
	zindexmanager.bringToFront('UserManagerUserW');
    },
    onUserDestroy:function(th,rowIdx,colIdx){
	var rec=th.getStore().getAt(rowIdx);
	Ext.Msg.confirm("Confirm?","Are you sure to delete User name: "+rec.get('username')+'?',
	    function(answer){
		if(answer==='yes'){
		    th.up('grid').setLoading('Deleting selected user');
		    Ext.Ajax.request({
			url:'resources/php/crud/user_manager_crud.php',
			params:{
			    section:'user',
			    crud:'destroy',
			    iduser:rec.get('iduser')
			},
			success:function(response, opts){
			    th.up('grid').setLoading(false);
			    var ret_obj=Ext.decode(response.responseText);
			    if(ret_obj.success){
				Ext.getStore('UserManagerUserS').reload();
			    }else{
				Ext.Msg.show({
				    title:'Error destroy data record',
				    msg:'There was error when trying to destroy selected data record: '+ret_obj.error_msg
				});
			    }
			}
		    });
		}
	    }
	);
    },
    createUserInputWindow:function(){
	var win_user_input=Ext.getCmp('UserManagerUserW');
	if(bisnull(win_user_input)){
	    var ViewClass=Ext.ClassManager.get('B.view.app.user.UserManagerUserW');
	    win_user_input=new ViewClass();
	    Ext.getCmp('DesktopPanel').add(win_user_input);
	}
	return win_user_input;
    },
    onRevokeCreate:function(){
	var grid_user=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-user]');
	var grid_group_privilege=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-group-privilege]');
	if(grid_user){
	    if(grid_user.getSelectionModel().hasSelection()){
		if(!grid_group_privilege.getSelectionModel().hasSelection()){
		    Ext.Msg.show({
			title:'Error, no record selected',
			msg:'Please select record of \'Group privilege\' to revoke',
			buttons:Ext.Msg.OK,
			icon:Ext.Msg.ERROR
		    });
		    return;
		}
	    }else{
		Ext.Msg.show({
		    title:'Error: no record selected',
		    msg:'Please select record of \'User\' to revoke',
		    buttons:Ext.Msg.OK,
		    icon:Ext.Msg.ERROR
		});
		return;
	    }
	}else{
	    Ext.Msg.show({
		title:'Error: component not exist',
		msg:'Error, grid of user is not exist',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	    return;
	}
	var record_user=grid_user.getSelectionModel().getSelection()[0];
	var iduser=record_user.get('iduser');
	
	var record_group_privilege=grid_group_privilege.getSelectionModel().getSelection()[0];
	var privilege=record_group_privilege.get('privilege');
	
	var mask=new Ext.LoadMask({
	    target:grid_group_privilege,
	    msg:'Revoking privilege, please wait...'
	});
	mask.show();
	Ext.Ajax.request({
	    url:'resources/php/crud/user_manager_crud.php',
	    params:{
		section:'group_priv_rev',
		crud:'create',
		iduser:iduser,
		privilege:privilege
	    },
	    success:function(response,opts){
		mask.hide();
		var obj=Ext.decode(response.responseText);
		if(!obj.success){
		    Ext.Msg.show({
			title:'Error insert data',
			msg:'There was error when try to revoking privilege:'+obj.error_msg,
			buttons:Ext.Msg.OK,
			icon:Ext.Msg.ERROR
		    });
		}else{
		    Ext.getStore('UserManagerGroupPrivS').reload();
		}
	    }
	});
    },
    onRevokeDestroy:function(){
	var grid_group_privilege_revoke=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-group-privilege-revoke]');
	if(!grid_group_privilege_revoke.getSelectionModel().hasSelection()){
	    Ext.Msg.show({
		title:'Error: no record selected',
		msg:'Please select record to delete from revoke list',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	    return;
	}
	var grid_user=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-user]');
	var record_user=grid_user.getSelectionModel().getSelection()[0];
	var iduser=record_user.get('iduser');
	
	var record_group_privilege_revoke=grid_group_privilege_revoke.getSelectionModel().getSelection()[0];
	var privilege=record_group_privilege_revoke.get('privilege_revoke');
	var mask= new Ext.LoadMask({
	    target:grid_group_privilege_revoke,
	    msg:'Removing selected record from privilege revoked...'
	});
	mask.show();
	Ext.Ajax.request({
	    url:'resources/php/crud/user_manager_crud.php',
	    params:{
		section:'group_priv_rev',
		crud:'destroy',
		iduser:iduser,
		privilege:privilege
	    },
	    success:function(response, eopts){
		mask.hide();
		var obj=Ext.decode(response.responseText);
		if(!obj.success){
		    Ext.Msg.show({
			title:'Error delete data',
			msg:'There was error when deleting data from privilege revoke table:'+obj.error_msg,
			buttons:Ext.Msg.OK,
			icon:Ext.Msg.ERROR
		    });
		}else{
		    Ext.getStore('UserManagerGroupPrivS').reload();
		}
	    }
	});
    },
    onUserPrivCreate:function(btn){
	var win_user_input=this.createUserPrivWindow();
	win_user_input.center();
	var grid_user=Ext.getCmp('UserManagerApp').down('grid[itemId=grid-user]');
	var selected_user=grid_user.getSelectionModel().getSelection()[0];
	if(selected_user.get('groupname')==='root'){
	    Ext.Msg.show({
		title:'Useless action',
		msg:'The group of username: '+selected_user.get('username')+' is "root". "root" group already has all privilege.',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	    return;
	}
	if(grid_user.getSelectionModel().hasSelection()){
	    win_user_input.setTitle('Add Privilege for username: '+selected_user.get('username'));
	    win_user_input.show();
	    var zindexmanager=win_user_input.zIndexManager;
	    zindexmanager.bringToFront('UserManagerUserPrivW');
	}else{
	    Ext.Msg.show({
		title:'Error',
		msg:'Please select user record to Add/Edit user privilege',
		buttons:Ext.Msg.OK,
		icon:Ext.Msg.ERROR
	    });
	    return;
	}
    },
    onUserPrivDestroy:function(th, rowIdx, colIdx){
	var rec=th.getStore().getAt(rowIdx);
	Ext.Msg.confirm("Confirm?","Are you sure to delete privilege: "+rec.get('privilege_user')+'?',
	    function(answer){
		if(answer==='yes'){
		    th.up('grid').setLoading('Deleting selected user privilege');
		    Ext.Ajax.request({
			url:'resources/php/crud/user_manager_crud.php',
			params:{
			    section:'user_priv',
			    crud:'destroy',
			    iduser:rec.get('iduser'),
			    privilege:rec.get('privilege_user')
			},
			success:function(response, opts){
			    th.up('grid').setLoading(false);
			    var ret_obj=Ext.decode(response.responseText);
			    if(ret_obj.success){
				Ext.getStore('UserManagerUserPrivS').reload();
			    }else{
				Ext.Msg.show({
				    title:'Error destroy data record',
				    msg:'There was error when trying to destroy selected data record: '+ret_obj.error_msg
				});
			    }
			},
			failure:function(response, opts){
			    th.up('grid').setLoading(false);
			    Ext.Msg.show({
				title:'Error code: '+response.status,
				msg:'Server error: '+response.statusText,
				buttons:Ext.Msg.OK,
				icon:Ext.Msg.ERROR
			    });
			}
		    });
		}
	    }
	);
    },
    createUserPrivWindow:function(){
	var win_user_input=Ext.getCmp('UserManagerUserPrivW');
	if(bisnull(win_user_input)){
	    var ViewClass=Ext.ClassManager.get('B.view.app.user.UserManagerUserPrivW');
	    win_user_input=new ViewClass();
	    Ext.getCmp('DesktopPanel').add(win_user_input);
	}
	return win_user_input;
    }
});