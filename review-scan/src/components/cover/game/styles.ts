/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:17:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const color = _.select('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)')
  return {
    game: {
      backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
      borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
      borderWidth: 5,
      borderBottomWidth: 1,
      borderRadius: _.radiusSm,
      borderBottomLeftRadius: _.radiusLg
    },
    head: {
      width: 24,
      height: 3,
      marginBottom: 3,
      backgroundColor: color,
      borderRadius: 2
    },
    angle: {
      width: 8,
      height: 6,
      marginTop: 3,
      borderWidth: 6,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent'
    }
  }
})
