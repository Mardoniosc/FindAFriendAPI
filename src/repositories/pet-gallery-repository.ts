import { PetGallery, Prisma } from "@prisma/client";

export interface PetGalleryRepository {
  create(data: Prisma.PetGalleryCreateInput): Promise<PetGallery>;
}
