/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * Android: 写入应用缓存目录后存入系统相册
 */
import { PermissionsAndroid, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
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
    if (!(await hasAndroidPermission())) {
      fail(PERMISSION_TIP)
      return
    }

    // 使用应用私有缓存目录存储临时文件，避免跨版本的分区存储权限限制
    const downloadDest = `${RNFS.CachesDirectoryPath}/bangumi_${Date.now()}.jpg`
    const imageData = base64Img.split(';base64,')[1]

    await RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64')
    const res = await CameraRoll.saveToCameraRoll(downloadDest)

    // 保存成功后清理临时缓存文件
    RNFS.unlink(downloadDest).catch(() => {})
    success(res)
  } catch {
    fail('保存失败，请重试')
  }
}

/**
 * 检查并请求 Android 存储权限
 * - Android 13 (API 33) 及以上系统：相册写入无需 WRITE_EXTERNAL_STORAGE 权限，直接返回 true
 * - Android 12 及以下系统：检查并动态请求 WRITE_EXTERNAL_STORAGE 权限
 *
 * @returns 权限是否验证通过
 */
async function hasAndroidPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    return true
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}
