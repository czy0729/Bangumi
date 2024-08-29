/*
 * @Author: czy0729
 * @Date: 2022-06-20 13:57:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 10:58:43
 */
import { _ } from '@stores'
import { memoStyles as gridItemMemoStyles } from '../item/styles'

export const memoStyles = _.memoStyles(() => {
  const itemStyles = gridItemMemoStyles()
  return {
    item: {
      paddingVertical: _.device(16, 32),
      paddingHorizontal: _.wind
    },
    info: {
      marginLeft: _.device(itemStyles.item.marginLeft, _.md)
    },
    dot: {
      position: 'absolute',
      top: 6,
      right: 0,
      borderWidth: _.r(8),
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: _.colorIcon,
      transform: [
        {
          rotate: '-45deg'
        }
      ],
      opacity: 0.8
    }
  }
})
