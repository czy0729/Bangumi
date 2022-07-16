/*
 * @Author: czy0729
 * @Date: 2022-06-20 13:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-17 04:07:29
 */
import { _ } from '@stores'
import { memoStyles as gridItemMemoStyles } from '../grid-item/styles'

export const memoStyles = _.memoStyles(() => {
  const itemStyles = gridItemMemoStyles()
  return {
    item: {
      paddingVertical: _.device(16, 32),
      paddingHorizontal: _.wind
    },
    cover: {
      width: itemStyles.item.width
    },
    info: {
      marginLeft: _.device(itemStyles.item.marginLeft, _.md)
    },
    icon: {
      marginBottom: -1
    },
    touchable: {
      padding: _.sm
    },
    placeholder: {
      marginBottom: -1.5,
      marginLeft: _.sm
    }
  }
})
