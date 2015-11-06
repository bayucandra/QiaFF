/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('B.view.main.MainC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    onLogout: function(){
	B.app.getController('Root').logout();
    }
//    onAfterrender:function(){
//	Ext.Ajax.request({
//	    url:'resources/php/ajax_session.php',
//	    params:{
//		act:'get'
//	    },
//	    scope:this,
//	    success:function(response,opts){
//		var obj=Ext.decode(response.responseText);
//		this.getViewModel().setData({fullname:obj.fullname});
//		Ext.Msg.alert('tst',obj.fullname);
//	    }
//	});
//    }
});
