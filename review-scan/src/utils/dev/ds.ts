/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:44:38
 */
import { WEB } from '@constants'
import { DEV } from '@src/config'

export const RERENDER_LOG_COUNT = 0

export const RERENDER_MEMO = {
  data: {}
}

if (DEV && !RERENDER_LOG_COUNT) {
  setInterval(
    () => {
      RERENDER_MEMO.data = {}
    },
    WEB ? 15000 : 8000
  )
}
