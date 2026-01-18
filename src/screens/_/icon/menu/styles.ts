/*
 * @Author: czy0729
 * @Date: 2026-01-17 19:25:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:04:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const size = _.r(50)

  return {
    wrap: {
      width: size
    },
    wrapSm: {
      width: size - 4
    },
    icon: {
      width: size,
      height: size
    },
    iconSm: {
      width: size - 4,
      height: size - 4
    },
    iconBg: {
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
    },
    inner: {
      position: 'absolute',
      zIndex: 1,
      top: size / 2 - 6,
      right: size / 2 - 10
    }
  }
})
