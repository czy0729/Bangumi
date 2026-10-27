/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const padding = _.wind - _._wind

  return {
    container: {
      width: (_.window.width - padding * 2) / 2,
      paddingVertical: _.sm + 4,
      paddingRight: _.sm,
      paddingLeft: _.md,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    body: {
      height: _.r(40)
    }
  }
})
