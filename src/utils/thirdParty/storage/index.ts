/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 00:00:00
 *
 * 自研 react-native-fs / rn-fetch-blob / @react-native-community/cameraroll 最小替代 (Android)
 *  - 相册保存与 Download 写入由原生 StorageModule 实现
 *    (android/app/src/main/java/com/czy0729/bangumi/storage/StorageModule.java)
 *  - 缓存目录读写删走 @utils/thirdParty/file-system (expo-file-system)
 */
import { NativeModules } from 'react-native'

type StorageModuleType = {
  /** 保存纯 base64 图片到系统相册, 返回相册 URI */
  saveImage: (base64Data: string, mimeType: string) => Promise<string>

  /** 保存文本文件到系统 Download 目录, 返回实际落盘文件名 */
  saveDownload: (fileName: string, content: string) => Promise<string>
}

/** 调用时取值而非模块顶层捕获, 便于测试注入 mock */
function getStorageModule(): StorageModuleType {
  const module = NativeModules.StorageModule
  if (!module) {
    throw new Error(
      '[storage] StorageModule 未注册, 请确认运行于 Android 且 APK 为最新构建'
    )
  }
  return module as StorageModuleType
}

/** Data URL: MIME 可带参数 (如 ;charset=utf-8), 但必须以 ;base64, 结尾 */
const DATA_URL_REG = /^data:(image\/[\w.+-]+)(?:;[^;,]*)*;base64,/

/**
 * 保存 base64 图片到系统相册
 * - 接收 base64 Data URL (或纯 base64, 按 jpeg 处理)
 *
 * @param dataUrl base64 图片
 * @returns 相册 URI
 */
export async function saveImage(dataUrl: string): Promise<string> {
  const matched = dataUrl.match(DATA_URL_REG)
  if (!matched) {
    if (dataUrl.startsWith('data:')) {
      // 形似 Data URL 但解析不出 base64 数据, 显式报错而不是传给原生静默失败
      throw new Error('[storage] 无法解析图片 Data URL, 需要以 ;base64, 结尾')
    }
    return getStorageModule().saveImage(dataUrl, 'image/jpeg')
  }
  return getStorageModule().saveImage(dataUrl.slice(matched[0].length), matched[1])
}

/**
 * 保存文本文件到系统 Download 目录
 *
 * @param fileName 文件名 (如 123_2026-11-18_12-00-00.json)
 * @param content 文本内容
 * @returns 实际落盘的文件名 (重名时原生自动改名, 不会覆盖已有文件)
 */
export async function saveDownload(fileName: string, content: string): Promise<string> {
  return getStorageModule().saveDownload(fileName, content)
}
