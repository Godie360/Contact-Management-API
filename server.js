const express = require("express");
const errorHandler = require("./middlewares/errorhandler");
const connectDB = require("./config/dbConnection");
const { swaggerSpec, swaggerUi } = require('./config/swagger'); 
const dotenv = require("dotenv").config();

connectDB();
const app = express(); 

const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
