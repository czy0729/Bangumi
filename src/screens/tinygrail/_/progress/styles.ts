/*
 * @Author: czy0729
 * @Date: 2024-03-03 07:04:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 05:00:17
 */
import { _ } from '@stores'

const PADDING = 3

export const memoStyles = _.memoStyles(() => ({
  progress: {
    padding: PADDING,
    borderWidth: 1,
    borderColor: _.tSelect('rgba(255, 255, 255, 0.36)', _.colorTinygrailBorder),
    borderRadius: 8,
    overflow: 'hidden'
  },
  bar: {
    position: 'absolute',
    zIndex: 1,
    top: PADDING,
    bottom: PADDING,
    left: PADDING,
    borderRadius: 4,
    overflow: 'hidden'
  },
  text: {
    zIndex: 2,
    paddingHorizontal: _.sm
  }
}))
