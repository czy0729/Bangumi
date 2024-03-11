/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:04:59
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** ICO 榜单页面逻辑 */
export function useTinygrailICOPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
