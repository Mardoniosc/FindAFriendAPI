export class OrgObrigatoriaError extends Error {
  constructor() {
    super("Deve ser informado uma organização para cadastro de pets.");
  }
}
