import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface FetchPetsCityRequest {
  city: string;
}

interface FetchPetsCityResponse {
  pets: Pet[];
}

export class FetchPetsCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsCityRequest): Promise<FetchPetsCityResponse> {
    const pets = await this.petsRepository.findManyByCity(city);

    return { pets };
  }
}
