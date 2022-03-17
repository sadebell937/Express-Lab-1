import express from 'express';


import cors from "cors"
import cartItemRoutes from "./routes/cart-item";

const app = express();

app.use(cors())

app.use(express.json())
app.use("/", cartItemRoutes)

const port = 3000;

app.listen(port, () => console.log('Listening on port: ${port}.'));