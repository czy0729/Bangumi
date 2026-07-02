/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-02 10:00:00
 */
import { Share } from 'react-native'
import { FileSystem } from '@utils/thirdParty/file-system'
import { info } from '@utils'

/**
 * 打开系统 Download 目录 (iOS 无此需求，空实现)
 */
export async function openDownloadDir() {}

/**
 * 保存文件到本地 (iOS)
 * - 写入 documentDirectory
 * - 打开分享面板，用户可选择"存储到文件"
 */
export async function exportLocal(fileName: string, content: string) {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`
    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.UTF8
    })

    const result = await Share.share(
      {
        url: fileUri,
        title: fileName
      },
      {
        subject: fileName
      }
    )

    if (result.action === Share.dismissedAction) {
      // 用户取消了分享
    }
  } catch (error) {
    info('保存失败，请重试')
  }
}
