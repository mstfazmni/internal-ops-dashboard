import express from "express";
import { prisma } from "./prisma";

const app = express();
app.use(express.json());

app.get("/customers", async (req, res) => {
   const customers = await prisma.customer.findMany();
   res.json(customers); 
});

app.get("/customers/:id/summary", async (req, res) => {
    res.json({ message: "not implemented yet" });
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})