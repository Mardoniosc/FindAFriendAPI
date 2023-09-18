import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { AuthenticateService } from "../auth/authentication";

export function criaAuthenticateService() {
  const orgsRepository = new PrismaOrgRepository();
  const authenticateService = new AuthenticateService(orgsRepository);

  return authenticateService;
}
