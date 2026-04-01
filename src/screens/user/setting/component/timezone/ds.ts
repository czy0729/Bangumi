/*
 * @Author: czy0729
 * @Date: 2023-03-14 20:29:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 00:48:13
 */
import { rc } from '@utils/dev'
import { TIMEZONE_IS_GMT8 } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Timezone')

export const TEXTS = {
  timezone: {
    hd: '设置时区',
    information: `${
      TIMEZONE_IS_GMT8 ? '检测到你是 GMT+8 时区用户，不建议你设置！\n' : ''
    }会影响帖子楼层时间、条目评论时间等的显示`
  }
} as const
