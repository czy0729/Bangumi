/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 13:35:21
 */
import { _ } from '@stores'
import { IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT * 1.1 - _.xs
  },
  tip: {
    paddingRight: 24,
    marginTop: _.sm,
    marginBottom: _.xs
  },
  comments: {
    padding: _.sm,
    marginTop: _.md,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  edit: {
    marginTop: _.sm,
    marginRight: -12
  },
  hidden: {
    width: 32,
    height: 18,
    paddingHorizontal: _.xs,
    paddingVertical: 1,
    marginTop: -1,
    marginLeft: _.sm,
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
