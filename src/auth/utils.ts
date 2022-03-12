import jwt from 'jsonwebtoken';

const encodeToken = (payload: any, secret: string, expiresIn: any = 0): string => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

export {
    encodeToken
}