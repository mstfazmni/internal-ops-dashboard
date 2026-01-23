// import express framework
import express from "express";
// import customer routes
import customerRoutes from "./routes/customer.routes";
import accountRoutes from "./routes/account.routes";

// initialize express app
const app = express();
// middleware to parse JSON bodies
app.use(express.json());


// *********Defining API endpoints (HTTP Routes)*********

// use customer routes for /customers path
// This means that any request to /customers will be handled by customerRoutes.
app.use("/customers", customerRoutes);

// This means that any request to /accounts will be handled by accountRoutes.
app.use("/accounts", accountRoutes);

// *********End of API endpoints definition*********

// start the server
app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000"); 
})