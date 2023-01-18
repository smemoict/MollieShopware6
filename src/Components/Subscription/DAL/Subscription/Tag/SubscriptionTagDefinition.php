<?php
declare(strict_types=1);

namespace Kiener\MolliePayments\Components\Subscription\DAL\Subscription\Tag;

use Kiener\MolliePayments\Components\Subscription\DAL\Subscription\SubscriptionDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\Tag\TagDefinition;

class SubscriptionTagDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'mollie_subscription_tag';
    /**
     * @return string
     */
    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function since(): ?string
    {
        return '6.0.0.0';
    }

    /**
     * @return FieldCollection
     */
    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new FkField('subscription_id', 'subscriptionId', SubscriptionDefinition::class))->addFlags(new ApiAware(), new PrimaryKey(), new Required()),
            (new FkField('tag_id', 'tagId', TagDefinition::class))->addFlags(new ApiAware(), new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('subscription', 'subscription_id', SubscriptionDefinition::class, 'id', false),
            (new ManyToOneAssociationField('tag', 'tag_id', TagDefinition::class, 'id', false))->addFlags(new ApiAware()),
        ]);
    }
}
