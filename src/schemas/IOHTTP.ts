interface IResponse {
    statusCode: number;
    message?: any;
    error?: any,
    data?: any
}

class ResponseSchema implements IResponse {
    statusCode: number;
    message: any;
    error: any;
    data: any;
    constructor({statusCode = 500, message = null, error = null, data = null}: IResponse) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.data = data;
    }
}

export {
    IResponse,
    ResponseSchema
}