import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { CredenciaisInvalidasError } from "../errors/credenciais-invalidas";
import { AuthenticateService } from "./authentication";

let orgsRepository: InMemoryorgRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryorgRepository();
    sut = new AuthenticateService(orgsRepository);
  });

  it("Deve ser capaz de se autenticar.", async () => {
    await orgsRepository.create({
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      password: await hash("123123", 6),
      whatsappNumber: "65984575252",
    });

    const { org } = await sut.execute({
      email: "emaildaorganizaca@mail.com",
      password: "123123",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("Não deve ser capaz de se autenticar com e-mail errado.", async () => {
    await expect(() =>
      sut.execute({
        email: "jose_w@exemple.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(CredenciaisInvalidasError);
  });

  it("Não deve ser capaz de autenticar com senha errada.", async () => {
    await orgsRepository.create({
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      whatsappNumber: "65984575252",
      password: await hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "emaildaorganizaca@mail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(CredenciaisInvalidasError);
  });
});
