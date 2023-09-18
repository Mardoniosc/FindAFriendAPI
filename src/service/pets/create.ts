import { PetsRepository } from "@/repositories/pets-repository";
import { Org, Pet } from "@prisma/client";
import { OrgObrigatoriaError } from "../errors/org-obrigatoria";

interface CreateServiceRequest {
  nome: string;
  sobre: string;
  idade: string;
  porte: string;
  nivelDeEnergia: string;
  nivelDeIndependencia: string;
  ambiente: string;
  fotos: string[];
  requisitoDoacao: string;
  org: Org;
}

interface CreateServiceResponse {
  pet: Pet;
}

export class CreateService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    nome,
    sobre,
    idade,
    porte,
    nivelDeEnergia,
    nivelDeIndependencia,
    ambiente,
    fotos,
    requisitoDoacao,
    org,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    if (!org) {
      throw new OrgObrigatoriaError();
    }

    const pet = await this.petsRepository.create({
      nome,
      sobre,
      idade,
      porte,
      nivelDeEnergia,
      nivelDeIndependencia,
      ambiente,
      fotos,
      requisitoDoacao,
      org,
    });

    return { pet };
  }
}
