/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 04:32:23
 *
 * 本地保存文件实现 (Android)
 */
import { Alert, Linking } from 'react-native'
import { info } from '@utils'
import { globalWarn } from '@utils/dev'
import { hasAndroidStoragePermission } from '@utils/permission'
import { saveDownload } from '@utils/thirdParty/storage'

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
 * - 请求存储权限 (Android 9 及以下, 拒绝后引导去设置页开启)
 * - 经自研 StorageModule 写入 Download 目录并收录 (MediaStore / MediaScanner)
 * - 弹出合理引导，尝试直接拉起系统下载目录或提示手动查找
 */
export async function exportLocal(fileName: string, content: string) {
  try {
    // guided 模式下被拒时已弹「去设置」引导, 不再叠加 toast
    if (!(await hasAndroidStoragePermission(true))) {
      return
    }

    const savedName = await saveDownload(fileName, content)

    // 弹出引导提示 (系统自动改名时才附注重名说明)
    const nameTip =
      savedName === fileName
        ? `文件名：${savedName}`
        : `文件名：${savedName}（请求文件名重名，已由系统自动改名）`
    Alert.alert(
      '文件保存成功',
      `文件已保存至「内部存储 / Download」目录\n${nameTip}`,
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
  } catch (e) {
    globalWarn('[storage] exportLocal', e)
    info('保存失败，请重试')
  }
}
