export class ErrorSaveData extends Error {
  constructor(message: string) {
    super('Error saving data')
    this.name = 'ErrorSaveData'
    this.message = message
  }
}

export class ErrorFound extends Error {
  constructor(message: string) {
    super('Error finding user')
    this.name = 'ErrorFindUser'
    this.message = message
  }
}
