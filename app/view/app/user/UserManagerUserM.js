/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.app.user.UserManagerUserM',{
    extend:'Ext.data.Model',
    idProperty:'iduser',
    fields:[
	{name:'iduser',type:'int'},{name:'username',type:'string'},{name:'groupname',type:'string'},{name:'iduser_group',type:'int'},
	{name:'fullname',type:'string'},{name:'email',type:'string'}
    ]
});