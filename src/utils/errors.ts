import formaterError from './format';
class HttpError extends Error {

  public statusCode: number;
  
  constructor(statusCode: number,  message: any) {
    const formatErrorMessage = formaterError(message);
    super(formatErrorMessage);
    this.message = formatErrorMessage
    this.statusCode = statusCode
  }
}

class EntityExistingError extends Error {}

export {
  HttpError,
  EntityExistingError
}


