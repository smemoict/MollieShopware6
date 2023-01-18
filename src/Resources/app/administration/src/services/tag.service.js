Shopware.Application.$container.resetProviders();

// Shopware.Application.addServiceProviderMiddleware('flowBuilderService', (service, next) => {
//     console.log('flowBuilderService service gets called');
//     console.log(next);
//     next();
// });

Shopware.Application.addServiceProviderDecorator('flowBuilderService', (service) => {

    console.log(service);
    return service;
});
