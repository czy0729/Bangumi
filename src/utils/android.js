/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-10 00:15:39
 */
import { PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
import { IOS } from '@constants'

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}

/**
 * 保存base64图片到相册
 * @param {*} base64
 * @param {*} success
 * @param {*} fail
 */
export async function saveBase64ImageToCameraRoll(
  base64Img,
  success = Function.prototype,
  fail = Function.prototype
) {
  // iOS Expo 端需要另外用 expo sdk 自带的 api 实现
  if (IOS) return false

  if (!IOS && !(await hasAndroidPermission())) return false

  const dirs = IOS ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath // 外部文件，共享目录的绝对路径（仅限android）
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

  // return RNFS.downloadFile({
  //   fromUrl: imageData,
  //   toFile: downloadDest
  // })
  //   .promise.then(async res => {
  //     if (res?.statusCode === 200) {
  //       CameraRoll.saveToCameraRoll(`file://${downloadDest}`)
  //         .then(success)
  //         .catch(fail)
  //     }
  //   })
  //   .catch(fail)
}
