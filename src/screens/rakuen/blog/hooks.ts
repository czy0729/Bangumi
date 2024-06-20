/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-21 05:30:53
 */
import { useOnScroll } from '@components/header/utils'
import { useKeyboardAdjustResize, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 日志页面逻辑 */
export function useBlogPage({ $ }: Ctx) {
  const { fixed, onScroll } = useOnScroll()
  useRunAfter(async () => {
    await $.init()
  })
  useKeyboardAdjustResize()

  return {
    fixed,
    onScroll
  }
}
