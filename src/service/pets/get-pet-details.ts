import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { RecursoNaoEncontradoError } from "../errors/recurso-nao-encontrado";

interface GetPetProfileServiceRequest {
  petId: string;
}

interface GetPetProfileServiceResponse {
  pet: Pet;
}

export class BuscarDetalhesPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetProfileServiceRequest): Promise<GetPetProfileServiceResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new RecursoNaoEncontradoError();
    }

    return { pet };
  }
}
