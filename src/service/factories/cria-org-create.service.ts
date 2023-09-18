import { PrismaOrgRepository } from "@/repositories/prisma/prisma-org-repository";
import { OrgsCreateService } from "../orgs/create";

export function criaOrgCreateService() {
  const orgsRepository = new PrismaOrgRepository();
  const orgsCreateService = new OrgsCreateService(orgsRepository);

  return orgsCreateService;
}
