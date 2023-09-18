import { QueryParamsProps } from "@/service/pets/models/pets.mode";
import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;

  create(data: Prisma.PetCreateInput): Promise<Pet>;

  findManyByCity(city: string, query: QueryParamsProps | null): Promise<Pet[]>;
}
