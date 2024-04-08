import { Router } from "express";
import productRouter from "./products.js";
import authRouter from "./auth.js";
const router = Router();
// export default function routes(app) {
//     app.get('/', (req, res) => {
//         res.send('Trang chu');
//     });
//     app.use('/products', productRouter);
// }
router.get("/", (req, res) => {
    res.send("Home");
});
router.use('/products', productRouter);
router.use('/auths', authRouter);

export default router;