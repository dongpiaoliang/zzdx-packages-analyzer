"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHTML = exports.getDependenciesTree = void 0;
const path = require("path");
const fs = require("fs");
/**
 * 生成依赖树
 * @param pkgRootPath
 * @param depth 遍历深度限制
 * @param currentDepth 当前遍历深度
 */
const getDependenciesTree = (pkgRootPath, depth, currentDepth = 0) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentDepth > depth) {
        return undefined;
    }
    const packageJsonPath = path.join(pkgRootPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = yield Promise.resolve(`${packageJsonPath}`).then(s => require(s));
        const packageInfo = {
            name: packageJson.name,
            version: packageJson.version,
            dependencies: []
        };
        const deps = packageJson.dependencies;
        if (deps) {
            for (const dep of Object.keys(deps)) {
                let depPath = path.join(pkgRootPath, 'node_modules', dep);
                if (!fs.existsSync(depPath)) {
                    depPath = path.join(process.cwd(), 'node_modules', dep);
                }
                const depPackageInfo = yield (0, exports.getDependenciesTree)(depPath, depth, currentDepth + 1);
                if (depPackageInfo) {
                    packageInfo.dependencies.push(depPackageInfo);
                }
            }
        }
        return packageInfo;
    }
});
exports.getDependenciesTree = getDependenciesTree;
const convertToEChartsFormat = (logicalTree) => {
    const echartsNodes = [];
    const echartsLinks = [];
    const echartsCategories = [];
    let countID = 0;
    const traverse = (node, dp) => {
        let echartsNode = echartsNodes.find((item) => item.name === node.name && item.value === node.version);
        if (!echartsNode) {
            echartsNode = {
                id: countID.toString(),
                name: node.name,
                symbolSize: 25 - dp * 4,
                x: -200 + dp * 50,
                y: -dp * 100 + countID * 20,
                value: node.version,
                category: String(dp - 1)
            };
            echartsNodes.push(echartsNode);
        }
        echartsCategories.push({ name: String(dp - 1) });
        if (node.dependencies && node.dependencies.length > 0) {
            for (const child of node.dependencies) {
                countID++;
                const childID = countID.toString();
                echartsLinks.push({
                    source: echartsNode.id,
                    target: childID
                });
                traverse(child, dp + 1);
            }
        }
    };
    traverse(logicalTree, 1);
    return { nodes: echartsNodes, links: echartsLinks, categories: echartsCategories };
};
const generateHTML = (resultTree) => {
    const { nodes, links, categories } = convertToEChartsFormat(resultTree);
    try {
        // 读取模板
        const template = fs.readFileSync(path.resolve(__dirname, 'Graph.html'), 'utf8');
        // 定义正则表达式，匹配目标 script 标签
        const scriptPattern = /<script id="dataEcharts">([\s\S]*?)<\/script>/;
        // 要替换为的新内容
        const newScriptContent = `<script id="dataEcharts">\n const dataEcharts = ${JSON.stringify({ nodes, links, categories }, null, 2)} \n<\/script>`;
        // 在内存中替换内容
        const modifiedData = template.replace(scriptPattern, newScriptContent);
        // 将修改后的内容写回到文件中
        fs.writeFileSync('Graph.html', modifiedData, 'utf8');
    }
    catch (err) {
        console.error('Error:', err);
    }
};
exports.generateHTML = generateHTML;
//# sourceMappingURL=index.js.map