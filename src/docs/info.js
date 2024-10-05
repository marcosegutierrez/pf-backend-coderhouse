import path from 'path';

// Obtiene la ruta absoluta del directorio raíz del proyecto
const __dirname = path.resolve();

export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce",
      version: "1.0.0",
      description: "Documentacion de API de Ecommerce",
    },
    servers: [
      {
        url: "https://pf-backend-coderhouse.vercel.app/",
        description: "My API Documentation (deploy)",
      },
      {
        url: "http://localhost:3000",
        description: "My API Documentation (local)",
      },
    ],
  },
  apis: [path.join(__dirname, "src/docs/**/*.yml")],
};