import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetsService } from "./create";
import { FetchPetsCityService } from "./fetch-pets-city";

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

  it("Deve ser capaz de buscar os pets pela cidade", async () => {
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
      age: "filhote",
      energy: 2,
      size: "grande",
      independence: "alta",
      type: "gato",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "salvador",
      age: "adolescente",
      energy: 2,
      size: "medio",
      independence: "alta",
      type: "cachorro",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "adolescente",
      energy: 2,
      size: "medio",
      independence: "alta",
      type: "cachorro",
      photo: "",
      orgId: "org-id",
    });

    const { pets } = await sut.execute({
      city: "cuiab",
    });

    expect(pets).toHaveLength(2);
  });

  it("Deve ser capaz de buscar os pets pela cidade e suas caracteristicas", async () => {
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
      age: "filhote",
      energy: 2,
      size: "grande",
      independence: "alta",
      type: "gato",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "salvador",
      age: "adolescente",
      energy: 2,
      size: "medio",
      independence: "alta",
      type: "cachorro",
      photo: "",
      orgId: "org-id",
    });

    await createService.execute({
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "adolescente",
      energy: 2,
      size: "medio",
      independence: "alta",
      type: "cachorro",
      photo: "",
      orgId: "org-id",
    });

    const { pets } = await sut.execute({
      city: "cuiab",
      query: {
        size: "medio",
        age: "adolescente",
      },
    });

    expect(pets).toHaveLength(2);
  });
});
