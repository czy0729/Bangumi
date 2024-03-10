/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:11:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-10 17:11:05
 */
import { useRunAfter } from '@utils/hooks'
import { Ctx } from './types'

/** 资金日志页面逻辑 */
export function useTinygrailLogsPage({ $ }: Ctx) {
  useRunAfter(() => {
    $.init()
  })
}
