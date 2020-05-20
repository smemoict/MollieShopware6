(this.webpackJsonp=this.webpackJsonp||[]).push([["mollie-payments"],{OlTK:function(e,t){e.exports='{% block sw_order_detail_base_line_items_summary_entries %}\n    {% parent %}\n    <dt v-if="refundedItems > 0"><strong>{{ $tc(\'sw-order.detailExtended.totalRefunds\', 0, { quantity: refundedItems }) }}</strong></dt>\n    <dd v-if="refundedItems > 0"><strong>{{ refundedAmount | currency(order.currency.shortName) }}</strong></dd>\n    <dt v-if="shippedItems > 0"><strong>{{ $tc(\'sw-order.detailExtended.totalShipments\', 0, { quantity: shippedItems }) }}</strong></dt>\n    <dd v-if="shippedItems > 0"><strong>{{ shippedAmount | currency(order.currency.shortName) }}</strong></dd>\n{% endblock %}'},eOFF:function(e,t){e.exports='{% block sw_order_line_items_grid_grid_actions %}\n    {% parent %}\n\n<template #action-modals="{ item }">\n    <sw-modal v-if="showRefundModal === item.id"\n              @modal-close="onCloseRefundModal"\n              :title="$tc(\'mollie-payments.modals.refund.title\')"\n              variant="small">\n\n        <p>\n            {{ $tc(\'mollie-payments.modals.refund.content\', 0, { quantity: item.quantity, refundableQuantity: refundableQuantity(item) }) }}\n        </p>\n\n        <br />\n\n        <sw-number-field numberType="integer"\n                         size="medium"\n                         :step="1"\n                         :placeholder="$tc(\'mollie-payments.modals.refund.quantityPlaceholder\')"\n                         :min="0"\n                         :value="1"\n                         :max="refundableQuantity(item)"\n                         v-model="quantityToRefund">\n        </sw-number-field>\n\n        <template slot="modal-footer">\n            <sw-button @click="onCloseRefundModal" size="small">\n                {{ $tc(\'mollie-payments.modals.refund.cancelButton\') }}\n            </sw-button>\n            <sw-button @click="onConfirmRefund(item)" variant="primary" size="small">\n                {{ $tc(\'mollie-payments.modals.refund.confirmButton\') }}\n            </sw-button>\n        </template>\n    </sw-modal>\n\n    <sw-modal v-if="showShippingModal === item.id"\n              @modal-close="onCloseShippingModal"\n              :title="$tc(\'mollie-payments.modals.shipping.title\')"\n              variant="small">\n\n        <p>\n            {{ $tc(\'mollie-payments.modals.shipping.content\', 0, { quantity: item.quantity, shippableQuantity: shippableQuantity(item) }) }}\n        </p>\n\n        <br />\n\n        <sw-number-field numberType="integer"\n                         size="medium"\n                         :step="1"\n                         :placeholder="$tc(\'mollie-payments.modals.shipping.quantityPlaceholder\')"\n                         :min="0"\n                         :value="1"\n                         :max="shippableQuantity(item)"\n                         v-model="quantityToShip">\n        </sw-number-field>\n\n        <template slot="modal-footer">\n            <sw-button @click="onCloseShippingModal" size="small">\n                {{ $tc(\'mollie-payments.modals.shipping.cancelButton\') }}\n            </sw-button>\n            <sw-button @click="onConfirmShipping(item)" variant="primary" size="small">\n                {{ $tc(\'mollie-payments.modals.shipping.confirmButton\') }}\n            </sw-button>\n        </template>\n    </sw-modal>\n</template>\n{% endblock %}\n\n{% block sw_order_line_items_grid_grid_actions_show %}\n    {% parent %}\n\n<sw-context-menu-item :disabled="!isShippable(item)"\n                      icon="default-object-paperplane"\n                      @click="onShipItem(item)">\n    {{ $tc(\'mollie-payments.general.shipThroughMollie\') }}\n</sw-context-menu-item>\n\n<sw-context-menu-item :disabled="!isRefundable(item)"\n                      icon="default-arrow-360-left"\n                      @click="onRefundItem(item)">\n    {{ $tc(\'mollie-payments.general.refundThroughMollie\') }}\n</sw-context-menu-item>\n{% endblock %}'},kmOT:function(e){e.exports=JSON.parse('{"mollie-payments":{"general":{"mainMenuItemGeneral":"Mollie Payments","descriptionTextModule":"Mollie Payments","refundThroughMollie":"Refund through Mollie","shipThroughMollie":"Ship through Mollie"},"modals":{"refund":{"title":"Refund an order line item through Mollie","content":"Fill out the quantity of this item ({refundableQuantity} out of {quantity} left to refund) to be refunded to the customer.","quantityPlaceholder":"The quantity to refund...","createCreditText":"Create a credit item for this refund.","confirmButton":"Refund","cancelButton":"Do not refund"},"shipping":{"title":"Ship an order line item through Mollie","content":"Fill out the quantity of this item ({shippableQuantity} out of {quantity} left to ship) to be shipped to the customer.","quantityPlaceholder":"The quantity to ship...","confirmButton":"Ship","cancelButton":"Do not ship"}}},"sw-order":{"detailExtended":{"columnRefunded":"Refunded","columnShipped":"Shipped","totalRefunds":"Refunded amount ({quantity} items)","totalShipments":"Shipped amount ({quantity} items)"}}}')},mhZ0:function(e){e.exports=JSON.parse('{"mollie-payments":{"general":{"mainMenuItemGeneral":"Mollie Payments","descriptionTextModule":"Mollie Payments","refundThroughMollie":"Refund through Mollie","shipThroughMollie":"Ship through Mollie"},"modals":{"refund":{"title":"Refund an order line item through Mollie","content":"Fill out the quantity of this item ({refundableQuantity} out of {quantity} left to refund) to be refunded to the customer.","quantityPlaceholder":"The quantity to refund...","createCreditText":"Create a credit item for this refund.","confirmButton":"Refund","cancelButton":"Do not refund"},"shipping":{"title":"Ship an order line item through Mollie","content":"Fill out the quantity of this item ({shippableQuantity} out of {quantity} left to ship) to be shipped to the customer.","quantityPlaceholder":"The quantity to ship...","confirmButton":"Ship","cancelButton":"Do not ship"}}},"sw-order":{"detailExtended":{"columnRefunded":"Refunded","columnShipped":"Shipped","totalRefunds":"Refunded amount ({quantity} items)","totalShipments":"Shipped amount ({quantity} items)"}}}')},ugmU:function(e,t,n){"use strict";n.r(t);const i=Shopware.Classes.ApiService;var o=class extends i{constructor(e,t,n="mollie"){super(e,t,n)}refund(e={itemId:null,versionId:null,quantity:null,createCredit:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/refund`,JSON.stringify(e),{headers:t}).then(e=>i.handleResponse(e))}total(e={orderId:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/refund/total`,JSON.stringify(e),{headers:t}).then(e=>i.handleResponse(e))}};const s=Shopware.Classes.ApiService;var l=class extends s{constructor(e,t,n="mollie"){super(e,t,n)}ship(e={itemId:null,versionId:null,quantity:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/ship`,JSON.stringify(e),{headers:t}).then(e=>s.handleResponse(e))}total(e={orderId:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/ship/total`,JSON.stringify(e),{headers:t}).then(e=>s.handleResponse(e))}};const{Application:d}=Shopware;d.addServiceProvider("MolliePaymentsRefundService",e=>{const t=d.getContainer("init");return new o(t.httpClient,e.loginService)}),d.addServiceProvider("MolliePaymentsShippingService",e=>{const t=d.getContainer("init");return new l(t.httpClient,e.loginService)});var a=n("eOFF"),r=n.n(a);const{Component:u,Service:m}=Shopware;u.override("sw-order-line-items-grid",{template:r.a,inject:["MolliePaymentsRefundService","MolliePaymentsShippingService"],data:()=>({isLoading:!1,selectedItems:{},showRefundModal:!1,showShippingModal:!1,createCredit:!1,quantityToRefund:1,quantityToShip:1,refundQuantity:0,shippingQuantity:0}),computed:{getLineItemColumns(){const e=this.$super("getLineItemColumns");return e.push({property:"customFields.refundedQuantity",label:this.$tc("sw-order.detailExtended.columnRefunded"),allowResize:!1,align:"right",inlineEdit:!1,width:"100px"}),e.push({property:"customFields.shippedQuantity",label:this.$tc("sw-order.detailExtended.columnShipped"),allowResize:!1,align:"right",inlineEdit:!1,width:"100px"}),e}},methods:{onRefundItem(e){this.showRefundModal=e.id},onCloseRefundModal(){this.showRefundModal=!1},onConfirmRefund(e){this.showRefundModal=!1,this.quantityToRefund>0&&this.MolliePaymentsRefundService.refund({itemId:e.id,versionId:e.versionId,quantity:this.quantityToRefund,createCredit:this.createCredit}).then(document.location.reload()),this.quantityToRefund=0},onShipItem(e){this.showShippingModal=e.id},onCloseShippingModal(){this.showShippingModal=!1},onConfirmShipping(e){this.showShippingModal=!1,this.quantityToShip>0&&this.MolliePaymentsShippingService.ship({itemId:e.id,versionId:e.versionId,quantity:this.quantityToShip}).then(document.location.reload()),this.quantityToShip=0},isRefundable(e){let t=!1;return e.type===this.lineItemTypes.PRODUCT&&void 0!==e.customFields&&null!==e.customFields&&void 0!==e.customFields.mollie_payments&&null!==e.customFields.mollie_payments&&void 0!==e.customFields.mollie_payments.order_line_id&&null!==e.customFields.mollie_payments.order_line_id&&(void 0===e.customFields.refundedQuantity||parseInt(e.customFields.refundedQuantity)<e.quantity)&&(t=!0),t},isShippable(e){let t=!1;return e.type===this.lineItemTypes.PRODUCT&&void 0!==e.customFields&&null!==e.customFields&&void 0!==e.customFields.mollie_payments&&null!==e.customFields.mollie_payments&&void 0!==e.customFields.mollie_payments.order_line_id&&null!==e.customFields.mollie_payments.order_line_id&&(void 0===e.customFields.shippedQuantity||parseInt(e.customFields.shippedQuantity)<e.quantity)&&(t=!0),t},refundableQuantity:e=>void 0!==e.customFields&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.refundedQuantity):e.quantity,shippableQuantity:e=>void 0!==e.customFields&&void 0!==e.customFields.shippedQuantity&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.shippedQuantity)-parseInt(e.customFields.refundedQuantity):void 0!==e.customFields&&void 0===e.customFields.shippedQuantity&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.refundedQuantity):e.quantity}});var p=n("OlTK"),h=n.n(p);const{Component:c}=Shopware;c.override("sw-order-detail-base",{template:h.a,props:{orderId:{type:String,required:!0}},data:()=>({refundedAmount:0,refundedItems:0,shippedAmount:0,shippedItems:0}),inject:["MolliePaymentsRefundService","MolliePaymentsShippingService"],mounted(){""!==this.orderId&&(this.MolliePaymentsRefundService.total({orderId:this.orderId}).then(e=>{this.refundedAmount=e.amount,this.refundedItems=e.items}),this.MolliePaymentsShippingService.total({orderId:this.orderId}).then(e=>{this.shippedAmount=e.amount,this.shippedItems=e.items}))}});var y=n("mhZ0"),f=n("kmOT");const{Module:g}=Shopware;g.register("mollie-payments",{type:"plugin",name:"MolliePayments",title:"mollie-payments.general.mainMenuItemGeneral",description:"mollie-payments.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",color:"#333",icon:"default-action-settings",snippets:{"de-DE":y,"en-GB":f}})}},[["ugmU","runtime"]]]);