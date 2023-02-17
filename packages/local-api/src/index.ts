import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  // Initial setup for express server
  const app = express();

  // Asyncify server startup
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
