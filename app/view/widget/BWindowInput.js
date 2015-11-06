/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.widget.BWindowInput',{
    extend:'Ext.window.Window',
    header:{
	titleAlign:'center'
    },
    layout:'fit',
    bodyPadding:'5 5 0',
    xtype:'BWindowInput',
    alias:'widget.BWindowInput',
    constrain:true,
    maximizable:true,
    minimizable:false,
    autoShow:false,
    listeners:{
	afterrender:function(th,opts){
	    var form=th.down('form');
	    if(form){
		form.down('textfield:nth-child(1)').focus();
	    }
	}
    }
});