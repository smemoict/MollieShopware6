<?php
declare(strict_types=1);

namespace Kiener\MolliePayments\Compatibility\Bundles\FlowBuilder\Actions;

use Kiener\MolliePayments\Event\SubscriptionAware;
use Shopware\Core\Content\Flow\Dispatching\Action\FlowAction;
use Shopware\Core\Content\Flow\Dispatching\StorableFlow;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Event\FlowEvent;

class AddSubscriptionTagAction extends FlowAction
{

    private EntityRepositoryInterface $tagRepository;

    public function __construct(EntityRepositoryInterface $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @return string
     */
    public static function getName(): string
    {
        //This is specifically named this way to be picked up by shopware tagging
        //Do not change unless needed
        return 'action.add.mollie.subscription.tag';
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            self::getName() => 'handle',
        ];
    }

    /**
     * @return array<int, string>
     */
    public function requirements(): array
    {
        return [SubscriptionAware::class];
    }

    /**
     * @param FlowEvent $event
     * @return void
     */
    public function handle(FlowEvent $event): void
    {
        $baseEvent = $event->getEvent();
        if (!$baseEvent instanceof SubscriptionAware) {
            return;
        }

        $this->update($baseEvent->getContext(), $event->getConfig(), $baseEvent->getSubscriptionId());
    }

    /**
     * @param StorableFlow $flow
     * @return void
     */
    public function handleFlow(StorableFlow $flow): void
    {
        if (!$flow->hasStore(SubscriptionAware::SUBSCRIPTION_ID)) {
            return;
        }

        $this->update($flow->getContext(), $flow->getConfig(), $flow->getStore(SubscriptionAware::SUBSCRIPTION_ID));
    }


    /**
     * @param Context $context
     * @param array<string, mixed> $config
     * @param string $subscriptionId
     * @return void
     */
    private function update(Context $context, array $config, string $subscriptionId)
    {
        if (!\array_key_exists('tagIds', $config)) {
            return;
        }

        $tagIds = array_keys($config['tagIds']);
        if (empty($tagIds)) {
            return;
        }

        $tags = array_map(static function ($tagId) {
            return ['id' => $tagId];
        }, $tagIds);

        //TODO: create tag on non exist?
        $this->tagRepository->update([
            [
                'id' => $subscriptionId,
                'tags' => $tags,
            ],
        ], $context);

    }
}
