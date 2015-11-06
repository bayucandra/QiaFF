/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserPrivW',{
    extend:'B.view.widget.BWindowInput',
    id:'UserManagerUserPrivW',
    width:300,
    requires:[
	'Ext.form.*'
    ],
    items:[
	{
	    xtype:'form',
	    frame:false,
	    defaults:{ anchor:'100%', labelWidth:100 },
	    flex:1,
	    items:[
		{xtype:'hidden', name:'section', value:'user_priv'},
		{xtype:'hidden', name:'crud', allowBlank:false},
		{xtype:'hidden', name:'iduser', allowBlank:false},
		{xtype:'combobox', fieldLabel:'Privilege', name:'privilege', allowBlank:false, store:'PrivilegeSS', forceSelection:true,
		    displayField:'privilege'
		}
	    ]
	}
    ]
});