/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 短信页面逻辑
 * 数据初始化挂在 Scroll 组件挂载时执行, ScrollView 实例由 Scroll 的 ref 回调注册
 */
import { useCallback } from 'react'
import { useInitStore } from '@stores'
import { useBackHandler } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 短信页面逻辑 */
export function usePMPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  /** 安卓返回键: 有选中线程时先回到「全部」 */
  const handleBackAndroid = useCallback(() => {
    if ($.state.thread) {
      $.onThreadChange('')
      return true
    }

    return false
  }, [$])

  useBackHandler(handleBackAndroid)

  return context
}
