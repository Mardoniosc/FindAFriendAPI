import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepository } from "../orgs-repository";

export class InMemoryorgRepository implements OrgRepository {
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) return null;

    return org;
  }

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
