<?php declare(strict_types=1);

namespace Kiener\MolliePayments\Components\Subscription\DAL\Subscription\Tag;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                add(SubscriptionTagDefinition $entity)
 * @method void                set(string $key, SubscriptionTagDefinition $entity)
 * @method SubscriptionTagDefinition[]    getIterator()
 * @method SubscriptionTagDefinition[]    getElements()
 * @method SubscriptionTagDefinition|null get(string $key)
 * @method SubscriptionTagDefinition|null first()
 * @method SubscriptionTagDefinition|null last()
 */
class MollieSubscriptionTagCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return SubscriptionTagDefinition::class;
    }
}
