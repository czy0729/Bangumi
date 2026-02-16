/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:45:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:25:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(3)
  return {
    item: {
      width,
      marginVertical: _.sm,
      marginLeft
    },
    btn: {
      position: 'absolute',
      zIndex: 1,
      right: 3,
      paddingVertical: 4,
      paddingHorizontal: 6,
      marginRight: -6
    }
  }
})
