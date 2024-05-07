/*
 * @Author: czy0729
 * @Date: 2023-02-24 16:23:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 16:23:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tags: {
    paddingRight: _.wind - _._wind,
    paddingBottom: _.md,
    paddingLeft: _.wind
  },
  touch: {
    marginRight: _.sm,
    marginBottom: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  tag: {
    paddingTop: 2,
    paddingHorizontal: 4,
    paddingBottom: 1,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs
  },
  tagMore: {
    paddingTop: 2,
    paddingHorizontal: 4,
    paddingBottom: 1,
    borderRadius: _.radiusXs
  }
}))
