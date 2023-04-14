import express from "express";
import swaggerUiExpress from "swagger-ui-express"
import yaml from 'yamljs'
import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';
import { fileURLToPath } from 'url';

const documentSwagger = yaml.load(`src/swagger.yaml`)

const app = express();

app.use(express.json())

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config = {
    apiSpec: documentSwagger,
    operationHandlers:__dirname
}

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(documentSwagger))

app.use(OpenApiValidator.middleware({...config}))

app.listen(8081,() => {
    console.log('Rodando na porta 8081')
})

export default app;

