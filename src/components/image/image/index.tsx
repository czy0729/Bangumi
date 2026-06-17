/*
 * @Author: czy0729
 * @Date: 2021-11-23 06:15:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 20:32:04
 */
import { Image as RNImage } from 'react-native'
import ImageCacheManager from '@utils/thirdParty/image-cache-manager'

export default RNImage

export async function clearCache() {
  try {
    await ImageCacheManager.clearCache()
    return true
  } catch {}

  return false
}
