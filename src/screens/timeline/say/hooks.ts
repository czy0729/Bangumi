/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:01:42
 */
import { useKeyboardAdjustResize, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 吐槽页面逻辑 */
export function useSayPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
  useKeyboardAdjustResize()
}
