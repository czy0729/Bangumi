/*
 * @Author: czy0729
 * @Date: 2021-11-23 06:15:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:22:04
 */
import FastImage from 'react-native-fast-image'

export default FastImage

export async function clearCache() {
  try {
    await FastImage.clearMemoryCache()
    await FastImage.clearDiskCache()
    return true
  } catch (error) {
    return false
  }
}
