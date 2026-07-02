/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 10:00:00
 */
import { PermissionsAndroid, Platform } from 'react-native'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
import { FROZEN_FN } from '@constants/init'

import type { Fn } from '@types'

/** 保存 base64 图片到本地 (iOS，安卓空实现) */
export async function saveBase64ImageToShareSheet(
  _base64Img: string,
  _success: Fn = FROZEN_FN,
  _fail: Fn = FROZEN_FN
) {}

/**
 * 将 Base64 格式的图片保存至系统相册
 * * @param base64Img - Base64 编码的图片字符串
 * @param success - 成功回调函数
 * @param fail - 失败回调函数
 * @returns 是否触发保存流程或写入结果的 Promise
 */
export async function saveBase64ImageToCameraRoll(
  base64Img: string,
  success: Fn = FROZEN_FN,
  fail: Fn = FROZEN_FN
) {
  if (!(await hasAndroidPermission())) return false

  // 使用应用私有缓存目录存储临时文件，避免跨版本的分区存储权限限制
  const dirs = RNFS.CachesDirectoryPath
  const downloadDest = `${dirs}/bangumi_${new Date().getTime()}.jpg`
  const imageData = base64Img.split(';base64,')[1]

  return RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then(() => {
    try {
      CameraRoll.saveToCameraRoll(downloadDest)
        .then(res => {
          // 保存成功后异步清理临时缓存文件
          RNFS.unlink(downloadDest).catch(() => {})
          success(res)
        })
        .catch(error => {
          fail(error)
        })
    } catch (error) {
      fail(error)
    }
  })
}

/**
 * 检查并请求 Android 存储权限
 * * - Android 13 (API 33) 及以上系统：相册写入无需 WRITE_EXTERNAL_STORAGE 权限，直接返回 true
 * - Android 12 及以下系统：检查并动态请求 WRITE_EXTERNAL_STORAGE 权限
 * * @returns 权限是否验证通过
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
