/*
 * @Author: czy0729
 * @Date: 2021-11-23 06:15:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:22:16
 */
import { Image } from 'react-native'
import { CacheManager } from 'react-native-expo-image-cache'

export default Image

export async function clearCache() {
  try {
    await CacheManager.clearCache()
    return true
  } catch (error) {
    return false
  }
}
