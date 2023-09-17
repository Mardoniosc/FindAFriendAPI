import { PrismaOrganizacoesRepository } from "@/repositories/prisma/prisma-organizacoes-repository";
import { OrganizacoesCreateService } from "../organizacoes/create";

export function criaOrganizacoesCreateService() {
  const organizacoesRepository = new PrismaOrganizacoesRepository();
  const organizacoesCreateService = new OrganizacoesCreateService(organizacoesRepository);

  return organizacoesCreateService;
}
