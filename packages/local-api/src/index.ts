import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  // Initial setup for express server
  const app = express();

  app.listen(port, () => {
    console.log('Listening on port ', port);
  });
};
