import express from "express";
//import { customAlphabet } from 'nanoid'
//const nanoid = customAlphabet('1234567890', 20)
import { MongoClient, ObjectId } from "mongodb"
import morgan from 'morgan';
import cors from 'cors'
import './config/index.mjs'
import path from "path";
const __dirname = path.resolve();
const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}
@${process.env.CLUSTER_NAME}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(mongodbURI);
const database = client.db('teleshop');
const productsCollection = database.collection('products');

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connection to MongoDB successful");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    console.log("MongoDB not connected");
  }
};
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('yourfile.html', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

connectToMongoDB();

const app = express();
app.use(express.json());
app.use(cors(["http://localhost:3000",]));
app.use(morgan('combined'));

app.get("/products", async (req, res) => {

  const cursor = productsCollection.find({});

  try {
    const allProducts = await cursor.toArray();
    res.send({
      message: "all products",
      data: allProducts
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to get products, please try later" });
  }
});


app.get("/product/:id", async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  try {
    const productData = await productsCollection.findOne({ _id: new ObjectId(req.params.id) });
    res.send({
      message: "product found",
      data: productData
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to get product, please try later" });
  }

});

app.post("/product", async (req, res) => {

  if (!req?.body?.name
    || !req?.body?.brand
    || !req?.body?.model
    || !req?.body?.price
    || !req?.body?.description) {

    res.status(403).send(`
      required parameter missing. example JSON request body:
      {
        name: "abc product",
        brand: "abc",
        model: "xyz",
        price: "$23.12",
        description: "abc product description"
      }`);
  }

  try {
    const doc = {
      name: req?.body?.name,
      brand: req?.body?.brand,
      model: req?.body?.model,
      price: req?.body?.price,
      description: req?.body?.description,
    }

    const result = await productsCollection.insertOne(doc);
    console.log("result: ", result);
    res.status(201).send({ message: "created product" });

  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ message: "Failed to add, please try later" })
  }
});

app.put("/product/:id", async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  if (
    !req.body.name
    && !req?.body?.brand
    && !req?.body?.model
    && !req.body.price
    && !req.body.description) {

    res.status(403).send(`
      required parameter missing. 
      atleast one parameter is required: name, brand, model, price or description to complete update
      example JSON request body:
      {
        name: "abc product",
        brand: "abc",
        model: "xyz",
        price: "$23.12",
        description: "abc product description"
    }`);
    return;
  }

  let product = {}

  if (req.body.name) product.name = req.body.name;
  if (req.body.brand) product.brand = req.body.brand;
  if (req.body.model) product.model = req.body.model;
  if (req.body.price) product.price = req.body.price;
  if (req.body.description) product.description = req.body.description;

  try {
    const productData = await productsCollection
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: product }
      );

    console.log("Product updated: ", productData);

    res.send({
      message: "product updated successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to update product, please try later" });
  }

});

app.delete("/product/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(403).send({ message: "incorrect product id" });
    return;
  }

  try {
    const productData = await productsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    console.log("Product deleted: ", productData);

    res.send({
      message: "product deleted successfully"
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "failed to delete product, please try later" });
  }
});

app.get(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "public")));
app.use('/static', express.static(path.join(__dirname, 'static')))


app.use((req, res) => {
  res.status(404).send("not found");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
