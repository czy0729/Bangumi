/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:31:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 22:02:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.device(128, 164)
  const width = height * 2 + 16
  return {
    container: {
      height,
      marginRight: _.md
    },
    item: {
      width: _.device(128, 164) * 2 + 16,
      height: _.device(128, 164),
      backgroundColor: '#000'
    },
    body: {
      width,
      height,
      backgroundColor: '#000'
    },
    fixed: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0
    },
    tba: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginTop: 8,
      marginRight: 8,
      marginBottom: 16,
      marginLeft: 16,
      color: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: _.radiusSm
    }
  }
})
