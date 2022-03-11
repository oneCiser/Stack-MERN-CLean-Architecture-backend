import formaterError from './format';
class HttpError extends Error {

  public statusCode: number;
  
  constructor(statusCode: number,  error: any) {
    const formatErrorMessage = error.message || error;
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


