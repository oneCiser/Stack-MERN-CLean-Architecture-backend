import { Request } from "express";

export default function createFileUrl(req: Request) {
  return req.secure
    ? "https://"
    : "http://" +
        req.hostname +
        ":" +
        req.socket.localPort +
        "/images/" +
        req?.file?.filename;
}
