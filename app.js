const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "staging"}`; // Defaults to 'development' if NODE_ENV is not set
dotenv.config({ path: envFile });

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de proyecto para Altertex",
      version: "1.0.0",
      description: "Documentación generada con Swagger",
    },
    servers: [
      {
        url: process.env.API_GATEWAY_URL,
      },
    ],
  },
  apis: [""], // agregar las rutas a los archivos que contienen los endpoints
};

const specs = swaggerJsDoc(options);

app.use(express.json());

app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.DEPLOYED_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Allow cookies
  })
);

app.use(cookieParser());

app.get("/", async (req, res) => {
  res.status(201).json({ message: "Proyecto TEXT&LINES" });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `Server running on port ${port} ${port} in ${process.env.NODE_ENV} mode.`
  ));
