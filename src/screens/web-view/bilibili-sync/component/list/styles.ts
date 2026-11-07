/*
 * @Author: czy0729
 * @Date: 2026-11-07 02:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 02:20:00
 *
 * 空态引导样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    flex: 1,
    paddingHorizontal: _.wind
  },
  loginBtn: {
    width: 160,
    marginTop: _.lg
  }
}))
