import { OrganizacoesRepository } from "@/repositories/organizacoes-repository";
import { Organizacao } from "@prisma/client";
import { compare } from "bcryptjs";
import { CredenciaisInvalidasError } from "../errors/credenciais-invalidas";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  organizacao: Organizacao;
}

export class AuthenticateService {
  constructor(private organizacoesRepository: OrganizacoesRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const organizacao = await this.organizacoesRepository.findByEmail(email);

    if (!organizacao) {
      throw new CredenciaisInvalidasError();
    }

    const doesPasswordMatches = await compare(password, organizacao.password_hash);

    if (!doesPasswordMatches) {
      throw new CredenciaisInvalidasError();
    }

    return { organizacao };
  }
}
