/*
 * APP 内各种需要缓存的数据集合
 *
 * @Author: czy0729
 * @Date: 2022-07-14 09:48:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:10:23
 */
import { Override, Loaded, Subject, SubjectId } from '@types'
import { getStorage, setStorage } from '../storage'

const CACHES = {
  /**
   * 条目请求结果
   *  - utils/fetch.v0.ts -> fetchCollectionV0
   * */
  collectionSubject: {} as {
    [k: SubjectId]: Override<
      Subject,
      {
        _loaded: Loaded
      }
    >
  }
}

/** @todo 同时初始化时的竞态优化 */
const INITED: {
  [k: string]: boolean
} = {
  collectionSubject: false
}

type Keys = keyof typeof CACHES

function getKey(key: Keys) {
  return `UTILS|CACHE_MANAGER|${key}`
}

/** 获取 */
export async function get(key: Keys) {
  if (!INITED[key]) {
    const data = (await getStorage(getKey(key))) || CACHES[key]
    CACHES[key] = data
    INITED[key] = true
  }

  return CACHES[key]
}

/** 保存 */
export function set<K extends Keys, T extends typeof CACHES[K]>(key: K, data: T) {
  CACHES[key] = data
  return setStorage(getKey(key), CACHES[key])
}
