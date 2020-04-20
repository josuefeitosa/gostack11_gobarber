import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './configuration/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

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
