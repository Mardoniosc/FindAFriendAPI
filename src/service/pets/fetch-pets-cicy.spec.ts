import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetsService } from "./create";
import { FetchPetsCityService } from "./fetch-pets-cicy";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryorgRepository;
let createService: CreatePetsService;
let sut: FetchPetsCityService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryorgRepository();
    createService = new CreatePetsService(petsRepository, orgsRepository);
    sut = new FetchPetsCityService(petsRepository);
  });

  it("Deve ser capaz de buscar detalhes do pet", async () => {
    await orgsRepository.create({
      id: "org-id",
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      password: "123123",
      whatsappNumber: "65984575252",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "2",
      energy: 2,
      size: "medium",
      independence: "alta",
      type: "aberto",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "salvador",
      age: "2",
      energy: 2,
      size: "medium",
      independence: "alta",
      type: "aberto",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "2",
      energy: 2,
      size: "medium",
      independence: "alta",
      type: "aberto",
      photo: "",
      orgId: "org-id",
    });

    const { pets } = await sut.execute({
      city: "cuiab",
    });

    expect(pets).toHaveLength(2);
  });
});
