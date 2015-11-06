/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.widget.BWindow',{
    extend:'Ext.window.Window',
    requires:[
	'B.view.widget.BWindowC'
    ],
    header: {
	titleAlign: "center"
    },
    bodyPadding:'5 5 0',
    app_id:'',
    controller:'BWindowC',
    width:'70%',
    height:'75%',
    xtype:'BWindow',
    alias:'widget.BWindow',
    maximizable: true,
    constrain: true,
    minimizable:true,
    initComponent:function(){
	Ext.apply(this,{
	    icon:'resources/bimages/apps/'+this.app_id+'-16.png'
	});
	this.callParent();
    },
    listeners:{
	minimize:'onMinimize',
	hide:'onHide',
	afterrender:'onAfterrender',
	beforedestroy:'onBeforedestroy',
	activate:'onActivate',
	focus:function(th,evt,opts){
	    Ext.Msg.alert("focus","Focus");
	}
    },
    maximize: function(){
	this.callParent([true]); //animate
    },

    restore: function(){
	this.callParent([true]); //animate
    }
});