/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:04:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.window.width - _.wind * 2
  return {
    container: {
      minHeight: _.window.height
    },
    contentContainerStyle: {
      paddingTop: _.headerHeight
    },
    item: {
      paddingTop: _.md,
      paddingBottom: _.sm,
      paddingHorizontal: _._wind,
      marginVertical: _.md,
      marginHorizontal: _.wind,
      backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    cover: {
      width,
      height: width * 0.56
    },
    info: {
      paddingVertical: _.md
    }
  }
})
