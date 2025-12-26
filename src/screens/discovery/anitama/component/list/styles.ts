/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 21:08:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height
  },
  item: {
    paddingTop: _.md,
    paddingBottom: _.sm,
    paddingHorizontal: _._wind,
    marginVertical: _.md,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  cover: {
    width: _.window.contentWidth,
    height: Math.floor(_.window.contentWidth * 0.56)
  },
  info: {
    paddingVertical: _.md
  }
}))
