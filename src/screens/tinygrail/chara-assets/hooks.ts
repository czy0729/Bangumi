/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:42:00
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 我的持仓页面逻辑 */
export function useTinygrailCharaAssetsPage({ $ }: Ctx) {
  useRunAfter(() => {
    if ($.params.form === 'lottery') {
      $.initFormLottery()
    } else {
      $.init()
    }
  })
}
