import { OrgRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import { CredenciaisInvalidasError } from "../errors/credenciais-invalidas";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  org: Org;
}

export class AuthenticateService {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email);
    console.log("Email login => ", org?.email);
    if (!org) {
      throw new CredenciaisInvalidasError();
    }
    console.log("Credenciais", password);
    console.log("Credenciais", org.password);
    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) {
      throw new CredenciaisInvalidasError();
    }

    return { org };
  }
}
