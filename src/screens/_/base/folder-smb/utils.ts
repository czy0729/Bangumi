/*
 * @Author: czy0729
 * @Date: 2022-06-14 12:14:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-14 12:14:16
 */
export function getUrl(smb, folder, fileName = '') {
  try {
    const { sharedFolder } = smb
    const { path: folderPath, name: folderName } = folder

    // smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]
    const path = []
    if (sharedFolder) path.push(sharedFolder)
    if (folderPath) path.push(folderPath)
    if (folderName) path.push(folderName)
    return smb.url
      .replace(/\[USERNAME\]/g, smb.username)
      .replace(/\[PASSWORD\]/g, smb.password)
      .replace(/\[IP\]/g, smb.port ? `${smb.ip}:${smb.port}` : smb.ip)
      .replace(/\[PATH\]/g, path.join('/'))
      .replace(/\[FILE\]/g, fileName)
  } catch (error) {
    return ''
  }
}
