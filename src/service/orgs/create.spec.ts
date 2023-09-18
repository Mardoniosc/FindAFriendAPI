import { InMemoryorgRepository } from "@/repositories/in-memory/in-memory-org-respository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgEmailJaCadastradoError } from "../errors/org-email-ja-cadastrado";
import { OrgsCreateService } from "./create";

let orgsRepository: InMemoryorgRepository;
let sut: OrgsCreateService;

describe("Create Service", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryorgRepository();
    sut = new OrgsCreateService(orgsRepository);
  });

  it("Deve ser capaz de registrar uma organização", async () => {
    const { org } = await sut.execute({
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      password: "123123",
      whatsappNumber: "65984575252",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("deve ser capaz de criar um hash da senha da organização", async () => {
    const { org } = await sut.execute({
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email: "emaildaorganizaca@mail.com",
      password: "123123",
      whatsappNumber: "65984575252",
    });

    const isPasswordCorrectyHashed = await compare("123123", org.password);

    expect(isPasswordCorrectyHashed).toBe(true);
  });

  it("Não deve ser capaz de registrar uma e-mail duas vezes", async () => {
    const email = "jose_w@exemple.com";

    await sut.execute({
      name: "Nome do Responsavel",
      address: "Rua coronel escolares, 746",
      cep: "78000-002",
      email,
      password: "123123",
      whatsappNumber: "65984575252",
    });

    await expect(() =>
      sut.execute({
        name: "Nome do Responsavel",
        address: "Rua coronel escolares, 746",
        cep: "78000-002",
        email,
        password: "123123",
        whatsappNumber: "65984575252",
      })
    ).rejects.toBeInstanceOf(OrgEmailJaCadastradoError);
  });
});
