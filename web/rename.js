/*
 * @Author: czy0729
 * @Date: 2022-03-17 16:07:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 19:24:27
 */
const fs = require('fs')
const path = require('path')
const { version } = JSON.parse(fs.readFileSync('./app.json')).expo
const url = path.join(__dirname, '../android/app/build/outputs/apk/release')

const codes = ['arm64-v8a', 'armeabi-v7a', 'universal', 'x86_64']
codes.forEach(item => {
  try {
    fs.renameSync(
      `${url}/app-${item}-release.apk`,
      `${url}/bangumi_v${version}_${item}.apk`
    )
  } catch (error) {
    console.log(error)
  }
})

process.exit()
