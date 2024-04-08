import User from "../models/UserModel";

const checkPermission = async(req, res) => {
    try {
        const token = req.headers.authorization?.split("");
        if(!token) {
            return res.status(401).json({
                message: "No authen",
            });
        }
        const data = jwt.verify(token, process.env.SECRECT_KEY);
        if(!data) {
            return res.status(401).json({
                message: "No authen 2",
            });
        }
        const user = await User.findById(data.id);
        console.log(user);
        if(!user) {
            return res.status(401).json({
                message: "No Found",
            });
        }
        next();
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}