/*
*Created by: Bayu candra <bayucandra@gmail.com>
*License: GPL3
*Creation Year: 2015
*/
Ext.define('B.view.widget.BTaskbarBtnC',{
    extend:'Ext.app.ViewController',
    alias:'controller.BTaskbarBtnC',
//    onToggle:function(){
//	Ext.Msg.alert('Tst','Toggle');
//    },
    onClick:function(th, e, opts){
	var BWindow=Ext.getCmp(th.getItemId()+'App');
	if(BWindow.isVisible()){
	    var zindexmanager=BWindow.zIndexManager;
	    if(zindexmanager.getActive()===BWindow){
		BWindow.minimize();
	    }else{
		zindexmanager.bringToFront(BWindow.getId());
	    }
	}else{
	    var BTaskbarBtnPos=th.getPosition();
	    
//	    BWindow.setPosition(BTaskbarBtnPos[0],BTaskbarBtnPos[1]-100);
	    var x_pos_init=BTaskbarBtnPos[0];
	    var y_pos_init=BTaskbarBtnPos[1]-70;
	    
	    BWindow.setStyle('opacity','0');
	    BWindow.show();
//	    Ext.Msg.alert('Tst',BWindow.maximized);
//	    if(!BWindow.maximized){
		BWindow.animate({
		    from:{
			x:x_pos_init,y:y_pos_init, opacity:0
		    },
		    to:{
			width:BWindow.last_size[0], height:BWindow.last_size[1], x:BWindow.last_pos[0], y:BWindow.last_pos[1], opacity:1
		    }
		});
//	    }
	}
    }
});