export class ErrorUploadCloudinary extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErrorUploadCloudinary'
  }
}

export class ErrorDeleteCloudinary extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErrorDeleteCloudinary'
  }
}
