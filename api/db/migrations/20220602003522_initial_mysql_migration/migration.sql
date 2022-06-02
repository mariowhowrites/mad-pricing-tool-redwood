-- CreateTable
CREATE TABLE `PriceSnapshot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceMeasurement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `variant` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL,
    `squareInches` DOUBLE NOT NULL,
    `pricePerSquareInch` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `priceSnapshotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
