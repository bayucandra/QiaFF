/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015

*/
Ext.define('B.view.main.DesktopV',{
    extend:'Ext.view.View',
    requires:[
	'B.view.main.DesktopC'
    ],
    controller:'DesktopC',
    id:'DesktopV',
    baseCls:'bdata_view',
    alias:'widget.DesktopV',
    xtype:'DesktopV',
    store:'DesktopS',
    tpl: [
	'<tpl for=".">',
	    '<tpl if="xindex%2==1">',
		'<div class="thumb-wrap" id="{name:stripTags}" style="clear:left;">',
		    '<div class="shortcut-icon" style="background-image:url(\'resources/bimages/apps/{app_id}.png\')">',
		    '</div>',
		    '<span class="shortcut-text">{app_name:htmlEncode}</span>',
		'</div>',
	    '</tpl>',
	    '<tpl if="xindex%2==0">',
		'<div class="thumb-wrap" id="{name:stripTags}">',
		    '<div class="shortcut-icon" style="background-image:url(\'resources/bimages/apps/{app_id}.png\')">',
		    '</div>',
		    '<span class="shortcut-text">{app_name:htmlEncode}</span>',
		'</div>',
	    '</tpl>',
	'</tpl>',
	'<div class="x-clear"></div>'
    ],
    multiSelect: false,

    trackOver: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap',
    emptyText: 'No application available',
    listeners:{
	itemdblclick:'onDblClick'
    }
});