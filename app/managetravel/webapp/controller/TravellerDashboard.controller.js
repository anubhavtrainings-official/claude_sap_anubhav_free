sap.ui.define([
    "anubhav/claude/managetravel/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, MessageToast) {
    "use strict";

    var GROUP     = "travellerChanges";
    var TRIPS_URL = "/odata/v4/catalog/TravelledLocations?$expand=destination";

    return BaseController.extend("anubhav.claude.managetravel.controller.TravellerDashboard", {

        onInit: function () {
            this.getView().setModel(new JSONModel({ title: "My Spend per Destination", data: [] }), "chart");
            this.getRouter().getRoute("travellerDashboard").attachPatternMatched(this._onMatched, this);
        },

        _onMatched: function () {
            if (!this.getUserModel().getProperty("/loginName")) {
                this.hydrateUserFromCookie();
            }
            if (!this._guardRole()) {
                return;
            }
            var that = this;
            this.ensureValidToken().then(
                function () {
                    that.attachAuthHeaderToODataModel();
                    that._bindTraveller();
                    that._loadDonut();
                },
                function () { that.onLogout(); }
            );
        },

        // Bind the single own Travellers row (row-level @restrict returns only it).
        _bindTraveller: function () {
            var that = this;
            var oModel = this.getODataModel();
            this._oTravBinding = oModel.bindList("/Travellers", undefined, undefined, undefined, {
                $$updateGroupId: GROUP,
                $expand: "addressType"
            });
            this._oTravBinding.requestContexts(0, 1).then(
                function (aCtx) {
                    if (!aCtx || !aCtx.length) {
                        that.showError("No traveller profile found for this account. Please contact an admin.");
                        return;
                    }
                    that.getView().setBindingContext(aCtx[0]);
                },
                function (oErr) { that.showError(oErr); }
            );
        },

        // Spend per destination, currency-aware: slices split by destination+currency
        // (e.g. "Paris (EUR)") so amounts across currencies are never summed together.
        _loadDonut: function () {
            var that = this;
            this._ajax(TRIPS_URL, "GET").then(
                function (oRes) {
                    var mSpend = {};
                    (oRes.value || []).forEach(function (t) {
                        var sDest = (t.destination && (t.destination.name || t.destination.city)) || "Unknown";
                        var sCur  = t.currency_code || "—";
                        var sKey  = sDest + " (" + sCur + ")";
                        mSpend[sKey] = (mSpend[sKey] || 0) + (parseFloat(t.cost) || 0);
                    });
                    that.getView().getModel("chart").setProperty("/data",
                        Object.keys(mSpend).map(function (k) {
                            return { name: k, value: Math.round(mSpend[k] * 100) / 100 };
                        }));
                },
                function (jqXHR) { that.showError(jqXHR); }
            );
        },

        _locationsBinding: function () {
            var oTable = this.byId("locationsTable");
            return oTable && oTable.getBinding("items");
        },

        onAddLocation: function () {
            var oBinding = this._locationsBinding();
            if (!oBinding) {
                MessageToast.show("Profile is still loading — please retry.");
                return;
            }
            oBinding.create({ notes: "" });
        },

        onDeleteLocation: function () {
            var oTable = this.byId("locationsTable");
            var aItems = oTable.getSelectedItems();
            if (!aItems.length) {
                MessageToast.show("Select at least one row to delete.");
                return;
            }
            var that = this;
            aItems.forEach(function (oItem) {
                oItem.getBindingContext().delete(GROUP).catch(function (oErr) {
                    that.showError(oErr);
                });
            });
            oTable.removeSelections(true);
        },

        _addressesBinding: function () {
            var oTable = this.byId("addressesTable");
            return oTable && oTable.getBinding("items");
        },

        onAddAddress: function () {
            var oBinding = this._addressesBinding();
            if (!oBinding) {
                MessageToast.show("Profile is still loading — please retry.");
                return;
            }
            oBinding.create({ street: "", city: "", isPrimary: false });
        },

        onDeleteAddress: function () {
            var oTable = this.byId("addressesTable");
            var aItems = oTable.getSelectedItems();
            if (!aItems.length) {
                MessageToast.show("Select at least one address to delete.");
                return;
            }
            var that = this;
            aItems.forEach(function (oItem) {
                oItem.getBindingContext().delete(GROUP).catch(function (oErr) {
                    that.showError(oErr);
                });
            });
            oTable.removeSelections(true);
        },

        // Single Save — flushes queued profile + location + address changes in one $batch.
        onSave: function () {
            var that = this;
            var oModel = this.getODataModel();
            oModel.submitBatch(GROUP).then(
                function () {
                    if (oModel.hasPendingChanges(GROUP)) {
                        that.showError("Some changes could not be saved. Please review and retry.");
                    } else {
                        MessageToast.show("Saved");
                    }
                    that._loadDonut();
                },
                function (oErr) { that.showError(oErr); }
            );
        }
    });
});
