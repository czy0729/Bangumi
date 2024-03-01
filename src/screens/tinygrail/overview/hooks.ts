/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:55:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 04:55:51
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 热门榜单页面逻辑 */
export function useTinygrailOverviewPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
