import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  // Initial setup for express server
  const app = express();

  app.use(createCellsRouter(filename, dir));

  // Serve React to browser...
  if (useProxy) {
    // ...on development
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        // websocket support
        ws: true,
        // turn off all logs from proxy middleware
        logLevel: 'silent',
      })
    );
  } else {
    // ...on production
    // Apply node's path resolution algorithm to find file location
    const packagePath = require.resolve('@jswb/local-client/build/index.html');
    // Path to the build directory that excludes file name
    app.use(express.static(path.dirname(packagePath)));
  }

  // Asyncify server startup
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
