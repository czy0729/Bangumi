/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 07:22:53
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    // 只在 WEB 允许使用 position: fixed
    position: _.web('fixed' as any, 'absolute'),
    zIndex: 1,
    right: _.web(_.wind, 0),
    bottom: _.web(92, _.ios(_.tabBarHeight + _.sm, _.md)),
    left: _.web(0, _.wind)
  },
  btns: {
    paddingHorizontal: _.sm,
    marginTop: _.md,
    marginBottom: WEB ? 0 : _.md
  },
  touch: {
    borderRadius: _.r(36),
    overflow: 'hidden'
  },
  btn: {
    height: _.r(36),
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.r(36)
  }
}))
