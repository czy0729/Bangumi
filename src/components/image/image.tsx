/*
 * @Author: czy0729
 * @Date: 2021-11-23 06:15:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 17:31:13
 */
import { Image } from 'react-native'
import ImageCacheManager from '@utils/thirdParty/image-cache-manager'

export default Image

export async function clearCache() {
  try {
    await ImageCacheManager.clearCache()
    return true
  } catch (error) {}

  return false
}
