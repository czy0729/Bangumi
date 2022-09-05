/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 18:27:43
 */
import { _ } from '@stores'
import { IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT * 1.1 - _.xs
  },
  tip: {
    marginTop: 4
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
  }
}))
