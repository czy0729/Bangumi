/*
 * @Author: czy0729
 * @Date: 2024-03-06 09:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 10:51:30
 */
import { useMount, useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 资产重组页面逻辑 */
export function useTinygrailSacrificePage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })

  /** 页面销毁 */
  useMount(() => {
    return () => {
      $.setState({
        mounted: false
      })
    }
  })
}
