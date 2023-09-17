import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
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

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.organizacao.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  await prisma.organizacao.create({
    data: {
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
    }
  })

  return reply.status(201).send();
}