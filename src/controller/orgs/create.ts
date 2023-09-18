import { OrgEmailJaCadastradoError } from "@/service/errors/org-email-ja-cadastrado";
import { criaOrgCreateService } from "@/service/factories/cria-org-create.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    cep: z.string(),
    email: z.string(),
    password: z.string(),
    whatsappNumber: z.string(),
  });

  const { name, address, cep, email, password, whatsappNumber } =
    registerBodySchema.parse(request.body);

  try {
    const orgsService = criaOrgCreateService();

    await orgsService.execute({
      name,
      address,
      cep,
      email,
      password,
      whatsappNumber,
    });
  } catch (error) {
    if (error instanceof OrgEmailJaCadastradoError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
