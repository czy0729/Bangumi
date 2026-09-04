/*
 * @Author: czy0729
 * @Date: 2023-06-02 21:27:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:30:58
 */
import { FROZEN_FN } from '@constants/init'
import { getTimestamp } from '../thirdParty/date'
import hash from '../thirdParty/hash'
import useMount from './useMount'

/** 缓存搜索过的结果 */
const memo = new Map<string, number>()

/**
 * 页面聚焦后延迟执行一次 (web 版)
 * 与 react-native 端的差异为
 * 一个相同的 url 30min 内只允许执行一次，防止返回后重新请求
 *
 * @param fn 聚焦后执行的函数
 * @param name 唯一标识, 参与 30min 节流的缓存键
 */
export default function useRunAfter(fn: () => void = FROZEN_FN, name: string = ''): void {
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
