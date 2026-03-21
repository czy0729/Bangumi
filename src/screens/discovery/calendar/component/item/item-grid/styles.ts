/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:06:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:42:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const gridStyles = _.grid()

  return {
    item: {
      width: gridStyles.width,
      marginLeft: gridStyles.marginLeft,
      marginBottom: _.md
    },
    cover: {
      width: gridStyles.width,
      height: gridStyles.height
    }
  }
})
