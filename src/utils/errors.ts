class HttpError extends Error {

  public statusCode: number;
  
  constructor(statusCode: number,  message: string) {
    super(message);
    this.message = message
    this.statusCode = statusCode
  }
}

class EntityExistingError extends Error {}

export {
  HttpError,
  EntityExistingError
}


