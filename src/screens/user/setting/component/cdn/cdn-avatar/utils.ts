/*
 * @Author: czy0729
 * @Date: 2024-04-21 16:39:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:20:14
 */
import { systemStore } from '@stores'
import { info } from '@utils'
import { checkAdvanceCDN } from '../utils'

/** 检查当前用户是否有权限开启高级 CDN */
export async function checkAdvance() {
  if (!systemStore.advance) {
    info('此为高级用户功能')
    return false
  }

  return checkAdvanceCDN('你是老打赏用户或特殊关照用户，允许开启')
}
