/*
 * @Author: czy0729
 * @Date: 2024-03-04 19:09:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-04 19:09:11
 */
import { hm } from '@utils/fetch'
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 小圣杯页面逻辑 */
export function useTinygrailPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
    hm('tinygrail', 'Tinygrail')
  })
}
