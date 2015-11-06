/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.main.DesktopS',{
    extend:'Ext.data.Store',
    storeId:'DesktopS',
    requires:[
	'B.view.main.DesktopM'
    ],
    model:'B.view.main.DesktopM',
    proxy:{
	type:'memory',
	reader:{
	    type:'json',
	    rootProperty:'application_list'
	}
    }
});