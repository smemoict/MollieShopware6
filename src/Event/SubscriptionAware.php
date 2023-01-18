<?php
declare(strict_types=1);

namespace Kiener\MolliePayments\Event;

use Shopware\Core\Framework\Event\FlowEventAware;
interface SubscriptionAware extends FlowEventAware
{
    public const SUBSCRIPTION_ID = 'subscriptionId';

    public const SUBSCRIPTION = 'subscription';

    public function getSubscriptionId(): string;
}
