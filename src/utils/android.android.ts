/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 07:57:36
 */
import { PermissionsAndroid } from 'react-native'
import RNCalendarEvents from 'react-native-calendar-events'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from '@react-native-community/cameraroll'
import { IOS } from '@constants/constants'
import { Fn } from '@types'

/**
 * 保存 base64 图片到相册
 * @param {*} base64Img
 * @param {*} success
 * @param {*} fail
 */
export async function saveBase64ImageToCameraRoll(
  base64Img: string,
  success: Fn = () => {},
  fail: Fn = () => {}
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

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}

/**
 * Request calendar authorization. Authorization must be granted before accessing calendar events.
 * https://github.com/wmcmahan/react-native-calendar-events#requestpermissions
 */
export async function RNCalendarEventsRequestPermissions() {
  return RNCalendarEvents.requestPermissions(false)
}

/**
 * For both iOS and Android the pattern is simple; the event needs a title
 * as well as a startDate and endDate. The endDate should also be a date later than the startDate.
 * https://github.com/wmcmahan/react-native-calendar-events/wiki/Creating-basic-event#basic
 */
export async function RNCalendarEventsSaveEvent(
  title: string,
  { startDate = undefined, endDate = undefined, notes = undefined } = {}
) {
  return RNCalendarEvents.saveEvent(title, {
    startDate,
    endDate: endDate || startDate,
    notes
  })
}
