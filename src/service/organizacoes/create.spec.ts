import { InMemoryOrganizacoesRepository } from "@/repositories/in-memory/in-memory-organizacoes-respository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrganizacaoEmailJaCadastradoError } from "../errors/organizacao-email-ja-cadastrado";
import { OrganizacoesCreateService } from "./create";

let organizacoesRepository: InMemoryOrganizacoesRepository;
let sut: OrganizacoesCreateService;

describe("Create Service", () => {
  beforeEach(() => {
    organizacoesRepository = new InMemoryOrganizacoesRepository();
    sut = new OrganizacoesCreateService(organizacoesRepository);

  })

  it("Deve ser capaz de registrar uma organização", async () => {
    const { organizacao } = await sut.execute({
      nomeResponsavel: "Nome do Responsavel",
      email: "emaildaorganizaca@mail.com",
      cidade: "Cidade",
      estado: "DF",
      latitude: 0,
      longitude: 0,
      cep: "78008120",
      endereco: "Endereco completo aqui",
      whatsapp: "5561984137835",
      password: "123123"
    });

    expect(organizacao.id).toEqual(expect.any(String));
  });

  it("deve ser capaz de criar um hash da senha da organização", async () => {
    const { organizacao } = await sut.execute({
      nomeResponsavel: "Nome do Responsavel",
      email: "emaildaorganizaca@mail.com",
      cidade: "Cidade",
      estado: "DF",
      latitude: 0,
      longitude: 0,
      cep: "78008120",
      endereco: "Endereco completo aqui",
      whatsapp: "5561984137835",
      password: "123123"
    })

    const isPasswordCorrectyHashed = await compare(
      "123123",
      organizacao.password_hash
    );

    expect(isPasswordCorrectyHashed).toBe(true);
  });


  it("Não deve ser capaz de registrar uma e-mail duas vezes", async () => {
    const email = "jose_w@exemple.com";

    await sut.execute({
      nomeResponsavel: "Nome do Responsavel",
      email,
      cidade: "Cidade",
      estado: "DF",
      latitude: 0,
      longitude: 0,
      cep: "78008120",
      endereco: "Endereco completo aqui",
      whatsapp: "5561984137835",
      password: "123123"
    });

    await expect(() =>
      sut.execute({
        nomeResponsavel: "Nome do Responsavel",
        email,
        cidade: "Cidade",
        estado: "DF",
        latitude: 0,
        longitude: 0,
        cep: "78008120",
        endereco: "Endereco completo aqui",
        whatsapp: "5561984137835",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(OrganizacaoEmailJaCadastradoError);
  });
});
