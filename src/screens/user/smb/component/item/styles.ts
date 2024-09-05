/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:07:45
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const container = {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  }
  if (WEB) delete container.flex

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
