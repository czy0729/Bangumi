/*
 * @Author: czy0729
 * @Date: 2025-04-16 11:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-16 12:06:48
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

try {
  // Get version from app.json
  const { version } = JSON.parse(fs.readFileSync('./app.json')).expo
  const appPath = path.join(__dirname, '../ios/build/Build/Products/Release-iphoneos/Bangumi.app')
  const outputFile = path.join(__dirname, `bangumi_v${version}_archive.ipa`)

  // Create temporary directory
  const tempDir = path.join(__dirname, 'temp_payload')
  const payloadDir = path.join(tempDir, 'Payload')

  // Clean up any previous runs
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf "${tempDir}"`)
  }

  // Create directory structure
  fs.mkdirSync(tempDir, { recursive: true })
  fs.mkdirSync(payloadDir, { recursive: true })

  // Verify .app exists
  if (!fs.existsSync(appPath)) {
    throw new Error(`.app file not found at ${appPath}`)
  }

  // Copy .app to Payload
  console.log('Copying .app file...')
  execSync(`cp -R "${appPath}" "${payloadDir}"`)

  // Create IPA (zip)
  console.log('Creating IPA...')
  const originalDir = process.cwd()
  try {
    process.chdir(tempDir)
    execSync(`zip -qr "${outputFile}" Payload`)
  } finally {
    process.chdir(originalDir)
  }

  // Clean up
  console.log('Cleaning up...')
  execSync(`rm -rf "${tempDir}"`)

  console.log(`Successfully created IPA: ${outputFile}`)
} catch (error) {
  console.error('Error creating IPA:', error.message)
  process.exit(1)
}
