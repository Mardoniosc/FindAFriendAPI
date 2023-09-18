import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgObrigatoriaError } from "../errors/org-obrigatoria";
import { CreatePetsService } from "./create";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryorgRepository;
let sut: CreatePetsService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryorgRepository();
    sut = new CreatePetsService(petsRepository, orgsRepository);
  });

  it("Deve ser capaz de cadastrar um pet", async () => {
    const org = await orgsRepository.create({
      id: "org-id",
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      password: "123123",
      whatsappNumber: "65984575252",
    });

    const dadosPet = {
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
    };

    const { pet } = await sut.execute(dadosPet);

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        size: "medium",
        independence: "alta",
        type: "aberto",
      })
    );
  });

  it("Não deve ser capaz de cadastrar um pet sem uma organização", async () => {
    const dadosPet = {
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "2",
      energy: 2,
      size: "medium",
      independence: "alta",
      type: "aberto",
      photo: "",
      orgId: "org-id-inexistente",
    };

    await expect(() => sut.execute(dadosPet)).rejects.toBeInstanceOf(
      OrgObrigatoriaError
    );
  });
});
