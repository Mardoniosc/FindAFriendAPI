import { OrgRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { AdoptionRequirements, Org, Pet, PetGallery } from "@prisma/client";
import { OrgObrigatoriaError } from "../errors/org-obrigatoria";

interface CreateServiceRequest {
  name: string;
  description: string;
  city: string;
  age: string;
  energy: number;
  size: string;
  independence: string;
  type: string;
  photo: string;
  orgId: string;
  org?: Org;
  pets?: PetGallery;
  adoptionRequirements?: AdoptionRequirements;
}

interface CreateServiceResponse {
  pet: Pet;
}

export class CreatePetsService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgRepository
  ) {}

  async execute({
    name,
    description,
    city,
    age,
    energy,
    size,
    independence,
    type,
    photo,
    orgId,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new OrgObrigatoriaError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      city,
      age,
      energy,
      size,
      independence,
      type,
      photo,
      org,
    });

    return { pet };
  }
}
