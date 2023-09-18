import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryorgRepository implements OrgsRepository {
  public items: Org[] = [];

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) return null;

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      address: data.address,
      cep: data.cep,
      email: data.email,
      password: data.password,
      whatsappNumber: data.whatsappNumber,
    };

    this.items.push(org);

    return org;
  }
}
