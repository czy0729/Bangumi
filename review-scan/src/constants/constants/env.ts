/*
 * @Author: czy0729
 * @Date: 2024-09-02 11:59:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 12:00:19
 */
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import appJson from '@/app.json'
import expoPackageJson from '@/node_modules/expo/package.json'
import { STORYBOOK_IFRAME, WEB } from '../device'

/** 设备名字 */
export const DEVICE_MODEL_NAME = Device.modelName

/** 方向垂直 */
export const ORIENTATION_PORTRAIT = 'PORTRAIT'

/** 方向水平 */
export const ORIENTATION_LANDSCAPE = 'LANDSCAPE'

/** @deprecated 打包 apk 和 bangumi-ios-test 线上 expo 使用35, 打包 ipa 提审需至少使用37 */
export const SDK = parseInt(expoPackageJson.version.split('.')[0])

/** Expo 线上预览唯一标识 */
export const BUNDLE_IDENTIFIER = appJson?.expo?.name

/** 版本号 */
export const VERSION_GITHUB_RELEASE = appJson?.expo?.version

/** APP 打包号 */
export const VERSION_CODE = appJson?.expo?.android?.versionCode

/** 小圣杯助手版本 */
export const VERSION_TINYGRAIL_PLUGIN = appJson.expo.description.split('tinygrail plugin ')[1]

/** Google Play 版本 */
export const VERSION_GOOGLE = appJson.expo.description.includes('google play')

/** 网页端分享模式 (限制操作) */
export const SHARE_MODE = WEB && !STORYBOOK_IFRAME

/** 是否 iOS */
export const IOS = Platform.OS === 'ios'

/** 是否安卓 */
export const ANDROID = !IOS && !WEB

/** 约定 User-Agent https://bangumi.github.io/api */
export const UA = `czy0729/Bangumi/${VERSION_GITHUB_RELEASE} (${IOS ? 'iOS' : 'Android'})` as const

/** 是否安卓 10 之前 */
export const IS_BEFORE_ANDROID_10 = ANDROID && Number(Platform.Version) < 29
