/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.login.LoginV',{
    extend:'Ext.container.Container',
    id:'LoginV',
    requires:[
	'B.view.login.LoginC',
	'Ext.form.Panel', 'Ext.form.field.Text'
    ],
    controller:'LoginC',
    plugins:'viewport',
    xtype:'LoginV',
    alias:'widget.LoginV',
    layout:{
	type:'fit'
    },
    items:[
	{
	    xtype:'panel', bodyStyle: 'background: transparent;',
	    style:'background:url(\'resources/bimages/wallpaper.jpg\'); background-size:cover;',
	    layout:{type:'center'},
	    items:[
		{ xtype:'form', bodyPadding:'10 10 0', title:'Login',
		    defaults:{
			anchor: '100%', labelWidth:90
		    },
		    items:[
			{xtype:'textfield', fieldLabel:'Username', name:'username',
			    flex:1, allowBlank:false, maxLength:20, enforceMaxLength:true},
			{xtype:'textfield', fieldLabel:'Password', name:'password', inputType:'password',
			    flex:1, allowBlank:false, maxLength:20, enforceMaxLength:true,
			    enableKeyEvents:true,
			    listeners:{
				specialKey:'onSpecialKey'
			    }
			}
		    ],
		    buttons:[{
			text:'Login', formBind:true, handler:'onLogin'
		    }],
		    listeners:{
			afterrender:function(th, opts){
			    th.down('textfield[name=username]').focus();
			}
		    }
		}]
	}
    ]
});