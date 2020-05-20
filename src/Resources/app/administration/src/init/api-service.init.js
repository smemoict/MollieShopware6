import MolliePaymentsRefundService
    from '../core/service/api/mollie-payments-refund.service';

import MolliePaymentsShippingService
    from '../core/service/api/mollie-payments-shipping.service';

const { Application } = Shopware;

Application.addServiceProvider('MolliePaymentsRefundService', (container) => {
    const initContainer = Application.getContainer('init');

    return new MolliePaymentsRefundService(initContainer.httpClient, container.loginService);
});

Application.addServiceProvider('MolliePaymentsShippingService', (container) => {
    const initContainer = Application.getContainer('init');

    return new MolliePaymentsShippingService(initContainer.httpClient, container.loginService);
});