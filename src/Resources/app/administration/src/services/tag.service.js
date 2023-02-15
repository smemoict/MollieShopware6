Shopware.Application.$container.resetProviders();


const MOLLIE_TAG_ACTION = 'action.add.mollie.subscription.tag';
const {camelCase} = Shopware.Utils.string;

Shopware.Application.addServiceProviderDecorator('flowBuilderService', (service) => {

    const originalGetActionTitle = service.getActionTitle;
    /**
     * Replace the tag label for mollie
     * @returns {*}
     */
    service.getActionTitle = function getActionTitle() {
        const actionTitleObject = originalGetActionTitle.apply(service, arguments);

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

        const mappedActionType = originalMapActionType.apply(service, arguments);

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
        const actionModalName = originalGetActionModalName.apply(service, arguments);

        const actionName = arguments[0];

        if (actionName!=null && actionName === MOLLIE_TAG_ACTION){
            return 'sw-flow-tag-modal';
        }

        return actionModalName;
    }

    const originalGetAvailableEntities = service.getAvailableEntities;
    /**
     * Adds subscription entity as a taggable entity when valid
     * @returns {*}
     */
    service.getAvailableEntities = function getAvailableEntities() {

        const entities = originalGetAvailableEntities.apply(service, arguments);

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


    function getAvailableEntities(selectedAction, actions, allowedAware, entityProperties = []) {
        const availableEntities = [];
        const entities = getEntities(selectedAction, actions, allowedAware);

        entities.forEach((entityName) => {
            if (!EntityDefinition.has(snakeCase(entityName))) {
                return;
            }

            const properties = EntityDefinition.get(snakeCase(entityName)).properties;

            // Check if the entity has the needed properties
            const hasProperties = entityProperties.every(entityProperty => properties.hasOwnProperty(entityProperty));

            if (!hasProperties) {
                return;
            }

            availableEntities.push({
                label: convertEntityName(camelCase(entityName)),
                value: entityName,
            });
        });

        return availableEntities;
    }

    return service;
});
