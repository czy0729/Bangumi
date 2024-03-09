/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:13:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-09 05:13:27
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 通天塔页面逻辑 */
export function useTinygrailStarPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
