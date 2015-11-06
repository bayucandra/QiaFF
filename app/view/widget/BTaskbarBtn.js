/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.widget.BTaskbarBtn',{
    extend:'Ext.button.Button',
    requires:[
	'B.view.widget.BTaskbarBtnC'
    ],
    controller:'BTaskbarBtnC',
    alias:'widget.BTaskbarBtn',
    xtype:'BTaskbarBtn',
    width:150,
    textAlign:'left',
    toggleGroup:'BTaskbarBtn',
    listeners:{
	click:'onClick'
    }
});