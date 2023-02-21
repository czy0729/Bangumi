/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 20:56:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  popover: {
    padding: _.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  more: {
    marginRight: -9
  },
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
  },
  loading: {
    marginTop: 5,
    marginLeft: -24,
    transform: [
      {
        scale: 0.4
      }
    ]
  }
}))
