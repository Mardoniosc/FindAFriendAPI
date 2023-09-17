import { InMemoryOrganizacoesRepository } from "@/repositories/in-memory/in-memory-organizacoes-respository";
import { OrganizacoesRepository } from "@/repositories/organizacoes-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { CredenciaisInvalidasError } from "../errors/credenciais-invalidas";
import { AuthenticateService } from "./authentication";

let organizacoesRepository: InMemoryOrganizacoesRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    organizacoesRepository = new InMemoryOrganizacoesRepository();
    sut = new AuthenticateService(organizacoesRepository as OrganizacoesRepository);
  })

  it("Deve ser capaz de se autenticar.", async () => {
    await organizacoesRepository.create({
      nomeResponsavel: "Nome do Responsavel",
      email: "email@gmail.com",
      cidade: "Cidade",
      estado: "DF",
      latitude: 0,
      longitude: 0,
      cep: "78008120",
      endereco: "Endereco completo aqui",
      whatsapp: "5561984137835",
      password_hash: await hash("123123", 6),
    });

    const { organizacao } = await sut.execute({
      email: "email@gmail.com",
      password: "123123",
    });

    expect(organizacao.id).toEqual(expect.any(String));
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
    await organizacoesRepository.create({
      nomeResponsavel: "Nome do Responsavel",
      email: "email@gmail.com",
      cidade: "Cidade",
      estado: "DF",
      latitude: 0,
      longitude: 0,
      cep: "78008120",
      endereco: "Endereco completo aqui",
      whatsapp: "5561984137835",
      password_hash: await hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "email@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(CredenciaisInvalidasError);
  });
});
