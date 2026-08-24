/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 21:55:00
 */
import { Share } from 'react-native'
import { FileSystem } from '@utils/thirdParty/file-system'
import { FROZEN_FN } from '@constants/init'

import type { OnFail, OnSuccess } from './types'

/** 保存 base64 图片到相册 (安卓空实现) */
export async function saveBase64ImageToCameraRoll(
  _base64Img: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _success: OnSuccess = FROZEN_FN,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _fail: OnFail = FROZEN_FN
) {}

/**
 * 保存 base64 图片到本地 (iOS)
 * - 写入 cacheDirectory 临时文件
 * - 打开系统分享面板，用户可选择"存储到文件"
 */
export async function saveBase64ImageToShareSheet(
  dataUrl: string,
  success: OnSuccess = FROZEN_FN,
  fail: OnFail = FROZEN_FN
) {
  try {
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '')
    const fileUri = `${FileSystem.cacheDirectory}share_${Date.now()}.png`
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64
    })

    const result = await Share.share({
      url: fileUri,
      title: '分享截图'
    })

    if (result.action !== Share.dismissedAction) {
      success()
    }
  } catch (error) {
    fail()
  }
}
