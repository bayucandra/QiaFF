/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.config.ConfigM',{
    extend:'Ext.data.Model',
    idProperty:'key',
    fields:[
	{name:'key'},{name:'description'},{name:'value'}
    ]
});