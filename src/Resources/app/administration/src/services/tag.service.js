Shopware.Application.$container.resetProviders();

// Shopware.Application.addServiceProviderMiddleware('flowBuilderService', (service, next) => {


//     console.log('flowBuilderService service gets called');
//     console.log(next);
//     next();
// });

Shopware.Application.addServiceProviderDecorator('flowBuilderService', (service) => {
    const originalGetAvailableEntities = service.getAvailableEntities;

    /**
     * Adds subscription entity as a taggable entity
     * @returns {*}
     */
    service.getAvailableEntities = function getAvailableEntities() {
        const entities = originalGetAvailableEntities.apply(null, arguments);
        console.log(arguments);

        //Check if action has subscription data?
        const actions = arguments[2];

        if (actions.includes('subscriptionAware')){
            entities.push({
                label: 'Mollie Subscriptions',
                value: 'mollie_subscription',
            })
        }

        return entities;
    }
    const originalGetActionTitle = service.getActionTitle;

    /**
     * Replace the tag label for mollie
     * @returns {*}
     */
    service.getActionTitle = function getActionTitle() {
        const actionTitleObject = originalGetActionTitle.apply(null, arguments);

        if (actionTitleObject?.value === 'action.add.mollie.subscription.tag' && actionTitleObject?.label === undefined) {
            actionTitleObject.label = 'sw-flow.actions.addTag';
        }

        return actionTitleObject;
    }


    return service;
});
