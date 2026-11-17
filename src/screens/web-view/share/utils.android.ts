/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 00:00:00
 *
 * Android: 自研 StorageModule 直接写入系统相册
 */
import { globalWarn } from '@utils/dev'
import { hasAndroidStoragePermission } from '@utils/permission'
import { saveImage } from '@utils/thirdParty/storage'
import { FROZEN_FN } from '@constants/init'

import type { OnFail, OnSuccess } from './types'

/** 保存成功提示 */
export const SAVE_SUCCESS_TIP = '已保存到相册'

/** 无存储权限时的提示 */
const PERMISSION_TIP = '保存失败，请确保给予存储权限'

/**
 * 保存 base64 图片到系统相册
 *
 * @param base64Img base64 编码的图片
 * @param success 保存成功回调
 * @param fail 保存失败回调
 */
export async function saveBase64Image(
  base64Img: string,
  success: OnSuccess = FROZEN_FN,
  fail: OnFail = FROZEN_FN
) {
  try {
    if (!(await hasAndroidStoragePermission())) {
      fail(PERMISSION_TIP)
      return
    }

    const res = await saveImage(base64Img)
    success(res)
  } catch (e) {
    globalWarn('[storage] saveImage', e)
    fail('保存失败，请重试')
  }
}
