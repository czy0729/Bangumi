/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 05:53:50
 *
 * 找 NSFW 筛选样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  /** 展开筛选后悬浮在右下角的「前往旧版」 (抬过底部统计行, 落在收起按钮行右侧) */
  legacy: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: _.r(80)
  }
}))
