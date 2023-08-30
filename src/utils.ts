import * as path from 'path'
import * as fs from 'fs'
import { exec } from 'child_process'
import { PackageInfo } from '../types'

/**
 * 打开项目中的某个文件，区分不同操作系统
 * @param relativeFilePath
 */
export const openLocalHTMLFile = (relativeFilePath: string): void => {
  const absoluteFilePath: string = path.resolve(process.cwd(), relativeFilePath)
  if (fs.existsSync(absoluteFilePath)) {
    const command = process.platform === 'win32' ? 'start' : 'open'
    exec(`${command} ${absoluteFilePath}`, (error) => {
      if (error) {
        console.error('Error:', error)
      }
    })
  } else {
    console.log('File not found.')
  }
}

export const writeResultToJson = (result: PackageInfo) => {
  const jsonContent = JSON.stringify(result, null, 2)
  fs.writeFileSync('result.json', jsonContent)
}
