/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:07:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-09 23:21:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  /**
   * 上下内边距与 ITEM 行一致 (12)
   *  - 块自带对称内边距后, 调用处不再需要补 `_.mt.*`
   *  - 相邻块间距 = 12 + 12 = 24 (与旧版 16 + 8 相同, 旧版外统一)
   * */
  container: {
    paddingHorizontal: _._wind,
    paddingVertical: 12
  },
  touch: {
    minWidth: _.window.contentWidth / 5,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  icon: {
    paddingHorizontal: _.sm
  },
  active: {
    borderColor: _.colorSuccess
  },
  body: {
    height: 80,
    paddingHorizontal: _.xs
  },
  sub: {
    paddingTop: 8,
    paddingLeft: 20,
    marginLeft: 20,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: _.colorBorder
  }
}))
