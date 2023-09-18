import { PetGallery, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetGalleryRepository } from "../pet-gallery-repository";

export class InMemoryPetsGallery implements PetGalleryRepository {
  public items: PetGallery[] = [];

  async create(data: Prisma.PetGalleryCreateInput) {
    const petGallery = {
      id: data.id ?? randomUUID(),
      image: data.image,
      petId: data.pet.connect?.id ?? "",
    };

    this.items.push(petGallery);

    return petGallery;
  }
}
