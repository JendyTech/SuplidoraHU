export class ErrorHash extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErrorHash'
    this.message = message
  }
}
