import connectDB from "../database/db.js";
import productModel from "../models/ProductModel.js";

const getProducts = async (req, res) => {
    connectDB()
    const products = await productModel.find({});
    res.json(products);
}

const getProductById = async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}

const createProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    connectDB()
    const product = new productModel(
        {
            name,
            price,
            description,
            image
        }
    );
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}

const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    
    const product = await productModel.findById(req.params.id);
    
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}

const deleteProduct = async (req, res) => {
    const product = await productModel.findById(req.params.id);
    
    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
}



export { getProducts, getProductById,createProduct, updateProduct, deleteProduct };
