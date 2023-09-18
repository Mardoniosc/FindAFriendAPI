import { InMemoryAdoptionRequirementsRepository } from "@/repositories/in-memory/in-memory-adoption-requirements-repository";
import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { InMemoryPetsGallery } from "@/repositories/in-memory/in-memory-pet-gallery-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { File } from "buffer";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgObrigatoriaError } from "../errors/org-obrigatoria";
import { CreatePetsService } from "./create";
import { CreateServiceRequest } from "./models/pets.mode";

let petsRepository: InMemoryPetsRepository;
let petGalleryRepository: InMemoryPetsGallery;
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository;
let orgsRepository: InMemoryorgRepository;
let sut: CreatePetsService;

export const file = new File([""], "file_name_envio.png", {
  type: "image/png",
});

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryorgRepository();
    petGalleryRepository = new InMemoryPetsGallery();
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository();
    sut = new CreatePetsService(
      petsRepository,
      petGalleryRepository,
      adoptionRequirementsRepository,
      orgsRepository
    );
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

    const dadosPet: CreateServiceRequest = {
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "filhote",
      energy: 2,
      size: "medio",
      independence: "media",
      type: "cachorro",
      photo: "",
      orgId: "org-id",
      adoptionRequirements: ["tipo1", "tipo2"],
      images: [file],
    };

    const { pet } = await sut.execute(dadosPet);

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        size: "medio",
        independence: "media",
        type: "cachorro",
      })
    );
  });

  it("Não deve ser capaz de cadastrar um pet sem uma organização", async () => {
    const dadosPet: CreateServiceRequest = {
      name: "Reponsavel",
      description: "alguma descrição",
      city: "cuiaba",
      age: "adolescente",
      energy: 2,
      size: "grande",
      independence: "alta",
      type: "gato",
      photo: "",
      orgId: "org-id-inexistente",
      adoptionRequirements: ["tipo1", "tipo2"],
      images: [],
    };

    await expect(() => sut.execute(dadosPet)).rejects.toBeInstanceOf(
      OrgObrigatoriaError
    );
  });
});
