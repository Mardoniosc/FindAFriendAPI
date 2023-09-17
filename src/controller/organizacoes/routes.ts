import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { create } from "./create";

export async function organizacoesRoutes(app: FastifyInstance) {
  app.post("/organizacoes", create);

  app.post("/sessions", authenticate);
}
