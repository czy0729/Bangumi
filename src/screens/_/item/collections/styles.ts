/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 06:07:09
 */
import { _ } from '@stores'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  inView: {
    minWidth: IMG_WIDTH * 1.1,
    minHeight: IMG_HEIGHT * 1.1
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT * 1.1 - _.xs
  },
  tip: {
    minHeight: 40
  },
  comments: {
    paddingVertical: _.sm,
    paddingHorizontal: 12,
    marginTop: _.md,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  edit: {
    marginTop: 12,
    marginRight: -9
  },
  tag: {
    width: 34,
    height: 18,
    paddingHorizontal: _.xs,
    paddingVertical: 1,
    marginTop: -1,
    marginLeft: _.sm,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel2)
  },
  body: {
    marginTop: 2,
    marginLeft: _._wind
  }
}))
