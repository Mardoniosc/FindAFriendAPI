import { Organizacao, Prisma } from "@prisma/client";

export interface OrganizacoesRepository {
  findByEmail(email: string): Promise<Organizacao | null>;

  create(data: Prisma.OrganizacaoCreateInput): Promise<Organizacao>;
}
