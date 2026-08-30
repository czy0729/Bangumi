/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:30:49
 */
import { IOS } from '@constants/constants'
import { FROZEN_FN } from '@constants/init'
import useMount from './useMount'

import type { Fn } from '@types'

/**
 * 页面聚焦后延迟执行一次, 用于把低优先级操作让给切页动画
 *  - 安卓延迟 400ms, 其余 520ms; 相同组件只执行一次
 *
 * @param fn 聚焦后执行的函数
 * @param _name 唯一标识 (web only, 客户端不使用)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useRunAfter(fn: Fn = FROZEN_FN, _name?: string): void {
  return useMount(() => {
    setTimeout(
      () => {
        requestAnimationFrame(() => fn())
      },
      IOS ? 400 : 520
    )
  })
}
