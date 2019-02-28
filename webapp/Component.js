sap.ui.define([
	"sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
	"sap/ui/Device",
	"sapui5_test/model/models"
], function(UIComponent,JSONModel,ResourceModel,Device, models) {
	"use strict";

	return UIComponent.extend("sapui5_test.Component", {

		metadata: {
			manifest: "json",
			"rootView": "sapui5_test.controller.APP",
                "config": {
                    "serviceUrl": "service/data.json",
                    "i18nBundle": "webapp.i18n.i18n"
                }
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
            var mConfig = this.getMetadata().getConfig();
            
            // resource bundle
            var oResourceModel = new ResourceModel({
                bundleName: mConfig.i18nBundle
            });
            this.setModel(oResourceModel, "i18n");              

            // application data
            var oModel = new JSONModel(mConfig.serviceUrl);
            this.setModel(oModel);
		}
	});
});