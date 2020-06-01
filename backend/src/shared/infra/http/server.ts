import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';
import '@shared/infra/typeorm';

const app = express();

// Access control by origin
app.use(cors());

app.use(express.json());

// Serving Static Files
app.use('/files', express.static(uploadConfig.directory));

// Using routes.ts
app.use(routes);

// Global Exception Handling
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
