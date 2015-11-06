/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('B.Application', {
    extend: 'Ext.app.Application',
    
    name: 'B',

//    stores: [
//        // TODO: add global / shared stores here
//    ],
    requires:[
	'B.view.main.Main',
	'B.view.login.LoginV',
	'B.view.app.config.ConfigApp',
	'B.view.app.product.ProductApp',
	'B.view.app.costing.CostingApp',
	'B.view.app.user.UserManagerApp'
    ],
    
    controllers: [
        'Root@B.controller'
    ],
    launch: function () {
        // TODO - Launch the application
    }
});
