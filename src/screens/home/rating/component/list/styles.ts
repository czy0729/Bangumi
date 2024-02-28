/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:52:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 18:26:34
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => {
  if (STORYBOOK) {
    const height = _.window.height - (STORYBOOK ? _.headerHeight : 0)
    return {
      contentContainerStyle: {
        paddingHorizontal: _.wind,
        paddingTop: _.md,
        paddingBottom: _.bottom,
        minHeight: height,
        maxHeight: height
      }
    }
  }

  return {
    contentContainerStyle: {
      paddingHorizontal: _.wind,
      paddingTop: _.md,
      paddingBottom: _.bottom
    }
  }
})
