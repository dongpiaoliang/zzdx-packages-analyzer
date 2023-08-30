"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeResultToJson = exports.openLocalHTMLFile = void 0;
const path = require("path");
const fs = require("fs");
const child_process_1 = require("child_process");
/**
 * 打开项目中的某个文件，区分不同操作系统
 * @param relativeFilePath
 */
const openLocalHTMLFile = (relativeFilePath) => {
    const absoluteFilePath = path.resolve(process.cwd(), relativeFilePath);
    if (fs.existsSync(absoluteFilePath)) {
        const command = process.platform === 'win32' ? 'start' : 'open';
        (0, child_process_1.exec)(`${command} ${absoluteFilePath}`, (error) => {
            if (error) {
                console.error('Error:', error);
            }
        });
    }
    else {
        console.log('File not found.');
    }
};
exports.openLocalHTMLFile = openLocalHTMLFile;
const writeResultToJson = (result) => {
    const jsonContent = JSON.stringify(result, null, 2);
    fs.writeFileSync('result.json', jsonContent);
};
exports.writeResultToJson = writeResultToJson;
//# sourceMappingURL=utils.js.map