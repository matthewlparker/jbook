"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    // Initial setup for express server
    const app = (0, express_1.default)();
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    // Serve React to browser...
    if (useProxy) {
        // ...on development
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: 'http://localhost:3000',
            // websocket support
            ws: true,
            // turn off all logs from proxy middleware
            logLevel: 'silent',
        }));
    }
    else {
        // ...on production
        // Apply node's path resolution algorithm to find file location
        const packagePath = require.resolve('local-client/build/index.html');
        // Path to the build directory that excludes file name
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    // Asyncify server startup
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
