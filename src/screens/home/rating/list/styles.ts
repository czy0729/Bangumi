/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:52:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 17:23:05
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const height = _.window.height - (STORYBOOK ? _.headerHeight : 0)
  return {
    contentContainerStyle: {
      paddingHorizontal: _.wind,
      paddingTop: _.md,
      paddingBottom: _.window.height / 2,
      minHeight: height,
      maxHeight: height
    }
  }
})
