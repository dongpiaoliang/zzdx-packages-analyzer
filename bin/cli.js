#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const utils_1 = require("./utils");
const commander_1 = require("commander");
commander_1.program
    .version('1.0.0')
    .option('-s, --save', 'Whether to save the json result')
    .option('-o, --open', 'Whether to open the html result')
    .option('-d, --depth <depth>', 'Traverse depth');
commander_1.program.parse(process.argv);
// 获取选项参数
const options = commander_1.program.opts();
// 当前项目的根目录，如果在自己的项目中就指的是自己的项目的根目录
const rootPath = process.cwd();
// 遍历深度默认值为3
const depth = Number(options.depth) || 5;
(0, index_1.getDependenciesTree)(rootPath, depth).then((res) => {
    console.log(JSON.stringify(res, null, 2));
    if (options.save) {
        (0, utils_1.writeResultToJson)(res);
    }
    if (options.open) {
        (0, index_1.generateHTML)(res);
        (0, utils_1.openLocalHTMLFile)('Graph.html');
    }
});
//# sourceMappingURL=cli.js.map