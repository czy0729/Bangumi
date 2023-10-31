/*
 * 一键切换当前开发环境
 *  - 因 react-native 各种不可控原因，难以使用 workspace 或者 monorepo 去管理环境
 *  - 到 packages 的每个你需要开发的环境子目录下使用 yarn install 装好包
 *  - 使用命令 yarn env [ios | android | ipa | web] 切换到不同的开发环境
 *  - 若非 mac 环境, 切换环境前应关闭编辑器，不然 node_modules 可能提示被占用
 *  - 主分支以 ios 环境代码为准, 提交 git 前务必切回 ios 环境
 *
 * @Author: czy0729
 * @Date: 2023-10-04 19:53:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 06:38:53
 */
const fs = require('fs')

const envs = ['android', 'ios', 'web']
const __packageJson = './package.json'
const __nodeModules = './node_modules'

// 把当前根目录 node_modules 和 package.json 移动到对应的环境的 packages 目录中
if (fs.existsSync(__packageJson)) {
  let { name } = JSON.parse(fs.readFileSync(__packageJson, 'utf-8'))
  if (name === 'bangumi-pro') name = 'ios'

  console.info(`[env ] current is ${name}`)

  if (envs.includes(name)) {
    const __packageJsonCurrent = `./packages/${name}/package.json`
    const __nodeModulesCurrent = `./packages/${name}/node_modules`

    fs.copyFileSync(__packageJson, __packageJsonCurrent)
    console.info(`[copy] ${__packageJson} -> ${__packageJsonCurrent}`)

    if (fs.existsSync(__nodeModules) && !fs.existsSync(__nodeModulesCurrent)) {
      fs.renameSync(__nodeModules, __nodeModulesCurrent)
      console.info(`[move] ${__nodeModules} -> ${__nodeModulesCurrent}`)
    }
  }
}

// 移动指定环境的 node_modules 和 package.json 到当前根目录
const target = process.argv[2]
if (envs.includes(String(target).trim())) {
  const __packageJsonTarget = `./packages/${target}/package.json`
  const __nodeModulesTarget = `./packages/${target}/node_modules`
  console.info(`[env ] target is ${target}`)

  if (fs.existsSync(__packageJsonTarget)) {
    fs.copyFileSync(__packageJsonTarget, __packageJson)
    console.info(`[copy] ${__packageJsonTarget} -> ${__packageJson}`)
  }

  if (fs.existsSync(__nodeModulesTarget) && !fs.existsSync(__nodeModules)) {
    fs.renameSync(__nodeModulesTarget, __nodeModules)
    console.info(`[move] ${__nodeModulesTarget} -> ${__nodeModules}`)
  }
}

console.info('[done]')
