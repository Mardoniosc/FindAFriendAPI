export class OrganizacaoEmailJaCadastradoError extends Error {
  constructor() {
    super("E-mail já cadastrado!");
  }
}
