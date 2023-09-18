import { AdoptionRequirements, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { AdoptionRequirementsRepository } from "../adoption-requirements-repository";

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirements[] = [];

  async create(data: Prisma.AdoptionRequirementsCreateInput) {
    const adoptionRequirements = {
      id: data.id ?? randomUUID(),
      title: data.title,
      petId: data.pet.connect?.id ?? "",
    };

    this.items.push(adoptionRequirements);

    return adoptionRequirements;
  }
}
