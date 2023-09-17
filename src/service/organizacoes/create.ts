import { prisma } from "@/lib/prisma";
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
  }: CreateServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.organizacao.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new OrganizacaoEmailJaCadastradoError();
    }

    this.organizacoesRepository.create({
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
  }
}
