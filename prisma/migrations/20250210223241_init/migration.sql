/*
  Warnings:

  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `note`;

-- CreateTable
CREATE TABLE `Ventas` (
    `id_ventas` BIGINT NOT NULL AUTO_INCREMENT,
    `id_cliente` BIGINT NULL,
    `id_componen` BIGINT NULL,
    `Monto` DECIMAL(65, 30) NULL,
    `FechaHora` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_ventas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `Id_cliente` BIGINT NOT NULL AUTO_INCREMENT,
    `cliente` VARCHAR(191) NULL,
    `Celular` VARCHAR(191) NULL,
    `Domicilio` VARCHAR(191) NULL,

    PRIMARY KEY (`Id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `Id_usuario` BIGINT NOT NULL AUTO_INCREMENT,
    `Usuario` VARCHAR(191) NULL,
    `Cuenta` VARCHAR(191) NULL,
    `Clave` VARCHAR(191) NULL,
    `nivel` INTEGER NULL,
    `Idioma` INTEGER NULL,

    PRIMARY KEY (`Id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Componentes` (
    `id_componen` BIGINT NOT NULL AUTO_INCREMENT,
    `componente` VARCHAR(191) NULL,
    `precio` INTEGER NULL,
    `Disponible` INTEGER NULL,

    PRIMARY KEY (`id_componen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
