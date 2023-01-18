<?php declare(strict_types=1);

namespace Kiener\MolliePayments\Components\Subscription\DAL\Subscription\Tag;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Kiener\MolliePayments\Components\Subscription\DAL\Subscription\SubscriptionEntity;
use Shopware\Core\System\Tag\TagEntity;

class MollieSubscriptionTagEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $subscriptionId;

    /**
     * @var string
     */
    protected $tagId;

    /**
     * @var SubscriptionEntity|null
     */
    protected $subscription;

    /**
     * @var TagEntity|null
     */
    protected $tag;

    public function getSubscriptionId(): string
    {
        return $this->subscriptionId;
    }

    public function setSubscriptionId(string $subscriptionId): void
    {
        $this->subscriptionId = $subscriptionId;
    }

    public function getTagId(): string
    {
        return $this->tagId;
    }

    public function setTagId(string $tagId): void
    {
        $this->tagId = $tagId;
    }

    public function getSubscription(): ?SubscriptionEntity
    {
        return $this->subscription;
    }

    public function setSubscription(?SubscriptionEntity $subscription): void
    {
        $this->subscription = $subscription;
    }

    public function getTag(): ?TagEntity
    {
        return $this->tag;
    }

    public function setTag(?TagEntity $tag): void
    {
        $this->tag = $tag;
    }
}
