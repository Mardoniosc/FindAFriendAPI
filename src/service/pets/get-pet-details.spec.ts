import { prisma } from "@/lib/prisma";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateService } from "./create";
import { BuscarDetalhesPetService } from "./get-pet-details";

let petsRepository: InMemoryPetsRepository;
let createService: CreateService;
let sut: BuscarDetalhesPetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    createService = new CreateService(petsRepository);
    sut = new BuscarDetalhesPetService(petsRepository);
  });

  it("Deve ser capaz de buscar detalhes do pet", async () => {
    const org = prisma.org.create({
      data: {
        id: "org-id",
        nomeResponsavel: "Nome do Responsavel",
        email: "email@gmail.com",
        cidade: "Cidade",
        estado: "DF",
        latitude: 0,
        longitude: 0,
        cep: "78008120",
        endereco: "Endereco completo aqui",
        whatsapp: "5561984137835",
        password_hash: "123123",
        created_at: new Date(),
      },
    });

    const petCreate = await createService.execute({
      nome: "Eloá",
      sobre: "Elias Erick Giovanni da Conceição",
      idade: "2",
      porte: "pequeno",
      nivelDeEnergia: "Médio",
      nivelDeIndependencia: "médio",
      ambiente: "amplo",
      fotos: [],
      requisitoDoacao: "ter uma casa",
      org: org,
    });

    const { pet } = await sut.execute({
      petId: petCreate.pet.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.porte).toEqual("pequeno");
  });
});
