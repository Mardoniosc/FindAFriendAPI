import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findManyByCity(city: string) {
    const pets = this.items.filter((item) => item.city.includes(city));

    return pets;
  }
  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) return null;

    return pet;
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      energy: data.energy,
      size: data.size,
      independence: data.independence,
      type: data.type,
      photo: data.photo,
      orgId: data.org.connect?.id ?? randomUUID(),
    };

    this.items.push(pet);

    return pet;
  }
}
