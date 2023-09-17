import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function organizacoesRoutes(app: FastifyInstance) {
  app.post("/organizacoes", create);
}
