/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:24:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:02
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(2, 4)
  const margin = _.md
  let width = (_.window.width - _.wind * 2 - _.md * (num - 1)) / num
  if (WEB) width -= 18

  return {
    container: {
      width,
      marginBottom: margin,
      marginLeft: margin,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    left: {
      marginLeft: 0
    },
    block: {
      width,
      height: width * _.ios(0.36, 0.38),
      paddingLeft: 20,
      backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailBorder)
    },
    icon: {
      position: 'absolute',
      top: '50%',
      right: -10,
      marginTop: -24,
      color: _.colorTinygrailIcon,
      opacity: 0.24
    }
  }
})
