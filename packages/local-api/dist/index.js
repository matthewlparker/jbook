"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const serve = (port, filename, dir) => {
    // Initial setup for express server
    const app = (0, express_1.default)();
    // 1. Load up react application inside browser
    app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
        target: 'http://localhost:3000',
        // websocket support
        ws: true,
        // turn off all logs from proxy middleware
        logLevel: 'silent',
    }));
    // 2. Handle active development of React application
    // 3.
    // Asyncify server startup
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
