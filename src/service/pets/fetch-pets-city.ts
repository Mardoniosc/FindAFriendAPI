import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { QueryParamsProps } from "./models/pets.mode";

interface FetchPetsCityRequest {
  city: string;
  query?: QueryParamsProps | null;
}

interface FetchPetsCityResponse {
  pets: Pet[];
}

export class FetchPetsCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    query,
  }: FetchPetsCityRequest): Promise<FetchPetsCityResponse> {
    const pets = await this.petsRepository.findManyByCity(city, query ?? null);

    return { pets };
  }
}
