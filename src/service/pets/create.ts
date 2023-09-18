import { AdoptionRequirementsRepository } from "@/repositories/adoption-requirements-repository";
import { OrgRepository } from "@/repositories/orgs-repository";
import { PetGalleryRepository } from "@/repositories/pet-gallery-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Org } from "@prisma/client";
import { ImagemObrigatóriaError } from "../errors/imagem-obrigatoria";
import { OrgObrigatoriaError } from "../errors/org-obrigatoria";
import { RequisitosObrigatoriosError } from "../errors/requisitos-obrigatorios";
import {
  CreateServiceRequest,
  CreateServiceResponse,
} from "./models/pets.mode";

export class CreatePetsService {
  constructor(
    private petsRepository: PetsRepository,
    private petGalleryRepository: PetGalleryRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
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
    adoptionRequirements,
    images,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const org: Org | null = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new OrgObrigatoriaError();
    }

    if (!adoptionRequirements.length) {
      throw new RequisitosObrigatoriosError();
    }

    if (!images.length) {
      throw new ImagemObrigatóriaError();
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

    images.forEach(async (image) => {
      await this.petGalleryRepository.create({
        pet: pet,
        image: image.name,
      });
    });

    console.log(images);

    adoptionRequirements.forEach(async (requirement) => {
      await this.adoptionRequirementsRepository.create({
        pet,
        title: requirement,
      });
    });

    return { pet };
  }
}
