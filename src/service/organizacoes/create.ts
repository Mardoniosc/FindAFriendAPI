import { Organizacao } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrganizacaoEmailJaCadastradoError } from "../errors/organizacao-email-ja-cadastrado";

interface CreateServiceRequest {
  nomeResponsavel: string,
  email: string,
  estado: string,
  cidade: string,
  latitude: number,
  longitude: number,
  cep: string,
  endereco: string,
  whatsapp: string,
  password: string,
}

interface CreateServiceResponse {
  organizacao: Organizacao;
}

export class OrganizacoesCreateService {

  constructor(private organizacoesRepository: any) { }

  async execute({
    nomeResponsavel,
    email,
    estado,
    cidade,
    latitude,
    longitude,
    cep,
    endereco,
    whatsapp,
    password,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const password_hash = await hash(password, 6);

    const organizacaoWithSameEmail = await this.organizacoesRepository.findByEmail(email)

    if (organizacaoWithSameEmail) {
      throw new OrganizacaoEmailJaCadastradoError();
    }

    const organizacao = await this.organizacoesRepository.create({
      nomeResponsavel,
      email,
      estado,
      cidade,
      latitude,
      longitude,
      cep,
      endereco,
      whatsapp,
      password_hash,
    })

    return { organizacao }
  }
}
