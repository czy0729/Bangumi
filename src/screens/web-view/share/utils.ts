/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * iOS: 写入临时文件后唤起系统分享面板
 */
import { Share } from 'react-native'
import {
  cacheDirectory,
  deleteAsync,
  EncodingType,
  writeAsStringAsync
} from '@utils/thirdParty/file-system'
import { FROZEN_FN } from '@constants/init'

import type { OnFail, OnSuccess } from './types'

/** 保存成功提示 */
export const SAVE_SUCCESS_TIP = '已保存'

/**
 * 保存 base64 图片: 写入缓存目录后交系统分享面板保存
 *
 * @param dataUrl base64 图片 Data URL
 * @param success 保存成功回调
 * @param fail 保存失败回调
 */
export async function saveBase64Image(
  dataUrl: string,
  success: OnSuccess = FROZEN_FN,
  fail: OnFail = FROZEN_FN
) {
  const fileUri = `${cacheDirectory}share_${Date.now()}.png`
  try {
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '')
    await writeAsStringAsync(fileUri, base64Data, {
      encoding: EncodingType.Base64
    })

    const result = await Share.share({
      url: fileUri,
      title: '分享截图'
    })

    if (result.action !== Share.dismissedAction) success()
  } catch {
    fail('保存失败，请重试')
  } finally {
    // 分享面板关闭后清理临时文件
    deleteAsync(fileUri, { idempotent: true }).catch(() => {})
  }
}
