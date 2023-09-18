import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;

  create(data: Prisma.PetCreateInput): Promise<Pet>;

  findManyByCity(city: string): Promise<Pet[]>;
}
