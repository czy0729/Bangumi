/*
 * @Author: czy0729
 * @Date: 2023-06-02 21:27:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 18:06:21
 */
import { FROZEN_FN } from '@constants/init'
import { getTimestamp } from '../date'
import hash from '../thirdParty/hash'
import useMount from './useMount'

/** 缓存搜索过的结果 */
const memo = new Map<string, number>()

/**
 * 与 react-native 端的差异为
 * 一个相同的 url 30min 内只允许执行一次，防止返回后重新请求
 * */
export default function useRunAfter(
  fn = FROZEN_FN,

  /** 唯一标识 (web only) */
  name: string = ''
) {
  return useMount(() => {
    const key = hash(`${window.location.pathname}${window?.location?.search}|${name}`)
    if (!memo.has(key) || getTimestamp() - memo.get(key) >= 60 * 30) {
      setTimeout(() => {
        memo.set(key, getTimestamp())
        requestAnimationFrame(() => fn())
      }, 240)
    }
  })
}
