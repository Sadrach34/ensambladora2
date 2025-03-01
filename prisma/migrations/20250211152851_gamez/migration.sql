-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `suspendido` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `componentes` ADD COLUMN `baja` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `activo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ventas` ADD COLUMN `cancelado` VARCHAR(191) NULL;
