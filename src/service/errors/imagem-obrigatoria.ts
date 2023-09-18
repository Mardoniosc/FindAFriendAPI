export class ImagemObrigatóriaError extends Error {
  constructor() {
    super("É obrigatório informar pelo menos uma imagem.");
  }
}
