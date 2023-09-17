-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "nivelDeEnergia" TEXT NOT NULL,
    "nivelDeIndependencia" TEXT NOT NULL,
    "ambiente" TEXT NOT NULL,
    "fotos" TEXT[],
    "requisitoDoacao" TEXT NOT NULL,
    "localizacaoId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localizacao" (
    "id" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "localizacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_localizacaoId_fkey" FOREIGN KEY ("localizacaoId") REFERENCES "localizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
