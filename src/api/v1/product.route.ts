import { Router, Request, Response, NextFunction } from "express";
import ProductController from "../../controllers/product";
import { uploadImage } from "../../config/multer";

const productRouter: Router = Router();

productRouter.post("/create", (req: Request, res: Response, next: NextFunction) =>
    ProductController.create(req, res, next)
);
productRouter.get("/list", (req: Request, res: Response, next: NextFunction) =>
    ProductController.getAll(req, res, next)
);
productRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    ProductController.get(req, res, next)
);
productRouter.put("/:id", (req: Request, res: Response, next: NextFunction) =>
    ProductController.update(req, res, next)
);
productRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    ProductController.delete(req, res, next)
);

productRouter.patch("/:id/photo", uploadImage.single("photo"),(req: Request, res: Response, next: NextFunction) =>
    ProductController.upLoadPhoto(req, res, next)
);

export default productRouter;