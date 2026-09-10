/*
 * @Author: czy0729
 * @Date: 2021-11-23 06:15:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:22:04
 */
import FastImage from 'react-native-fast-image'

export default FastImage

/** 仅清除图片内存缓存, 保留磁盘缓存 (运行时退后台自动释放使用) */
export async function clearMemoryCache() {
  try {
    await FastImage.clearMemoryCache()
    return true
  } catch (error) {
    return false
  }
}

export async function clearCache() {
  const memory = await clearMemoryCache()

  try {
    await FastImage.clearDiskCache()
  } catch (error) {
    return false
  }

  return memory
}
