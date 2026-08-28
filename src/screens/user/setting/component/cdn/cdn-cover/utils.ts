/*
 * @Author: czy0729
 * @Date: 2024-04-21 17:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:38:47
 */
import { systemStore } from '@stores'
import { info } from '@utils'
import { checkAdvanceCDN } from '../utils'

export function waitToResetCDN() {
  setTimeout(() => {
    const result = systemStore.resetCDN()
    if (result) info('CDN 试用结束')
  }, 60 * 1000 * 10)
}

/** 检查当前用户的打赏记录是否支持无限制开启高级 CDN (调用方已做过 advance 前置检查) */
export async function checkAdvance() {
  return checkAdvanceCDN('你是老打赏用户或特殊关照用户，无限制开启')
}
