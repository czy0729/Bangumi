/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 18:42:18
 */
import { _ } from '@stores'

export const PX = _.r(12)

export const MARGIN = _.r(3)

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm
  },
  months: {
    height: _.r(16)
  },
  month: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    whiteSpace: 'nowrap'
  },
  days: {
    marginLeft: _.wind,
    width: _.r(16),
    height: '100%'
  },
  day: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  },
  contentContainerStyle: {
    paddingRight: _.wind
  },
  items: {
    minWidth: '100%',
    height: (PX + MARGIN) * 7,
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  },
  item: {
    width: PX,
    height: PX,
    marginRight: MARGIN,
    marginTop: MARGIN,
    borderRadius: 4,
    overflow: 'hidden'
  },
  itemToday: {
    borderWidth: 1,
    borderColor: _.colorTitle
  }
}))
