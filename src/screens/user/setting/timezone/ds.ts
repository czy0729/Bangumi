/*
 * @Author: czy0729
 * @Date: 2023-03-14 20:29:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 21:48:41
 */
import { TIMEZONE_IS_GMT8 } from '@constants'

export const TEXTS = {
  timezone: {
    hd: '设置时区',
    information: `${
      TIMEZONE_IS_GMT8 ? '检测到你是 GMT+8 时区用户, 不建议你设置!\n' : ''
    }会影响到帖子楼层回复时间、条目评论时间等的显示`
  }
} as const
