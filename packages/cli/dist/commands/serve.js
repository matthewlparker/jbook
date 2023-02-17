"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    // square brackets indicate optional value
    .command('serve [filename]')
    .description('Open a file for editing')
    // angled brackets indicate required value
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options) => {
    console.log(filename, options);
});
