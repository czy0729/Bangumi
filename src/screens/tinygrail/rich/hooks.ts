/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:05:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:05:33
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 番市首富页面逻辑 */
export function useTinygrailRichPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
