import { AdoptionRequirements, Prisma } from "@prisma/client";

export interface AdoptionRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsCreateInput
  ): Promise<AdoptionRequirements>;
}
