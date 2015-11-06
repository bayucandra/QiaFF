/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserW',{
    extend:'B.view.widget.BWindowInput',
    id:'UserManagerUserW',
    width:300,
    requires:[
	'B.view.app.user.UserManagerUserWC',
	'Ext.form.*'
    ],
    controller:'UserManagerUserWC',
    items:[
	{
	    xtype:'form',
	    frame:false,
	    defaults:{
		anchor:'100%', labelWidth:100
	    },
	    flex:1,
	    items:[
		{xtype:'hidden', name:'section', value:'user'},
		{xtype:'hidden', allowBlank:false, name:'crud'},
		{xtype:'hidden', name:'iduser'},
		{xtype:'textfield', allowBlank:false, fieldLabel:'User Name', name:'username', maskRe: /[a-zA-Z0-9-_]+/},
		{xtype:'textfield', allowBlank:false, fieldLabel:'Password', name:'password', inputType:'password'},
		{xtype:'textfield', allowBlank:false, fieldLabel:'Password Repeat', name:'password_repeat', inputType:'password'},
		{xtype:'hidden', name:'iduser_group_old'},
		{xtype:'combobox', allowBlank:false, fieldLabel:'Group Name',name:'iduser_group',
		    store:'UserGroupS', displayField:'name', valueField:'iduser_group', forceSelection:true},
		{xtype:'textfield', allowBlank:false, fieldLabel:'Full Name', name:'fullname'},
		{xtype:'textfield', fieldLabel:'Email', name:'email'}
	    ]
	}
    ],
    buttons:[
	{text:'Submit', handler:'onSubmit'},
	{text:'Reset'}
    ]
});