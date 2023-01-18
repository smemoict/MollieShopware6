<?php declare(strict_types=1);

namespace Kiener\MolliePayments\Migration;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1674036747CreateSubscriptionTags extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1674036747;
    }

    /**
     * @throws Exception
     */
    public function update(Connection $connection): void
    {
        $connection->exec(
            "CREATE TABLE IF NOT EXISTS `mollie_subscription_tag` (
                `subscription_id` BINARY(16) NOT NULL,
                `tag_id` BINARY(16) NOT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`subscription_id`,`tag_id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                "
        );

        $this->createColumn('mollie_subscription', 'tag_ids', 'JSON NULL', $connection);
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }

    /**
     * @param string $table
     * @param string $column
     * @param string $type
     * @param Connection $connection
     * @throws Exception
     * @return void
     */
    private function createColumn(string $table, string $column, string $type, Connection $connection): void
    {
        $colQuery = $connection->executeQuery("SHOW COLUMNS FROM " . $table . " LIKE '" . $column . "'")->fetch();

        if ($colQuery === false) {
            $connection->exec("ALTER TABLE " . $table . " ADD " . $column . " " . $type);
        }
    }
}
