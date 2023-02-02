Shopware.Application.$container.resetProviders();

// Shopware.Application.addServiceProviderMiddleware('flowBuilderService', (service, next) => {


//     console.log('flowBuilderService service gets called');
//     console.log(next);
//     next();
// });

const MOLLIE_TAG_ACTION = 'action.add.mollie.subscription.tag';
const {camelCase} = Shopware.Utils.string;

Shopware.Application.addServiceProviderDecorator('flowBuilderService', (service) => {
    
    const originalGetAvailableEntities = service.getAvailableEntities;
    /**
     * Adds subscription entity as a taggable entity when valid
     * @returns {*}
     */
    service.getAvailableEntities = function getAvailableEntities() {
        const entities = originalGetAvailableEntities.apply(null, arguments);
        console.log('getAvailableEntities',arguments);

        //Check if action has subscription data?
        const actions = arguments[2];

        if (actions.includes('subscriptionAware')){
            entities.push({
                label: service.convertEntityName(camelCase('mollie_subscription')),
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

        if (actionTitleObject?.value === MOLLIE_TAG_ACTION && actionTitleObject?.label === undefined) {
            actionTitleObject.label = 'sw-flow.actions.addTag';
        }

        return actionTitleObject;
    }

    const originalMapActionType = service.mapActionType;
    /**
     * Return the add entity tag action type for a mollie tag
     * this enables correct editing
     * @returns {*}
     */
    service.mapActionType = function mapActionType() {
        console.log('Injection mapping');
        const mappedActionType = originalMapActionType.apply(null, arguments);

        const actionName = arguments[0];

        if (actionName!=null && actionName === MOLLIE_TAG_ACTION){
            return 'action.add.entity.tag';
        }

        return mappedActionType;
    }

    const originalGetActionModalName = service.getActionModalName;
    /**
     * Returns the tag editor modal name for a mollie tag
     * @returns {string|string|*}
     */
    service.getActionModalName = function getActionModalName() {
        const actionModalName = originalGetActionModalName.apply(null, arguments);

        const actionName = arguments[0];

        if (actionName!=null && actionName === MOLLIE_TAG_ACTION){
            return 'sw-flow-tag-modal';
        }

        return actionModalName;
    }

    return service;
});
