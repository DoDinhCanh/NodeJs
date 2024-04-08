import Product from "../models/productModel.js";
class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({
        message: "Hien thi ALL san pham",
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getProductDetail(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Khong the connect",
        });
      }
      res.status(200).json({
        message: "Hien thi chi tiet san pham",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async creatProduct(req, res) {
    // try {
    //   const { error } = creatProductValidation.validate(req.body, {
    //     abortEarly: false,
    //   });
    // } catch (error) {}
    const { title, image, rate } = req.body;

    if (!title) {
      return res.status(401).json({
        message: "Khong de trong title",
      });
    }

    if (!image) {
      return res.status(401).json({
        message: "Khong de trong image",
      });
    }

    const minRate = 1;
    if (rate && rate < minRate) {
      return res.status(400).json({ error: `Rate thap nhat la 1s ${minRate}` });
    }
    const maxRate = 5;
    if (rate && rate > maxRate) {
      return res
        .status(400)
        .json({ error: `Rate khong vuot qua 5s ${maxRate}` });
    }

    try {
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();

      res.status(201).json({
        message: "Tao product thanh cong",
        data: saveProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({
          message: "Khong the update san pham",
        });
      }
      const updateProduct = await Product.findById(req.params.id);
      res.status(200).json({
        message: "Update san pham thanh cong",
        data: updateProduct,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Khong the connect",
        });
      }
      res.status(200).json({
        message: "Xoa san pham thanh cong",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
export default ProductController;
