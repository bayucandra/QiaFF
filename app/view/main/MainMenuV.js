/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.main.MainMenuV',{
    extend:'Ext.menu.Menu',
    requires:[
	'B.view.main.MainMenuC'
    ],
    controller:'MainMenuC',
    floating: false, width:170, bodyPadding :'5 0 5 0',
    xtype:'MainMenuV', alias:'widget.MainMenuV',
    listeners:{
	click:'onClick',
	afterrender:function(th, opts){
	    var desktop_store=Ext.getStore('DesktopS');
	    desktop_store.each(function(record, id){
		th.add(
		    {
			text:record.get('app_name'),
			app_name:record.get('app_name'),
			app_id:record.get('app_id'),
			height:30,
			icon:'resources/bimages/apps/'+record.get('app_id')+'-16.png'
		    }
		);
	    });
	}
//	afterrender:'onAfterrender'
    }
});
