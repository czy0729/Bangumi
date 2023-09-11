/*
 * @Author: czy0729
 * @Date: 2022-05-03 15:22:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:28:02
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
  wrap: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
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
