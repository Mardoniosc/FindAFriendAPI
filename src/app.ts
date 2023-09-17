import fastify from "fastify";
import { organizacoesRoutes } from "./controller/localizacao/routes";

export const app = fastify();

app.register(organizacoesRoutes);
