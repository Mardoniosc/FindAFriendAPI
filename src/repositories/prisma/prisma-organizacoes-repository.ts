import { prisma } from "@/lib/prisma";

import { Prisma } from "@prisma/client";
import { OrganizacoesRepository } from "../organizacoes-repository";

export class PrismaOrganizacoesRepository implements OrganizacoesRepository {
  async findByEmail(email: string) {
    const organizacao = await prisma.organizacao.findUnique({
      where: {
        email
      }
    })

    return organizacao
  }

  async create(data: Prisma.OrganizacaoCreateInput) {
    const organizacao = await prisma.organizacao.create({
      data,
    });

    return organizacao;
  }
}
