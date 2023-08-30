#!/usr/bin/env node

import { getDependenciesTree, generateHTML } from './index'
import { writeResultToJson, openLocalHTMLFile } from './utils'
import { program } from 'commander'

program
  .version('1.0.0')
  .option('-s, --save', 'Whether to save the json result')
  .option('-o, --open', 'Whether to open the html result')
  .option('-d, --depth <depth>', 'Traverse depth')

program.parse(process.argv)
// 获取选项参数
const options = program.opts()
// 当前项目的根目录，如果在自己的项目中就指的是自己的项目的根目录
const rootPath = process.cwd()

// 遍历深度默认值为3
const depth = Number(options.depth) || 5

getDependenciesTree(rootPath, depth).then((res) => {
  console.log(JSON.stringify(res, null, 2))
  if (options.save) {
    writeResultToJson(res)
  }
  if (options.open) {
    generateHTML(res)
    openLocalHTMLFile('Graph.html')
  }
})
