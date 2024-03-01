/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:39:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-01 23:40:35
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** ICO 详情页面逻辑 */
export function useTinygrailICODealPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
