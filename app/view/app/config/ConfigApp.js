/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.config.ConfigApp',{
    extend:'B.view.widget.BWindow',
    id:'ConfigApp',
    width:700,
    last_size:[],
    last_pos:[],
    alias:'widget.ConfigApp',
    layout: 'fit',
    items:[{
	    xtype:'grid',
	    store:'ConfigS',
	    plugins:{
		ptype: 'cellediting',
		clicksToEdit: 1
	    },
	    columns:{
		defaults:{
		    dragable:false, hideable:false, sortable:false
		},
		items:[
		    {text:'Description', width:250, dataIndex:'description'},
		    {text:'Value', flex:1, dataIndex:'value',
			editor: {
			    xtype: 'textfield',
			    allowBlank: false
			}
		    }
		]
	    }
    }],
    listeners:{
	afterrender:function(){
	    Ext.getStore('ConfigS').load();
	}
    }
});