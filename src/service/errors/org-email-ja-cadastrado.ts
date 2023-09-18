export class OrgEmailJaCadastradoError extends Error {
  constructor() {
    super("E-mail já cadastrado!");
  }
}
