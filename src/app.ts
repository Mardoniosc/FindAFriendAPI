import fastify from "fastify";
import { organizacoesRoutes } from "./controller/organizacoes/routes";

export const app = fastify();

app.register(organizacoesRoutes);
