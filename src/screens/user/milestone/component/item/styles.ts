/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 23:32:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor(_.window.contentWidth / 5.8)
  // const height = Math.floor(width * 1.32)
  return {
    container: {
      width: '20%'
    },
    item: {
      width,
      minHeight: 128,
      paddingBottom: 14,
      overflow: 'hidden'
    },
    cover: {
      width
    },
    image: {
      ..._.shadow
    },
    title: {
      marginTop: 8
    },
    sub: {
      marginTop: 2
    }
  }
})
