import { OrgRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgEmailJaCadastradoError } from "../errors/org-email-ja-cadastrado";

interface CreateServiceRequest {
  name: string;
  address: string;
  cep: string;
  email: string;
  password: string;
  whatsappNumber: string;
}

interface CreateServiceResponse {
  org: Org;
}

export class OrgsCreateService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    address,
    cep,
    email,
    password,
    whatsappNumber,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgEmailJaCadastradoError();
    }

    const org = await this.orgRepository.create({
      name,
      address,
      cep,
      email,
      password: password_hash,
      whatsappNumber,
    });

    return { org };
  }
}
