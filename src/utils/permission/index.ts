/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 00:00:00
 *
 * Android 存储权限统一入口 (自研 StorageModule 的配套)
 *  - API 29+: MediaStore 贡献自己的文件无需任何存储权限, 直接放行
 *  - API 28-: WRITE_EXTERNAL_STORAGE 动态申请
 */
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'

/**
 * 检查并请求 Android 存储权限
 *
 * @param guided 用户拒绝后是否弹窗引导去系统设置页开启
 * @returns 权限是否验证通过
 */
export async function hasAndroidStoragePermission(guided: boolean = false) {
  if (Platform.OS !== 'android' || Platform.Version >= 29) {
    return true
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) return true

  const status = await PermissionsAndroid.request(permission)
  if (status === 'granted') return true
  if (!guided) return false

  // 用户拒绝，引导去设置页开启
  return new Promise<boolean>(resolve => {
    Alert.alert(
      '需要存储权限',
      '请在设置中开启存储权限，否则无法保存文件',
      [
        { text: '取消', onPress: () => resolve(false) },
        {
          text: '去设置',
          onPress: () => {
            Linking.openSettings()
            resolve(false)
          }
        }
      ],
      { cancelable: false }
    )
  })
}
