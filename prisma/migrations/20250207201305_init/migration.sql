-- CreateTable
CREATE TABLE `Note` (
    `idVentas` BIGINT NOT NULL AUTO_INCREMENT,
    `idCliente` BIGINT NOT NULL,
    `idComponen` BIGINT NOT NULL,
    `monto` DECIMAL(65, 30) NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idVentas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
