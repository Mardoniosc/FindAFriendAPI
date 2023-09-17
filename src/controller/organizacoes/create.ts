import { PrismaOrganizacoesRepository } from "@/repositories/prisma/prisma-organizacoes-repository";
import { OrganizacaoEmailJaCadastradoError } from "@/service/errors/organizacao-email-ja-cadastrado";
import { OrganizacoesCreateService } from "@/service/organizacoes/create";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nomeResponsavel: z.string(),
    email: z.string(),
    estado: z.string(),
    cidade: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    cep: z.string(),
    endereco: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  });

  const {
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
  } = registerBodySchema.parse(request.body);

  try {
    const organizacoesRepository = new PrismaOrganizacoesRepository()
    const organizacoesService = new OrganizacoesCreateService(organizacoesRepository)

    await organizacoesService.execute({
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
    })
  } catch (error) {
    if (error instanceof OrganizacaoEmailJaCadastradoError) {
      return reply.status(409).send(error);
    }

    throw error;
  }

  return reply.status(201).send();
}