import express from "express";

const app = express();
//middleware
app.use(express.json());

const products = [];

app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        data: newProduct,
    });
});


//newly added
app.get("/", (req, res) => {
    res.send("Products Non-Persistent App is running successfully!");
});

app.get("/products", (req, res) => {
    res.status(200).json({
        message: "All products fetched successfully",
        data: products,
    });
});

app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((prod) => prod.id === productId);

    if (product) {
        res.status(200).json({
            message: "Product fetched successfully",
            data: product,
        });
    } else {
        res.status(404).json({
            message: "Product not found",
        });
    }
});

app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((prod) => prod.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...req.body, id: productId };
        res.status(200).json({
            message: "Product updated successfully",
            data: products[index],
        });
    } else {
        res.status(404).json({
            message: "Product not found",
        });
    }
});

app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((prod) => prod.id === productId);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct[0],
        });
    } else {
        res.status(404).json({
            message: "Product not found",
        });
    }
});

// const PORT = 4000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


//newly added

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});