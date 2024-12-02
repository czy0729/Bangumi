/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:31:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:04:44
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
    item2021: {
      width: _.device(128, 164) * 2 + 16,
      height: _.device(128, 164),
      backgroundColor: '#ebf3ec'
    },
    body: {
      width,
      height,
      backgroundColor: '#c4cfa1',
      opacity: 0.99
    },
    touch: {
      position: 'absolute',
      zIndex: 2,
      right: 0,
      bottom: 0,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    switch: {
      paddingVertical: 1,
      margin: _.sm,
      backgroundColor: '#3e4730',
      borderRadius: _.radiusSm,
      overflow: 'hidden',
      opacity: 0.8
    },
    switchText: {
      width: 32,
      color: '#c4cfa1'
    }
  }
})
