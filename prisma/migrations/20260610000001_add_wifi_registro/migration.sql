-- CreateTable
CREATE TABLE `WifiComunidad-Registro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `sitioid` VARCHAR(191) NOT NULL,
    `apMac` VARCHAR(191) NOT NULL,
    `deviceMac` VARCHAR(191) NOT NULL,
    `ssid` VARCHAR(191) NOT NULL,
    `redirectUrl` VARCHAR(191) NULL DEFAULT '/',
    `unifiTimestamp` BIGINT NULL,
    `authorized` TINYINT NOT NULL DEFAULT 0,
    `tiempo` INTEGER NOT NULL DEFAULT 60,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `WifiComunidadRegistro_documento_idx` ON `WifiComunidad-Registro`(`documento`);

-- CreateIndex
CREATE INDEX `WifiComunidadRegistro_deviceMac_idx` ON `WifiComunidad-Registro`(`deviceMac`);

-- CreateIndex
CREATE INDEX `WifiComunidadRegistro_sitioid_idx` ON `WifiComunidad-Registro`(`sitioid`);
