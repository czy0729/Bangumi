/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 02:02:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(_.portrait(5, 8))

  return {
    item: {
      width,
      marginBottom: _.md,
      marginLeft: marginLeft + 1
    },
    inView: {
      minWidth: width,
      minHeight: width
    }
  }
})
