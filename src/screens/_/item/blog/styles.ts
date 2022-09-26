/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:35:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:39:30
 */
import { _ } from '@stores'
import { IMG_WIDTH_SM } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  imgContainer: {
    width: IMG_WIDTH_SM,
    marginRight: _._wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  tags: {
    padding: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
