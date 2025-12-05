/*
 * @Author: czy0729
 * @Date: 2023-03-14 20:29:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:43:16
 */
import { rc } from '@utils/dev'
import { TIMEZONE_IS_GMT8 } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Timezone')

export const TEXTS = {
  timezone: {
    hd: '设置时区',
    information: `${
      TIMEZONE_IS_GMT8 ? '检测到你是 GMT+8 时区用户, 不建议你设置!\n' : ''
    }会影响到帖子楼层回复时间、条目评论时间等的显示`
  }
} as const
