import { prisma } from "@/lib/prisma";

import { Prisma } from "@prisma/client";
import { OrgRepository } from "../orgs-repository";

export class PrismaOrgRepository implements OrgRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
