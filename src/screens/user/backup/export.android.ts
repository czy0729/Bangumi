/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 12:00:00
 */
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import { info } from '@utils'

/**
 * 检查并请求 Android 存储权限
 *
 * - Android 13 (API 33) 及以上: 分区存储已生效，应用可直接在 Download 目录
 *   创建新文件，无需任何存储权限，直接放行
 * - Android 12 及以下: 保留传统权限检查和请求逻辑
 * - 用户拒绝后引导去设置页开启
 */
async function hasAndroidPermission() {
  // Android 13+ 分区存储，无需申请旧的 WRITE_EXTERNAL_STORAGE
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    return true
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  if (status === 'granted') return true

  // 用户拒绝，引导去设置页开启
  return new Promise<boolean>(resolve => {
    Alert.alert(
      '需要存储权限',
      '请在设置中开启存储权限，否则无法保存文件',
      [
        { text: '取消', onPress: () => resolve(false) },
        {
          text: '去设置',
          onPress: () => {
            Linking.openSettings()
            resolve(false)
          }
        }
      ],
      { cancelable: false }
    )
  })
}

/**
 * 打开系统 Download 目录
 */
export async function openDownloadDir() {
  const downloadUrl = 'content://com.android.providers.downloads.documents/root/downloads'
  try {
    const canOpen = await Linking.canOpenURL(downloadUrl)
    if (canOpen) {
      await Linking.openURL(downloadUrl)
    } else {
      info('请打开手机自带的「文件管理」，在「Download」文件夹中查看')
    }
  } catch {
    info('请打开手机自带的「文件管理」，在「Download」文件夹中查看')
  }
}

/**
 * 保存文件到本地 (Android)
 * - 请求存储权限
 * - 写入 Download 目录
 * - 通知 MediaScanner 扫描新文件
 * - 弹出合理引导，尝试直接拉起系统下载目录或提示手动查找
 */
export async function exportLocal(fileName: string, content: string) {
  try {
    if (!(await hasAndroidPermission())) {
      info('需要存储权限才能保存文件')
      return
    }

    const downloadDir = RNFS.DownloadDirectoryPath
    const filePath = `${downloadDir}/${fileName}`
    await RNFS.writeFile(filePath, content, 'utf8')

    // 通知 MediaScanner 扫描文件，使其能立刻在文件管理器中被搜到
    await RNFS.scanFile(filePath)

    // 弹出引导提示
    Alert.alert(
      '文件保存成功',
      `文件已保存至「内部存储 / Download」目录\n文件名：${fileName}`,
      [
        {
          text: '知道了',
          style: 'cancel'
        },
        {
          text: '去查看',
          onPress: openDownloadDir
        }
      ],
      { cancelable: true }
    )
  } catch {
    info('保存失败，请重试')
  }
}
