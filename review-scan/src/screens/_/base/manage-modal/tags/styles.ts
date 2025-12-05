/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 10:26:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    padding: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  title: {
    height: 16,
    paddingLeft: _.xs
  },
  opacity: {
    opacity: 0.5
  },
  split: {
    width: 2,
    height: 6,
    marginHorizontal: 12,
    borderRadius: 4,
    backgroundColor: _.colorIcon
  },
  wrap: {
    height: _.isSmallDevice ? 52 : 'auto',
    marginTop: 12,
    marginRight: -_.sm,
    overflow: 'hidden'
  },
  touchTag: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  tag: {
    paddingVertical: _.xs - 1,
    paddingHorizontal: _.sm - 2,
    marginRight: _.sm - 2,
    marginBottom: _.sm - 1,
    backgroundColor: _.select(_.ios(_.colorBg, _.colorPlain), _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2)
  }
}))
