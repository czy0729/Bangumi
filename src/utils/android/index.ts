/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 05:52:10
 */
import { Share } from 'react-native'
import { FROZEN_FN } from '@constants/init'
import { FileSystem } from '@utils/thirdParty/file-system'

import type { Fn } from '@types'

/** 保存 base64 图片到相册 (安卓) */
export async function saveBase64ImageToCameraRoll(
  _base64Img: string,
  _success: Fn = FROZEN_FN,
  _fail: Fn = FROZEN_FN
) {}

/**
 * 保存 base64 图片到本地 (iOS)
 * - 写入 cacheDirectory 临时文件
 * - 打开系统分享面板，用户可选择"存储到文件"
 */
export async function saveBase64ImageToShareSheet(
  dataUrl: string,
  success: Fn = FROZEN_FN,
  fail: Fn = FROZEN_FN
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
