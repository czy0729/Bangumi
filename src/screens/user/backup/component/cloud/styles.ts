/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 导出区块样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cloud: {
    paddingRight: _.wind - _.sm,
    paddingLeft: _.wind,
    marginBottom: _.sm
  },
  btns: {
    gap: _.sm,
    marginTop: _.xs,
    marginBottom: _.sm,
    marginLeft: -2
  },
  head: {
    marginRight: _.sm,
    marginBottom: _.sm
  }
}))
