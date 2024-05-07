/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 08:40:19
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const container = {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  }
  if (STORYBOOK) delete container.flex

  return {
    container,
    wrap: {
      paddingVertical: _.md,
      paddingRight: _.wind
    },
    body: {
      marginTop: -1,
      marginLeft: _.md
    },
    tag: {
      paddingRight: 6,
      paddingLeft: 6,
      marginRight: _.sm,
      marginBottom: _.sm
    }
  }
})
