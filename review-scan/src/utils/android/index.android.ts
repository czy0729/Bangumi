/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:49:59
 */
import { PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
import { FROZEN_FN } from '@constants/init'
import { Fn } from '@types'

// import { NativeModules } from 'react-native'
// const { HighRefreshRateModule } = NativeModules

/** 保存 base64 图片到相册 */
export async function saveBase64ImageToCameraRoll(
  base64Img: string,
  success: Fn = FROZEN_FN,
  fail: Fn = FROZEN_FN
) {
  if (!(await hasAndroidPermission())) return false

  // 外部文件，共享目录的绝对路径
  const dirs = RNFS.ExternalDirectoryPath
  const downloadDest = `${dirs}/bangumi_${new Date().getTime()}.jpg`
  const imageData = base64Img.split(';base64,')[1]

  return RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then(() => {
    try {
      CameraRoll.saveToCameraRoll(downloadDest)
        .then(res => {
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

/** 检查权限 */
async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}

export const isHighRefreshRateSupported = async () => {
  // try {
  //   const isSupported = await HighRefreshRateModule.isHighRefreshRateSupported()
  //   return isSupported
  // } catch (error) {
  //   console.error('Failed to check high refresh rate support:', error)
  //   return false
  // }
}

export const enableHighRefreshRate = async () => {
  // try {
  //   const success = await HighRefreshRateModule.enableHighRefreshRate()
  //   return success
  // } catch (error) {
  //   console.error('Failed to enable high refresh rate:', error)
  //   return false
  // }
}
