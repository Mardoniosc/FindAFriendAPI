import { Organizacao, Prisma, } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrganizacoesRepository } from "../organizacoes-repository";

export class InMemoryOrganizacoesRepository implements OrganizacoesRepository {
  public items: Organizacao[] = [];

  async findByEmail(email: string) {
    const organizacao = this.items.find((item) => item.email === email);

    if (!organizacao) return null;

    return organizacao;
  }

  async create(data: Prisma.OrganizacaoCreateInput) {
    const organizacao = {

      id: data.id ?? randomUUID(),
      nomeResponsavel: data.nomeResponsavel,
      email: data.email,
      cidade: data.cidade,
      estado: data.estado,
      latitude: data.latitude,
      longitude: data.longitude,
      cep: data.cep,
      endereco: data.endereco,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(organizacao);

    return organizacao;
  }
}
