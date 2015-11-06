/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.main.MainMenuC',{
    extend:'Ext.app.ViewController',
    alias:'controller.MainMenuC',
    onClick:function(p_th, p_item, e, opts){
	var item = bisnull(p_th.app_id)?p_item:p_th;//CHeck wheter the event comes from menu or btn-special

	var app_name = item.app_name,
	    xtype = item.app_id+'App',
	    alias = 'widget.'+xtype,
	    contentView = Ext.getCmp('DesktopPanel'),
	    cmp;
	if( bisnull(app_name) || bisnull(xtype) ){
	    return;
	}
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
		cmp=new ViewClass({app_id:item.app_id});
		contentView.add(cmp);
		cmp.setTitle(app_name);
		cmp.center();
		cmp.show();
	    }
	}
    },
    onAfterrender:function(th, opts){
	th.items.each(function(item){
	    var app_id=item.app_id;
	    var icon_path='resources/bimages/apps/'+app_id+'-16.png';
	    item.setIcon(icon_path);
	});
    }
});
