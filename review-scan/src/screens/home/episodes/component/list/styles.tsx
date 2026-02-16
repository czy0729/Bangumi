/*
 * @Author: czy0729
 * @Date: 2022-09-01 09:56:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:37:55
 */
import { _ } from '@stores'
import { IMAGE_HEIGHT, IMAGE_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm + 2,
    paddingHorizontal: _.wind
  },
  inView: {
    minWidth: IMAGE_WIDTH,
    minHeight: IMAGE_HEIGHT,
    marginLeft: _.sm
  },
  status: {
    width: 6,
    height: 6,
    marginTop: _.r(6),
    marginRight: _.sm,
    backgroundColor: _.colorSub,
    borderRadius: 3
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusPrimary: {
    backgroundColor: _.colorPrimary
  }
}))
