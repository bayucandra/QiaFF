/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.widget.BWindowC',{
    extend:'Ext.app.ViewController',
    alias:'controller.BWindowC',
    requires:[
	'B.view.widget.BTaskbarBtn'
    ],
    onMinimize:function(th, opts){
	var BTaskbarBtnPos=Ext.getCmp('BTaskbar').down('BTaskbarBtn[itemId='+th.getTitle()+']').getPosition();
	th.last_pos[0]=th.getX();
	th.last_pos[1]=th.getY();
	
	th.last_size[0]=th.getWidth();
	th.last_size[1]=th.getHeight();
	
	th.animate({
	    to:{
		width:150, height:50, x:BTaskbarBtnPos[0], y:BTaskbarBtnPos[1]-50, opacity:0
	    },
	    callback:function(){
		th.hide();
	    }
	});
    },
    onHide:function(th, opts){
	Ext.getCmp('BTaskbar').down('BTaskbarBtn[itemId='+th.getTitle()+']').toggle(false);
    },
    onAfterrender:function(th, opts){
	var taskbar = Ext.getCmp('BTaskbar');
	var taskbar_btn_idx = taskbar.items.length-3;
	taskbar.insert(taskbar_btn_idx,{xtype:'BTaskbarBtn',icon:'resources/bimages/apps/'+th.app_id+'-16.png',text:th.getTitle(),itemId:th.getTitle()});

	taskbar.down('BTaskbarBtn').toggle(false);
//	taskbar.down('BTaskbarBtn[itemId='+th.getTitle()+']').toggle(true);
	th.setWidth(th.getWidth());
	th.setHeight(th.getHeight());
    },
    onBeforedestroy:function(th, opts){
	var taskbar = Ext.getCmp('BTaskbar');
	taskbar.down('BTaskbarBtn[itemId='+th.getTitle()+']').destroy();
    },
    onActivate:function(th, opts){
	var taskbar = Ext.getCmp('BTaskbar');
	taskbar.down('BTaskbarBtn').toggle(false);
	taskbar.down('BTaskbarBtn[itemId='+th.getTitle()+']').toggle(true);
    }
});