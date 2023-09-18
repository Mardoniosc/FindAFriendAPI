import { CredenciaisInvalidasError } from "@/service/errors/credenciais-invalidas";
import { criaAuthenticateService } from "@/service/factories/cria-authentication.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = criaAuthenticateService()

    await authenticateService.execute({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof CredenciaisInvalidasError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }

  return reply.status(200).send();
}
