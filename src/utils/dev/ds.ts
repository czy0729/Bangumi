/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 22:46:32
 */
import { STORYBOOK } from '@constants'
import { DEV } from '@/config'

export const RERENDER_LOG_COUNT = 0

export const RERENDER_MEMO = {
  data: {}
}

if (DEV && !RERENDER_LOG_COUNT) {
  setInterval(
    () => {
      RERENDER_MEMO.data = {}
    },
    STORYBOOK ? 15000 : 8000
  )
}
