/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:11:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 05:22:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  actionSheet: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  content: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderTopRightRadius: _.radiusLg,
    borderTopLeftRadius: _.radiusLg,
    overflow: 'hidden'
  },
  body: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind - _._wind
  },
  close: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  btnContainer: {
    height: 44
  },
  btn: {
    paddingTop: _.md,
    paddingBottom: _.ios(_.lg, _.md)
  }
}))
