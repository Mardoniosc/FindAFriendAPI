export class RequisitosObrigatoriosError extends Error {
  constructor() {
    super("Confirmar que possui os pré-requisitos é obrigatório.");
  }
}
