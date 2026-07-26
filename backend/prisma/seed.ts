import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'T-shirt Essentiel',
        description: 'Coupe droite, coton bio, coloris naturel.',
        price: 29.9,
      },
      {
        name: 'Sweat Oversize',
        description: 'Molleton épais, coupe ample, unisexe.',
        price: 59.9,
      },
      {
        name: 'Casquette Logo',
        description: 'Coton canvas, ajustable, broderie discrète.',
        price: 24.9,
      },
    ],
  });

  console.log('Seed terminé : 3 produits insérés.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });