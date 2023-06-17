/*
 * @Author: czy0729
 * @Date: 2022-08-06 13:14:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-06 13:14:01
 */
import Crypto from '../crypto'

export const HOST = Crypto.get(
  'U2FsdGVkX19sKQa+Q0MrgGAoUhowY87a3+FsQyrAcNCiMLDVhjAmyghrdc2h9lO5mEnKOzxNbgEVmyGYnTeLsw=='
)

/** 唯一性标记, 完全一样的 POST 请求不会发送第二次 */
export const UPDATE_CACHE_MAP = new Map<string, boolean>()
