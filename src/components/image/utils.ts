/*
 * @Author: czy0729
 * @Date: 2022-05-28 02:06:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 02:31:28
 */
import { setStorage, getStorage } from '@utils'

const NAMESPACE = 'Component|Image'
const CACHE_KEY = `${NAMESPACE}|CACHE_ERROR_451`

/** 记录 code=451 的图片 */
let CACHE_ERROR_451: {
  [uri: string]: 1
} = {}

setTimeout(async () => {
  try {
    CACHE_ERROR_451 = (await getStorage(CACHE_KEY)) || {}
  } catch (error) {}
}, 0)

/**
 * 记录 code=451 的图片地址
 * @param src
 */
export function setError451(src: string) {
  if (typeof src !== 'string') return false
  if (CACHE_ERROR_451[src]) return true

  CACHE_ERROR_451[src] = 1
  setStorage(CACHE_KEY, CACHE_ERROR_451)
}

/**
 * 检查是否存在过 code=451 返回
 * @param src
 */
export function checkError451(src: string): boolean {
  if (typeof src !== 'string') return false
  return !!CACHE_ERROR_451[src]
}
