/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:40:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找 Gal 列表布局条目样式
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md
  },
  inView: {
    minWidth: IMG_WIDTH_LG,
    minHeight: IMG_HEIGHT_LG
  },
  content: {
    flex: 1,
    minHeight: IMG_HEIGHT_LG,
    marginLeft: _._wind
  },
  body: {
    marginRight: _.wind
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
