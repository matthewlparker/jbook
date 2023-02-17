import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (port: number, filename: string, dir: string) => {
  // Initial setup for express server
  const app = express();
  // 1. Load up react application inside browser
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:3000',
      // websocket support
      ws: true,
      // turn off all logs from proxy middleware
      logLevel: 'silent',
    })
  );

  // 2. Handle active development of React application

  // 3.

  // Asyncify server startup
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
