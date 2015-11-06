/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.main.DesktopC',{
    extend: 'Ext.app.ViewController',
    alias:'controller.DesktopC',
    onDblClick:function(th, rec, itm, idx, e, opts){
	var app_name = rec.get('app_name'),
	    xtype = rec.get('app_id')+'App',
	    alias = 'widget.'+xtype,
	    contentView = Ext.getCmp('DesktopPanel'),
	    cmp;
	//BEGIN CHECK IF WINDOWS ALREADY EXIST=======================
	var AppWin=Ext.getCmp(xtype);
	if(AppWin){
	    var zindexmanager=AppWin.zIndexManager;
	    zindexmanager.bringToFront(xtype);
	    return;
	}
	//END CHECK IF WINDOWS ALREADY EXIST=======================
	if(xtype){//Make sure if has 'id'
	    var className=Ext.ClassManager.getNameByAlias(alias);
	    var ViewClass=Ext.ClassManager.get(className);
	    
	    if(bisnull(ViewClass)){
		Ext.Msg.alert("Unimplemented","Sorry, not implemented yet.");
	    }else{
		cmp=new ViewClass({app_id:rec.get('app_id')});
		contentView.add(cmp);
		cmp.setTitle(app_name);
		cmp.center();
		cmp.show();
	    }
	}
    }
});