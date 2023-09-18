import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async findManyByCity(city: string, query: any) {
    let pets = this.items.filter((item) => item.city.includes(city));

    if (query) {
      pets = this.items.filter((objeto: any) => {
        for (const key in query) {
          if (query.hasOwnProperty(key)) {
            if (objeto[key] !== query[key]) {
              return false;
            }
          }
        }
        return true;
      });
    }

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
      orgId: data.org.connect?.id ?? "",
    };

    this.items.push(pet);

    return pet;
  }
}
