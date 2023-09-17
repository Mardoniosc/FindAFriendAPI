import { PrismaOrganizacoesRepository } from "@/repositories/prisma/prisma-organizacoes-repository";
import { AuthenticateService } from "../auth/authentication";

export function criaAuthenticateService() {
  const organizacoesRepository = new PrismaOrganizacoesRepository();
  const authenticateService = new AuthenticateService(organizacoesRepository);

  return authenticateService;
}
