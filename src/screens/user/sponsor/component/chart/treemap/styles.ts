/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  /** 底部让出真实安全区, 网格只占剩余高度 */
  wrap: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  container: {
    flex: 1
  },
  empty: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
