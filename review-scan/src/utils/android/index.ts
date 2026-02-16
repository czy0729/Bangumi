/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:59:35
 */
import { FROZEN_FN } from '@constants/init'
import { Fn } from '@types'

/** 保存 base64 图片到相册 (安卓) */
export async function saveBase64ImageToCameraRoll(
  _base64Img: string,
  _success: Fn = FROZEN_FN,
  _fail: Fn = FROZEN_FN
) {}

export async function isHighRefreshRateSupported(): Promise<boolean> {
  return false
}

export async function enableHighRefreshRate(): Promise<boolean> {
  return false
}
