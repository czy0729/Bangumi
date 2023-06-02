/*
 * @Author: czy0729
 * @Date: 2023-06-02 21:27:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-02 22:34:32
 */
import hash from '../thirdParty/hash'
import { getTimestamp } from '../date'
import useMount from './useMount'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, number>()

/**
 * 与 react-native 端的差异为
 * 一个相同的 url 30min 内只允许执行一次，防止返回后重新请求
 * */
export default function useRunAfter(fn = () => {}) {
  return useMount(() => {
    const key = hash(`${window.location.pathname}${window.location.search}`)
    if (!cacheMap.has(key) || getTimestamp() - cacheMap.get(key) >= 60 * 30) {
      setTimeout(() => {
        cacheMap.set(key, getTimestamp())
        requestAnimationFrame(() => fn())
      }, 240)
    }
  })
}
