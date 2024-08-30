/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 07:22:53
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  web: {
    // @ts-expect-error
    position: 'fixed',
    zIndex: 1,
    right: _.wind,
    bottom: 92,
    left: _.wind
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
  },
  refresh: {
    marginRight: _.sm,
    marginLeft: _.md
  },
  setting: {
    paddingHorizontal: _.sm,
    marginBottom: 24
  }
}))
